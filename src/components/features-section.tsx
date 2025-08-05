import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Video, Shield, Globe, Heart, MessageSquare, BarChart3, Cloud, Smartphone } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const features = [
  {
    icon: Users,
    title: "Community Management",
    description: "Comprehensive member management with profiles, groups, and communication tools.",
  },
  {
    icon: Calendar,
    title: "Event Planning",
    description: "Create, manage, and promote events with RSVP tracking and automated reminders.",
  },
  {
    icon: Video,
    title: "Live Streaming",
    description: "High-quality live streaming for services, meetings, and special events.",
  },
  {
    icon: Shield,
    title: "Secure Data",
    description: "Enterprise-grade security with encrypted data storage and privacy controls.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with fellowships worldwide and share resources across communities.",
  },
  {
    icon: Heart,
    title: "Prayer Requests",
    description: "Dedicated prayer request system with privacy settings and follow-up tracking.",
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description: "Integrated messaging, announcements, and discussion forums for your community.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track engagement, attendance, and growth with detailed analytics dashboards.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure cloud storage for sermons, documents, photos, and multimedia content.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Fully responsive design that works perfectly on all devices and screen sizes.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Everything Your Fellowship Needs
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Powerful tools and features designed specifically for Christian communities, helping you focus on what
              matters most - building relationships and growing in faith.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <Card className="hover:shadow-lg transition-shadow border-0 shadow-md h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg">
                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-up" delay={400}>
          <div className="mt-12 sm:mt-16 bg-blue-50 rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Fellowship?</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join thousands of fellowships worldwide who are already using Antioch to strengthen their communities
                and expand their reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </Button>
                <Button className="border border-blue-600 text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
