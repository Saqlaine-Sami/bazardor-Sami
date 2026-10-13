import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, সবজি, মাছ ও মাংসসহ প্রয়োজনীয় পণ্যের আজকের বাজার দর।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${hind.variable} min-h-screen bg-base-100 antialiased`}>
        {/* ধাপ ২-এ এখানে Navbar, ধাপ ৮-এ Footer বসবে */}
        <main className="mx-auto w-full max-w-6xl px-4">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}