'use client';

import { useEffect, useState } from 'react';
import { Client, Databases, Query, Storage } from 'appwrite';
import Image from 'next/image';

// Configuration for your Appwrite instance.
const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
};

// A simple fallback image URL in case an image fails to load.
const placeholderImageUrl = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  // Function to check if a string is a valid URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Function to fetch all room listings from Appwrite
const fetchListings = async () => {
  try {
    setLoading(true);
    setError(null);

    // Initialize Appwrite services inside the function
    const client = new Client()
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId);

    const databases = new Databases(client);
    const storage = new Storage(client);

    console.log('Fetching listings with config:', {
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.collectionId,
      endpoint: appwriteConfig.endpoint,
      projectId: appwriteConfig.projectId,
      storageId: appwriteConfig.storageId,
    });

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [Query.orderDesc('$createdAt')]
    );

    console.log('Listings fetched successfully:', {
      total: response.total,
      documentCount: response.documents.length,
      documentIds: response.documents.map(doc => doc.$id),
    });

    const listingsWithImages = await Promise.all(
      response.documents.map(async (listing) => {
        let imageUrls = [];

        console.log(`Raw images for ${listing.$id}:`, listing.images);

        // Case 1: Images are stored as an array (e.g., parsed WhatsApp URLs or file IDs)
        if (Array.isArray(listing.images)) {
          imageUrls = await Promise.all(
            listing.images.map(async (item) => {
              // If the item is a URL (WhatsApp bot), use it directly
              if (
                isValidUrl(item) &&
                item.includes('cloud.appwrite.io') &&
                item.includes('/storage/buckets/') &&
                item.includes('/files/') &&
                item.includes('/view?project=')
              ) {
                console.log(`Using WhatsApp URL for ${listing.$id}: ${item}`);
                return item;
              }
              // Otherwise, treat as a file ID (website)
              try {
                // Validate file ID existence
                await storage.getFile(appwriteConfig.storageId, item);
                console.log(`File ID ${item} exists for ${listing.$id}`);
                const fileView = storage.getFileView(appwriteConfig.storageId, item);
                const url = fileView?.href || `${appwriteConfig.endpoint}/v1/storage/buckets/${appwriteConfig.storageId}/files/${item}/view?project=${appwriteConfig.projectId}`;
                console.log(`Generated URL for file ID ${item} in ${listing.$id}: ${url}`);
                return url;
              } catch (e) {
                console.error(`Error processing file ID ${item} for ${listing.$id}:`, {
                  message: e.message,
                  code: e.code,
                  type: e.type,
                });
                return placeholderImageUrl;
              }
            })
          );
        }
        // Case 2: Images are a comma-separated string (WhatsApp URLs or website file IDs)
        else if (typeof listing.images === 'string' && listing.images.trim() !== '') {
          const items = listing.images
            .split(/,\s*|\s*,\s*/)
            .map(item => item.trim())
            .filter(item => item !== '');

          imageUrls = await Promise.all(
            items.map(async (item) => {
              // If the item is a URL (WhatsApp bot), use it directly
              if (
                isValidUrl(item) &&
                item.includes('cloud.appwrite.io') &&
                item.includes('/storage/buckets/') &&
                item.includes('/files/') &&
                item.includes('/view?project=')
              ) {
                console.log(`Using WhatsApp string URL for ${listing.$id}: ${item}`);
                return item;
              }
              // Otherwise, treat as a file ID (website)
              try {
                // Validate file ID existence
                await storage.getFile(appwriteConfig.storageId, item);
                console.log(`File ID ${item} exists for ${listing.$id}`);
                const fileView = storage.getFileView(appwriteConfig.storageId, item);
                const url = fileView?.href || `${appwriteConfig.endpoint}/v1/storage/buckets/${appwriteConfig.storageId}/files/${item}/view?project=${appwriteConfig.projectId}`;
                console.log(`Generated URL for file ID ${item} in ${listing.$id}: ${url}`);
                return url;
              } catch (e) {
                console.error(`Error processing file ID ${item} for ${listing.$id}:`, {
                  message: e.message,
                  code: e.code,
                  type: e.type,
                });
                return placeholderImageUrl;
              }
            })
          );
        }

        // Fallback to placeholder if no valid images
        if (imageUrls.length === 0) {
          console.warn(`No valid images for listing ${listing.$id}, using placeholder`);
          imageUrls.push(placeholderImageUrl);
        }

        console.log(`Processed imageUrls for ${listing.$id}:`, imageUrls);

        return { ...listing, imageUrls };
      })
    );

    setListings(listingsWithImages);
  } catch (e) {
    console.error('Error fetching listings:', {
      message: e.message,
      code: e.code,
      type: e.type,
      response: e.response ? JSON.stringify(e.response) : 'No response data',
      stack: e.stack,
    });
    setError('Failed to load listings. Please check your Appwrite configuration and permissions.');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchListings();
  }, []); // The empty dependency array means this runs once on mount.

  const handleImageClick = (imageUrl) => {
    setZoomImage(imageUrl);
  };

  const closeZoomModal = () => {
    setZoomImage(null);
  };

  return (
    <>
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
            <div className="h-64 overflow-hidden cursor-pointer" onClick={() => handleImageClick(listing.imageUrls[0])}>
              <img
                src={listing.imageUrls[0]}
                alt={`Image 1 of room listing in ${listing.location}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  console.error(`Image failed to load for ${listing.$id}: ${e.target.src}`);
                  e.target.src = placeholderImageUrl;
                }}
              />
            </div>

            {(listing.imageUrls.length > 1 || (listing.imageUrls[0] === placeholderImageUrl && listing.imageUrls.length > 1)) && (
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50">
                {listing.imageUrls.slice(1, 3).map((imgUrl, index) => (
                  <div key={index} className="h-32 overflow-hidden cursor-pointer" onClick={() => handleImageClick(imgUrl)}>
                    <img
                      src={imgUrl}
                      alt={`Image ${index + 2} of room listing in ${listing.location}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        console.error(`Image failed to load for ${listing.$id}: ${e.target.src}`);
                        e.target.src = placeholderImageUrl;
                      }}
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