import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SearchBar from "@/components/search-bar";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 text-white shadow-lg w-full"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wider">
          <Link href="/">Pantry of Pangaea</Link>
        </div>

        {/* Search Bar */}
        <SearchBar />
        {/*
        <div className="flex-grow mx-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button type="submit" style={{display: "none"}} />
          </form>
        </div>
        */}

        {/* Navigation Area */}
        <div className="flex-grow flex justify-end items-center space-x-6 text-lg">
          {/* NOT Signed In */}
          {!user && <>
            <Link href="/sign-in" className="hover:underline">
              Sign In
            </Link>
            <Link href="/sign-up" className="hover:underline">
              Sign Up
            </Link>
          </>}

          {/* Signed In */}
          {user && <>
            <Link href="/post" className="hover:underline">
              Post Recipe
            </Link>
            <Link href="/ERRORPAGE" className="hover:underline">
              Log Out
            </Link>
          </>}

          {/* Search Button */}
          {/*
          <div
            className={`hover:cursor-pointer transition-all duration-500 ${
              isSearchActive ? "opacity-0 pointer-events-none" : ""
            }`}
            onMouseEnter={() => setIsSearchActive(true)} // Activate search on hover
          >
            Search
          </div>
          */}

          {/* Search Bar */}
          {/*
          <div className="absolute right-4 w-[400px] transition-transform duration-500 ease-in-out">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full px-4 py-2 bg-white text-gray-800 border border-yellow-400 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            />
          </div>
          */}
        </div>
      </nav>
    </header>
  );
}

