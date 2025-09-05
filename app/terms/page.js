import React from 'react';

export default function TermsOfService() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
       
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Terms of Service</h2>
        <p className="mb-4 text-gray-700">
          Welcome to <strong className="font-semibold">Eposti</strong>. By accessing or using our services (including our WhatsApp property listings bot and website), you agree to these Terms of Service. Please read them carefully.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Service Description</h3>
        <p className="mb-4 text-gray-700">
          Eposti provides a platform to search, list, and share rental property information via WhatsApp and web. We are not a landlord, real estate agent, or property owner.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. User Responsibilities</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>Provide accurate and truthful information when listing properties.</li>
          <li>Use our services in compliance with applicable laws.</li>
          <li>Do not upload offensive, illegal, or unauthorized content (including copyrighted material without permission).</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Limitations of Liability</h3>
        <p className="mb-4 text-gray-700">
          We are not responsible for any transactions, agreements, or disputes between landlords and tenants. Our service is provided on an &quot;as is&quot; basis without warranties of any kind.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Termination</h3>
        <p className="mb-4 text-gray-700">
          We reserve the right to suspend or terminate access to our services if users violate these Terms.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Changes to Terms</h3>
        <p className="mb-4 text-gray-700">
          We may update these Terms from time to time. Continued use of our services constitutes acceptance of the new Terms.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Governing Law</h3>
        <p className="mb-4 text-gray-700">
          These Terms are governed by the laws of South Africa. Any disputes will be resolved in the competent courts of Johannesburg.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. Contact Us</h3>
        <p className="mb-4 text-gray-700">
          For questions or concerns about these Terms, please contact us:
        </p>
        <p className="mb-2 text-gray-700">📧 Email: vincejayloli@gmail.com</p>
        <p className="mb-2 text-gray-700">📲 Phone: +27787594670</p>
        <p className="text-gray-700">📍 83 Mitchell Street, Berea, GP, South Africa</p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
}