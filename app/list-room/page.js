'use client';

import { useState } from 'react';
import { Client, Databases, Storage, ID, Permission, Role } from 'appwrite';
import { useRouter } from 'next/navigation'; // Import useRouter

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

export default function ListRoomPage() {
  const router = useRouter(); // Initialize the router

  const [formData, setFormData] = useState({
    location: '',
    price: '',
    utilities: '',
    parking_available: false,
    address: '',
    flat_or_building_name: '',
    occupation_date: '',
    description: '',
    contact_name: '',
    contact_number: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  // Replaced 'error' with more specific error states
  const [formError, setFormError] = useState(null); // For general form submission errors
  const [imageSelectError, setImageSelectError] = useState(null); // For image selection specific error
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageSelectError(null); // Clear previous image selection error
    if (files.length > 3) {
      setImageSelectError("You can select a maximum of 3 pictures.");
      setSelectedFiles([]); // Clear selected files in state
      e.target.value = null; // Clear the file input visually after warning
      return;
    }
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null); // Clear general form error
    setImageSelectError(null); // Clear image selection error
    setSuccessMessage(null);

    if (selectedFiles.length === 0) {
      setFormError("Please upload at least 1 picture of the room.");
      setLoading(false);
      return;
    }

    try {
      const imageFileIds = [];

      // 1. Upload images to Appwrite Storage with explicit read permissions for 'any' role
      for (const file of selectedFiles) {
        const uniqueFileId = ID.unique();
        const uploadedFile = await storage.createFile(
          appwriteConfig.storageId,
          uniqueFileId,
          file,
          [Permission.read(Role.any())] // Explicitly set read permissions for anyone
        );
        imageFileIds.push(uploadedFile.$id);
      }

      // 2. Create document in Appwrite Database
      const newListing = {
        location: formData.location,
        price: parseInt(formData.price, 10),
        utilities: formData.utilities,
        parking_available: formData.parking_available,
        address: formData.address,
        flat_or_building_name: formData.flat_or_building_name,
        occupation_date: formData.occupation_date,
        description: formData.description,
        contact_name: formData.contact_name,
        contact_number: formData.contact_number,
        images: imageFileIds, // Store array of image file IDs
      };

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        ID.unique(),
        newListing
      );

      setSuccessMessage("Your room listing has been successfully submitted!");
      
      // Reset form fields and files
      setFormData({
        location: '',
        price: '',
        utilities: '',
        parking_available: false,
        address: '',
        flat_or_building_name: '',
        occupation_date: '',
        description: '',
        contact_name: '',
        contact_number: ''
      });
      setSelectedFiles([]);
      const fileInput = document.getElementById('images');
      if (fileInput) fileInput.value = '';

      // Redirect to the home page after a short delay to show success message
      setTimeout(() => {
        router.push('/');
      }, 2000); // Redirect after 2 seconds

    } catch (e) {
      console.error("Error creating listing:", e);
      setFormError("Failed to create listing. Please ensure your Appwrite credentials are correct and try again. Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <> {/* Replaced Layout with a Fragment */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">List Your Room</h1>
      <p className="mb-8 text-gray-700">
        You can list your room directly here or use our WhatsApp chatbot.
        Fill in all details and upload your pictures below.
      </p>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">{successMessage}</span>
        </div>
      )}

      {formError && ( // Display general form errors at the top
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{formError}</span>
        </div>
      )}

      {/* --- BEGIN Centering Container --- */}
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          {/* Poster Contact Information */}
          <div>
            <label htmlFor="contact_name" className="block text-gray-700 text-sm font-bold mb-2">Your Name:</label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="contact_number" className="block text-gray-700 text-sm font-bold mb-2">Your Contact Number (WhatsApp preferred):</label>
            <input
              type="tel"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., +27821234567"
            />
          </div>

          {/* Room Details */}
          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location (City, Suburb, Province):</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Johannesburg, Sandton, Gauteng"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Monthly Rent Price (R):</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 5500"
            />
          </div>
          <div>
            <label htmlFor="utilities" className="block text-gray-700 text-sm font-bold mb-2">Utilities (e.g., included/excluded):</label>
            <input
              type="text"
              id="utilities"
              name="utilities"
              value={formData.utilities}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Excludes electricity, includes water"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="parking_available"
              name="parking_available"
              checked={formData.parking_available}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded-md focus:ring-indigo-500"
            />
            <label htmlFor="parking_available" className="ml-2 block text-gray-700 text-sm font-bold">Parking Available?</label>
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Street Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 123 Main Street"
            />
          </div>
          <div>
            <label htmlFor="flat_or_building_name" className="block text-gray-700 text-sm font-bold mb-2">Flat Name/Building Name (Optional):</label>
            <input
              type="text"
              id="flat_or_building_name"
              name="flat_or_building_name"
              value={formData.flat_or_building_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., The Residences"
            />
          </div>
          <div>
            <label htmlFor="occupation_date" className="block text-gray-700 text-sm font-bold mb-2">Occupation Date:</label>
            <input
              type="date"
              id="occupation_date"
              name="occupation_date"
              value={formData.occupation_date}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Additional Notes / Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Spacious room, walking distance to university, no pets allowed. Available furnished."
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div className="border-t pt-6 mt-6">
            <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Pictures (1-3 images):
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {/* Display selected files count or names */}
            {selectedFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedFiles.length} file(s) ({selectedFiles.map(file => file.name).join(', ')})
              </p>
            )}
            {imageSelectError && ( // Display image selection specific error here
              <p className="mt-2 text-sm text-red-600">{imageSelectError}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Listing'}
            </button>
          </div>
        </form>
      </div>
      {/* --- END Centering Container --- */}
    </>
  );
}
