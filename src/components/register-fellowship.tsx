"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Church, Users, Globe, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animation"

const benefits = [
  {
    icon: Users,
    title: "Community Management",
    description: "Comprehensive tools to manage your fellowship members and activities",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with fellowships worldwide and share resources",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security to protect your community data",
  },
]

const features = [
  "Member management system",
  "Event planning and RSVP tracking",
  "Live streaming capabilities",
  "Prayer request management",
  "Communication tools",
  "Analytics and reporting",
  "Mobile app access",
  "24/7 support",
]

export function RegisterFellowship() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tl from-pink-200/30 to-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <ScrollAnimation animation="fade-right">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Register Your{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Fellowship
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Join thousands of fellowships worldwide on the Antioch platform. Get access to powerful tools designed
                  specifically for Christian communities.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-right" delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-right" delay={400}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  What's Included:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-right" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group shadow-lg"
                >
                  <Link href="/register">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg bg-transparent"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          {/* Visual */}
          <div className="relative">
            <ScrollAnimation animation="fade-left" delay={300}>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
                  <CardTitle className="flex items-center text-2xl">
                    <Church className="h-8 w-8 mr-3" />
                    Fellowship Registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">Free</div>
                      <div className="text-gray-600">Forever Plan</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-700">Setup Time</span>
                        <span className="font-semibold text-gray-900">5 minutes</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-700">Approval Time</span>
                        <span className="font-semibold text-gray-900">24-48 hours</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-700">Support</span>
                        <span className="font-semibold text-gray-900">24/7</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-gray-700">Members</span>
                        <span className="font-semibold text-gray-900">Unlimited</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Link href="/register">
                        Get Started Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
