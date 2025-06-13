import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import TestimonialCarousel from '@/components/testimonial-carousel'
import AnnouncementCarousel from '@/components/announcement-carousel'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">International Chrisitian Festivals in</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#events" className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Praise Reports
            </Link>
            <Link href="#announcements" className="text-sm font-medium transition-colors hover:text-primary">
              Announcements
            </Link>
            <Link href="#donate" className="text-sm font-medium transition-colors hover:text-primary">
              Donate
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/account" className="flex items-center gap-1 text-sm font-medium">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
            <Button className="hidden md:flex">Get Involved</Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Church building"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="container relative z-10 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              International Chrisitian Festivals in China
            </h1>
            <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl mb-8">
              Raising christian leaders, promoting unity, and facilitating revivals across fellowships in the land
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Join an ICF this Sunday
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm">
                Watch Online
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">About Us</h2>
                <p className="text-muted-foreground mb-6">
                  Established in 1985 by Christian students who could not return home during holidays, the initiative
                  began by organizing festivals, retreats, conferences, and seminars for students stranded on campus.
                  Over time, the ICFC has evolved into a pivotal force—training Christian leaders, fostering unity, and
                  igniting revivals across fellowships in China.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our mission is to serve as a unifying platform for Christian students, providing spiritual growth
                  through retreats, leadership training, and revival initiatives—empowering fellowships across China
                  with enduring faith and community.
                </p>
                <Button>Learn More About Us</Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Church congregation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Upcoming Events</h2>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Join us for these special events and be part of the ICFC family
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Event 1 */}
              <Card>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Sunday Service"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                    This Sunday
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>May 1, 2025 • 10:00 AM</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sunday Worship Service</h3>
                  <p className="text-muted-foreground mb-4">
                    Join an ICFC affiliate fellowship today for our weekly worship service with inspiring messages and
                    uplifting music.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Event 2 */}
              <Card>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Youth Group" fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                    Next Week
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>May 5, 2025 • 6:30 PM</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Youth Group Gathering</h3>
                  <p className="text-muted-foreground mb-4">
                    A special evening for teens to connect, have fun, and grow in their faith journey.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Event 3 */}
              <Card>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Community Outreach"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                    Coming Soon
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>May 15, 2025 • 9:00 AM</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Outreach Day</h3>
                  <p className="text-muted-foreground mb-4">
                    Volunteer with us as we serve our local ICFs through various service projects.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button>View All Events</Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Praise Reports</h2>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Hear about divine testimonies and encounters with God at our events
              </p>
            </div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* Announcements Section */}
        <section id="announcements" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Announcements</h2>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Stay updated with the latest news and information from ICFC
              </p>
            </div>

            <AnnouncementCarousel />
          </div>
        </section>

        {/* Donations Section */}
        <section id="donate" className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Support Our Ministry
                </h2>
                <p className="mb-6">
                  Your generous donations help us continue our mission of serving the purposes of God and spreading
                  God's love. Every contribution, no matter the size, makes a difference in the lives we touch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="secondary" size="lg" className="text-primary">
                    <Heart className="mr-2 h-5 w-5" /> Donate Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Learn About Giving
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Ways to Give</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full mt-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Online Giving</h4>
                      <p className="text-sm opacity-80">Make a secure donation through our online portal</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full mt-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Text to Give</h4>
                      <p className="text-sm opacity-80">Text "GIVE" to (555) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full mt-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Recurring Giving</h4>
                      <p className="text-sm opacity-80">Set up automatic monthly donations</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span>123 Faith Avenue, Cityville, ST 12345</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span>info@icfc.org</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
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

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sermons
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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

            {/* Get Involved */}
            <div>
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
                    Children's Ministry
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

            {/* Quick Links */}
            <div>
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

          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} International Chrisitian Festivals in China. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
