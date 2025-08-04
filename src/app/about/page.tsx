import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Shield, Globe, Users, Target, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Antioch Platform</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Empowering Christian communities worldwide through technology, unity, and shared purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction & Motivation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story & Motivation</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  The Antioch Platform was born from a deep understanding of the challenges faced by Christians
                  relocating across Asia and beyond. As believers move for work, study, or ministry, they often struggle
                  to find and connect with local Christian communities.
                </p>
                <p>
                  We witnessed firsthand the difficulties of fellowship leaders trying to manage their communities with
                  fragmented tools, security concerns, and the constant challenge of maintaining continuity during
                  leadership transitions.
                </p>
                <p>
                  Our founders, having experienced these challenges while living and serving in various Asian cities,
                  envisioned a unified platform that would break down barriers and strengthen the global body of Christ.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Christian community gathering"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Challenges We Address</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {`Through extensive research and community feedback, we've identified key pain points that fellowships face
              in today's digital age.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-6 w-6 mr-3 text-red-600" />
                  Data Fragmentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fellowship information scattered across multiple platforms, making it difficult to maintain consistent
                  communication and member engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-6 w-6 mr-3 text-orange-600" />
                  Security Concerns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sensitive fellowship data stored on unsecured platforms, putting member privacy and community safety
                  at risk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Globe className="h-6 w-6 mr-3 text-blue-600" />
                  Limited Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Difficulty sharing resources, coordinating events, and collaborating with other fellowships due to
                  isolated systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Heart className="h-6 w-6 mr-3 text-green-600" />
                  High Financial Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Multiple subscription services and tools creating financial burden, especially for smaller fellowships
                  with limited budgets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-6 w-6 mr-3 text-purple-600" />
                  Leadership Transitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Loss of institutional knowledge and continuity when leaders transition, affecting fellowship stability
                  and growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Eye className="h-6 w-6 mr-3 text-indigo-600" />
                  Isolation & Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Difficulty for newcomers to discover fellowships and for fellowships to connect with the broader
                  Christian community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To streamline and unify church management tools, creating a comprehensive platform that empowers
                Christian fellowships to focus on their core mission of building relationships, growing in faith, and
                serving their communities.
              </p>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Eliminate data fragmentation through unified systems
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Provide enterprise-grade security for sensitive fellowship data
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Reduce operational costs through shared infrastructure
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6">
                To create a global network of connected Christian communities where fellowships can thrive, collaborate,
                and support each other while maintaining their unique identity and local focus.
              </p>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Foster collaboration between fellowships worldwide
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Ensure service continuity through leadership transitions
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Promote sustainable growth and resource sharing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Faith-Centered</h3>
              <p className="text-gray-600">
                Every feature is designed with Christian values and biblical principles at its core.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
              <p className="text-gray-600">
                {`Protecting your community's data and privacy is our highest technical priority.`}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Built by the community, for the community, with continuous feedback and improvement.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Unity</h3>
              <p className="text-gray-600">
                Connecting believers across cultures and borders to strengthen the global church.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            {`Be part of a movement that's transforming how Christian communities connect, grow, and serve together around
            the world.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/register">
                Register Your Fellowship
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/search">Explore Fellowships</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
