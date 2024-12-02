import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
      <header className="bg-gray-800 text-gray-100 py-4 px-8 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold font-serif">Pantry Of Pangaea</span>
          </Link>
  
          {/* Search Bar */}
          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
  
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Share Recipe
            </button>
          </nav>
  
          {/* Profile Section */}
          <div className="flex items-center gap-4 ml-4">
            <Link href="/profile">
              <Image
                src="/pfp.png" // Replace with the user's profile picture URL
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
      </header>
    );
  }
  
  