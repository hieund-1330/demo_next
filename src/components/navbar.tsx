"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-900">
            <Link href="/">My Blog</Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>

            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="text-gray-700 hover:text-blue-500 focus:outline-none"
              >
                Category ▼
              </button>
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link href="/category/tech" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Technology
                  </Link>
                  <Link href="/category/lifestyle" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Lifestyle
                  </Link>
                  <Link href="/category/travel" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Travel
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-blue-500">About</Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>

          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Category ▼
            </button>
            {isCategoryOpen && (
              <div className="bg-white border-t border-gray-200">
                <Link href="/category/tech" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Technology
                </Link>
                <Link href="/category/lifestyle" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Lifestyle
                </Link>
                <Link href="/category/travel" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Travel
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
        </div>
      )}
    </nav>
  );
}
