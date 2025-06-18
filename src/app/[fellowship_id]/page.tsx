import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TestimonialCarousel from '@/components/testimonial-carousel';
import AnnouncementCarousel from '@/components/announcement-carousel';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex-1 w-full"> 
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Church building"
            fill
            className="object-cover brightness-50"
            priority
          />
        
          <div className="container relative z-10 text-center text-white mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              International Christian Festivals in China
            </h1>
            <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl mb-8">
              Raising Christian leaders, promoting unity, and facilitating revivals across fellowships in the land
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
          <div className="container mx-auto">
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
          <div className="container mx-auto">
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
          <div className="container mx-auto">
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
          
          <div className="container mx-auto">
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
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Support Our Ministry
                </h2>
                <p className="mb-6">
                  {`Your generous donations help us continue our mission of serving the purposes of God and spreading
                  God's love. Every contribution, no matter the size, makes a difference in the lives we touch.`}
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
                      <p className="text-sm opacity-80">{`Text "GIVE" to (555) 123-4567`}</p>
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
    </div>
  );
}