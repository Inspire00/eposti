'use client';

// Removed: import Layout from '../components/Layout'; // Layout is now handled by app/layout.js
import Link from 'next/link'; // <--- ADD THIS LINE

export default function HowItWorksPage() {
  return (
    <> {/* Replaced Layout with a Fragment */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">How Roomify SA Works</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Room Posters 🏡</h2>
        <ol className="list-decimal list-inside mb-8 space-y-3">
          <li>
            **Submit Details Online:** Head over to the "<Link href="/list-room" className="text-indigo-600 underline hover:text-indigo-800">List Your Room</Link>" page on our website. Fill in all the essential details about your vacant room, including location, rent, utilities, parking, address, occupation date, and any additional notes.
          </li>
          <li>
            **WhatsApp for Pictures:** Once you've submitted the form, open WhatsApp and send "List a room" to our dedicated chatbot at **YOUR_WHATSAPP_BUSINESS_NUMBER**. The bot will then prompt you to send 1 to 3 pictures of your room. Our AI will automatically link these images to your submitted details.
          </li>
          <li>
            **Listing Goes Live:** After successful submission and image upload, your listing will appear on the "Listed Rooms" page for potential tenants to view!
          </li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Room Seekers 👀</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            **Browse Listings:** Visit our homepage, the "<Link href="/" className="text-indigo-600 underline hover:text-indigo-800">Listed Rooms</Link>" page. Here, you'll find all available rooms listed with their key details and a primary picture.
          </li>
          <li>
            **Search & Filter:** Use the search bar and filters (coming soon!) to narrow down rooms by city, suburb, province, or rent price.
          </li>
          <li>
            **Contact Directly:** Once you find a room you're interested in, simply click the "Contact on WhatsApp" button. This will open a chat with the room poster's designated WhatsApp number, pre-filled with a message indicating your interest.
          </li>
          <li>
            **Chatbot Search (Advanced):** Alternatively, you can directly message our WhatsApp chatbot at **YOUR_WHATSAPP_BUSINESS_NUMBER** and say "I'm looking for a room." The bot will then ask you for your preferences (e.g., location, budget) and send you details of matching listings, including pictures, directly in the chat.
          </li>
        </ol>
        <p className="mt-8">
          Our goal is to make room finding and listing as easy as chatting with a friend! If you have any questions, feel free to explore the About Us page or contact us.
        </p>
      </div>
    </>
  );
}
