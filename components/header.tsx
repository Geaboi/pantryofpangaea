import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 text-white shadow-lg w-full">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wider">
          <Link href="/">Pantry of Pangaea</Link>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/sign-up" className="hover:underline">
              Sign Up
            </Link>
          </li>
          <li>
            <Link href="/sign-in" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:underline">
              Search
            </Link>
          </li>
          <li>
            <Link href="/post-recipe" className="hover:underline">
              Post Recipe
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
