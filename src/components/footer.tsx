import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer id="contact" className="bg-muted py-12 md:py-16">
      {/* Container with mx-auto to center the whole footer content block */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          {/* flex-col: stack items vertically.
              items-center: horizontally center items within the flex column.
              text-center: center text within the column. */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {/* For li elements that are flex containers themselves (icon + text),
                  justify-center: horizontally centers content within that li.
                  items-center: vertically aligns icon with text. */}
              <li className="flex items-center gap-3 justify-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>123 Faith Avenue, Cityville, ST 12345</span>
              </li>
              <li className="flex items-center gap-3 justify-center">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 justify-center">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>info@icfc.org</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6 justify-center">
              {' '}
              {/* Social links */}
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Resources - apply same centering classes */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="Bible_system" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bible Study Materials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Prayer Requests
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Devotionals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Church Calendar
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved - apply same centering classes */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Volunteer Opportunities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Small Groups
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Youth Ministry
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {`Children's Ministry`}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mission Trips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Outreach Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - apply same centering classes */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Statement of Faith
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Leadership Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Service Times
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice also centered */}
        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} International Chrisitian Festivals in China. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
