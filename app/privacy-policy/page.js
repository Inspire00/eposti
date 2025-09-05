import React from 'react';

export default function PrivacyPolicy() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
       
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Privacy Policy</h2>
        <p className="mb-4 text-gray-700">
          This Privacy Policy describes how <strong className="font-semibold">Eposti</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects your information when you use our services, including our WhatsApp property listings bot and website.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Information We Collect</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>
            Personal Information: name, phone number, and contact details you provide when listing or inquiring about a property.
          </li>
          <li>
            Usage Data: chat interactions, search queries, and activity on our website or WhatsApp bot.
          </li>
          <li>
            Media: property images and related files you upload for listings.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. How We Use Your Information</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>To process and display property listings.</li>
          <li>To connect tenants with landlords and agents.</li>
          <li>To improve our bot and website functionality.</li>
          <li>To comply with legal and regulatory requirements.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Data Sharing & Disclosure</h3>
        <p className="mb-4 text-gray-700">
          We do not sell your personal information. Your information may be shared with:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>Service providers (e.g., hosting, storage, communication APIs).</li>
          <li>Legal authorities when required by law or to protect our rights.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Data Security</h3>
        <p className="mb-4 text-gray-700">
          We take appropriate security measures to protect your personal data. However, no transmission or storage system can be guaranteed to be 100% secure.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Data Retention</h3>
        <p className="mb-4 text-gray-700">
          We retain personal data only for as long as necessary to provide our services or comply with legal obligations.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Your Rights</h3>
        <p className="mb-4 text-gray-700">
          You have the right to access, correct, or request deletion of your personal information. To make a request, please contact us.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. Contact Us</h3>
        <p className="mb-4 text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at:
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