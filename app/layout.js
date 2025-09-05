import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Global styles
import Layout from './components/Layout'; // Import your custom Layout component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eposti", // Your application title
  description: "Find and list vacant rooms in South Africa easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Your custom Layout component wraps the children (your pages) here */}
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
