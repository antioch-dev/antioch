"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Smartphone, Monitor, Tablet, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animation"

const apps = [
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "iOS & Android apps with offline capabilities",
    rating: 4.8,
    downloads: "10K+",
    platforms: ["iOS", "Android"],
  },
  {
    icon: Monitor,
    title: "Desktop Client",
    description: "Full-featured desktop application",
    rating: 4.9,
    downloads: "15K+",
    platforms: ["Windows", "macOS", "Linux"],
  },
  {
    icon: Tablet,
    title: "Tablet Edition",
    description: "Optimized for tablets and large screens",
    rating: 4.7,
    downloads: "5K+",
    platforms: ["iPad", "Android Tablet"],
  },
]

export function DownloadSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-bl from-green-200/30 to-blue-200/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tr from-blue-200/30 to-green-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Download{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Apps
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Access Antioch on all your devices with our native applications designed for the best user experience
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {apps.map((app, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 150}>
              <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden hover:scale-105">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <app.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {app.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">{app.description}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{app.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        <span className="font-medium">{app.downloads}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      {app.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download Now
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-up" delay={400}>
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20 inline-block">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Need More Tools?</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Explore our complete suite of ministry tools, plugins, and resources designed for modern fellowships.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg group"
              >
                <Link href="/download">
                  View All Downloads
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
