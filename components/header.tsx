import Link from "next/link";
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
        </div>
      </nav>
    </header>
  );
}

