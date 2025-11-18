'use client';

// Removed: import Layout from '../components/Layout'; // Layout is now handled by app/layout.js

export default function AboutPage() {
  return (
    <> {/* Replaced Layout with a Fragment */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Eposti</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg text-gray-700 leading-relaxed">
        <p className="mb-4">
          Welcome to **Eposti**, your dedicated platform for finding and listing vacant rooms across South Africa. We understand the challenges of finding the perfect living space or a reliable tenant, and our mission is to simplify this process for everyone.
        </p>
        <p className="mb-4">
          Born out of a need for a seamless and accessible rental experience, Eposti leverages modern technology to connect room seekers with room posters directly. Our intuitive website allows you to browse listings with ease, while our innovative WhatsApp chatbot streamlines the process of listing your vacant room, including effortless picture uploads.
        </p>
        <p className="mb-4">
          We believe in creating a transparent and efficient marketplace where community members can find shared living spaces that suit their needs, budgets, and preferences. From bustling city centers to quiet suburban retreats, Roomify SA is committed to helping you find your next home.
        </p>
        <p>
          Thank you for choosing Roomify SA. We are here to make your room hunting or listing journey as smooth as possible.
        </p>

        <p>
          For more queries please contact us on 📲+27787594670. 
        </p>

        <p>
          Alternatively eamil us on 📧 vincejayloli@gmail.com 
        </p>

         <p>
          We are located at 83 Mitchell Street, Berea, GP, South Africa
        </p>
      </div>
    </>
  );
}
