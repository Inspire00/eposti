'use client';

import { useEffect, useState } from 'react';
import { Client, Databases, Query, Storage } from 'appwrite';
// REMOVED: import Layout from '../components/Layout'; // Layout is now ONLY handled by app/layout.js

// Configuration for your Appwrite instance.
// Ensure these environment variables are correctly set in your .env.local file
const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
};

// Initialize Appwrite services
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);
const storage = new Storage(client);

// A simple fallback image URL in case an image fails to load.
const placeholderImageUrl = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomImage, setZoomImage] = useState(null); // State to control image zoom modal

  // Function to fetch all room listings from Appwrite
  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.orderDesc('$createdAt')] // Order by creation date descending
      );

      const listingsWithImages = response.documents.map(listing => {
        // Ensure listing.images is an array and contains valid file IDs
        const imageFileIds = Array.isArray(listing.images) ? listing.images : [];

        const imageUrls = imageFileIds.map(fileId => {
          let generatedUrl = placeholderImageUrl; // Default to placeholder
          try {
            // Appwrite getFileView generates a public URL for the file
            // This should ideally return the full-size image.
            const fileView = storage.getFileView(appwriteConfig.storageId, fileId);
            
            if (fileView && fileView.href) {
              generatedUrl = fileView.href;
            } else {
              // Fallback to manual URL construction if SDK's href is missing
              generatedUrl = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
            }
          } catch (e) {
            console.error(`Error during Appwrite SDK's getFileView for fileId: ${fileId}:`, e);
            // Fallback to manual construction on error too
            generatedUrl = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
          }
          return generatedUrl;
        });
        
        // Ensure at least one placeholder if no actual images are available
        if (imageUrls.length === 0 || imageUrls.every(url => url === placeholderImageUrl)) {
          imageUrls.push(placeholderImageUrl);
        }

        return { ...listing, imageUrls };
      });

      setListings(listingsWithImages);
    } catch (e) {
      console.error('Error fetching listings:', e);
      setError('Failed to load listings. Please check your Appwrite configuration and permissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleImageClick = (imageUrl) => {
    // When an image is clicked, ensure we pass the *same* generated URL for zooming.
    // The modal's CSS should handle maximizing its size.
    setZoomImage(imageUrl);
  };

  const closeZoomModal = () => {
    setZoomImage(null);
  };

  return (
    <> {/* IMPORTANT: Use a React Fragment here, NOT <Layout> */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Available Room Listings</h1>
        <button
          onClick={fetchListings}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Refresh Listings
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-gray-600">Loading listings...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {!loading && listings.length === 0 && !error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">No Listings Found!</strong>
          <span className="block sm:inline ml-2">There are no rooms currently available. Be the first to list one!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div
            key={listing.$id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Main Image - First image */}
            <div className="h-64 overflow-hidden cursor-pointer" onClick={() => handleImageClick(listing.imageUrls[0])}>
              <img
                src={listing.imageUrls[0]}
                alt={`Image 1 of room listing in ${listing.location}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => { e.target.src = placeholderImageUrl; }}
              />
            </div>

            {/* Additional Images - Next two (if available) */}
            {(listing.imageUrls.length > 1 || (listing.imageUrls[0] === placeholderImageUrl && listing.imageUrls.length > 1)) && (
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50">
                {listing.imageUrls.slice(1, 3).map((imgUrl, index) => (
                  <div key={index} className="h-32 overflow-hidden cursor-pointer" onClick={() => handleImageClick(imgUrl)}>
                    <img
                      src={imgUrl}
                      alt={`Image ${index + 2} of room listing in ${listing.location}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => { e.target.src = placeholderImageUrl; }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {listing.flat_or_building_name ? `${listing.flat_or_building_name}, ` : ''}{listing.location}
              </h2>
              <p className="mt-2 text-3xl font-bold text-indigo-600">
                R{listing.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
              <p className="mt-4 text-gray-600">
                <strong className="text-gray-700">Address:</strong> {listing.address}
                <br />
                <strong className="text-gray-700">Utilities:</strong> {listing.utilities || 'Not specified'}
                <br />
                <strong className="text-gray-700">Parking:</strong> {listing.parking_available ? 'Yes' : 'No'}
                <br />
                <strong className="text-gray-700">Available From:</strong> {new Date(listing.occupation_date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                <br />
                <strong className="text-gray-700">Description:</strong> {listing.description}
              </p>
              {listing.contact_name && listing.contact_number && (
                <p className="mt-4 text-sm text-gray-500">
                  Listed by: {listing.contact_name}
                </p>
              )}
              <a
                href={`https://wa.me/${listing.contact_number}?text=${encodeURIComponent(`Hi, I'm interested in the room at ${listing.flat_or_building_name ? listing.flat_or_building_name + ', ' : ''}${listing.location} (Listing ID: ${listing.$id}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-full text-center bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
              >
                Contact {listing.contact_name || 'Poster'} on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
          onClick={closeZoomModal}
        >
          <div className="relative max-w-4xl max-h-full overflow-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeZoomModal}
              className="absolute top-4 right-4 text-white text-4xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Close image zoom"
            >
              &times;
            </button>
            <img 
              src={zoomImage} 
              alt="Zoomed Room Image" 
              className="max-w-full max-h-[90vh] rounded-lg shadow-xl" 
            />
          </div>
        </div>
      )}
    </>
  );
}
