import Link from "next/link"
import { Church, Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Church className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <span className="text-lg sm:text-xl font-bold">Antioch Platform</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base">
              Uniting fellowships worldwide through shared tools, secure data management, and collaborative features
              that strengthen Christian communities.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  Find Fellowships
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors"
                >
                  Register Fellowship
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors"
                >
                  Download Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © {new Date().getFullYear()} Antioch Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
