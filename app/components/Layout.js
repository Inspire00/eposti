'use client';

import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0 hover:text-indigo-600 transition-colors duration-200">
            Roomify SA 🏠
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">
              Listed Rooms
            </Link>
            <Link href="/list-room" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">
              List Your Room
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">
              How It Works
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">
              About Us
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
