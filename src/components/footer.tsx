import Link from "next/link";

export function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-row md:flex-row justify-between gap-4 mb-6">
            {/* About Section */}
            <div className="flex-1 mt-4 md:mt-0">
              <p className="text-sm md:text-base">
                Welcome to our recipe-sharing platform, where food lovers gather to share their passion for cooking. Discover new recipes, connect with fellow chefs, and explore endless culinary possibilities.
              </p>
            </div>
          </div>
  
          {/* Links Section */}
          <div className="flex flex-row gap-2 md:gap-4 justify-evenly">
              <Link href="/about">
                <span className="hover:text-white">About Us</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-white">Contact Us</span>
              </Link>
              <Link href="/faq">
                <span className="hover:text-white">FAQ</span>
              </Link>
              <Link href="/eula">
                <span className="hover:text-white">EULA</span>
              </Link>
              <Link href="/tos">
                <span className="hover:text-white">Terms of Service</span>
              </Link>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} PantryOfPangaea. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }