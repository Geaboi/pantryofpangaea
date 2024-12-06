export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 text-white shadow-lg w-full">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          {/* Footer Text */}
          <div className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Chefs of Pangaea. All rights reserved.
          </div>
  
          {/* Footer Links */}
          <ul className="flex space-x-6 text-sm">
            <li>
              <a
                href="/about"
                className="hover:underline transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="hover:underline transition-colors duration-300"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:underline transition-colors duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/tos"
                className="hover:underline transition-colors duration-300"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  