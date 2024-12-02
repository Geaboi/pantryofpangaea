"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const isSignInPage = pathname === "/sign-in";
  const isSignUpPage = pathname === "/sign-up";

  return (
    <header
      className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 text-white shadow-lg w-full"
      onMouseLeave={() => setIsSearchActive(false)} // Fade out when cursor leaves the header
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wider">
          <Link href="/">Pantry of Pangaea</Link>
        </div>

        {/* Navigation Area */}
        <div className="flex-grow flex justify-end items-center space-x-6 text-lg">
          {!isSearchActive && (
            <>
              {!isSignInPage && (
                <Link href="/sign-in" className="hover:underline">
                  Sign In
                </Link>
              )}
              {!isSignUpPage && (
                <Link href="/sign-up" className="hover:underline">
                  Sign Up
                </Link>
              )}
              <Link href="/post-recipe" className="hover:underline">
                Post Recipe
              </Link>
            </>
          )}

          {/* Search Button */}
          <div
            className={`hover:cursor-pointer transition-all duration-500 ${
              isSearchActive ? "opacity-0 pointer-events-none" : ""
            }`}
            onMouseEnter={() => setIsSearchActive(true)} // Activate search on hover
          >
            Search
          </div>

          {/* Search Bar */}
          {isSearchActive && (
            <div className="absolute right-4 w-[400px] transition-transform duration-500 ease-in-out">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full px-4 py-2 bg-white text-gray-800 border border-yellow-400 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
