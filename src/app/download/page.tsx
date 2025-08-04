import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Download,
  Smartphone,
  Monitor,
  Tablet,
  Music,
  FileText,
  Video,
  Settings,
  Calendar,
  MessageSquare,
  Users,
  BarChart3,
  Shield,
  Star,
  CheckCircle,
} from 'lucide-react'

const mobileApps = [
  {
    icon: Smartphone,
    title: 'Antioch Mobile App',
    description:
      'Complete fellowship management on your mobile device with offline capabilities and push notifications.',
    version: 'v2.1.0',
    size: '45 MB',
    platforms: ['iOS', 'Android'],
    rating: 4.8,
    downloads: '10K+',
    features: ['Offline access', 'Push notifications', 'Event management', 'Prayer requests', 'Live streaming'],
  },
  {
    icon: Tablet,
    title: 'Antioch Tablet Edition',
    description: 'Optimized tablet experience for worship leaders and ministry coordinators.',
    version: 'v1.9.0',
    size: '52 MB',
    platforms: ['iPad', 'Android Tablet'],
    rating: 4.7,
    downloads: '5K+',
    features: ['Large screen UI', 'Multi-window support', 'Presentation mode', 'Advanced controls'],
  },
]

const desktopApps = [
  {
    icon: Monitor,
    title: 'Antioch Desktop Client',
    description: 'Full-featured desktop application with advanced administrative tools and bulk operations.',
    version: 'v1.8.2',
    size: '120 MB',
    platforms: ['Windows', 'macOS', 'Linux'],
    rating: 4.9,
    downloads: '15K+',
    features: ['Advanced admin tools', 'Bulk operations', 'Data export/import', 'Multi-account support'],
  },
  {
    icon: Settings,
    title: 'Fellowship Admin Suite',
    description: 'Comprehensive administrative dashboard for fellowship leaders and coordinators.',
    version: 'v3.2.1',
    size: '95 MB',
    platforms: ['Windows', 'macOS'],
    rating: 4.8,
    downloads: '8K+',
    features: ['Member management', 'Financial tracking', 'Report generation', 'Role-based access'],
  },
]

const ministryTools = [
  {
    icon: Video,
    title: 'Live Streaming Kit',
    description: 'Professional streaming software with multi-camera support, overlays, and recording capabilities.',
    version: 'v3.0.1',
    size: '200 MB',
    platforms: ['Windows', 'macOS'],
    rating: 4.9,
    downloads: '12K+',
    features: ['Multi-camera support', 'Custom overlays', 'Recording', 'Stream scheduling'],
  },
  {
    icon: Music,
    title: 'Worship Planning Tool',
    description: 'Plan worship services, manage song libraries, coordinate with musicians, and create service orders.',
    version: 'v1.5.0',
    size: '80 MB',
    platforms: ['Windows', 'macOS', 'Web'],
    rating: 4.7,
    downloads: '9K+',
    features: ['Song library', 'Service planning', 'Musician coordination', 'Chord charts'],
  },
  {
    icon: FileText,
    title: 'Sermon Manager',
    description: 'Organize, store, and share sermons with advanced search, tagging, and collaboration features.',
    version: 'v2.3.1',
    size: '35 MB',
    platforms: ['Web', 'Mobile'],
    rating: 4.6,
    downloads: '7K+',
    features: ['Advanced search', 'Tagging system', 'Collaboration', 'Audio/video support'],
  },
  {
    icon: Calendar,
    title: 'Event Coordinator',
    description: 'Comprehensive event planning and management tool with RSVP tracking and automated reminders.',
    version: 'v2.1.3',
    size: '60 MB',
    platforms: ['Web', 'Mobile', 'Desktop'],
    rating: 4.8,
    downloads: '11K+',
    features: ['RSVP tracking', 'Automated reminders', 'Resource booking', 'Volunteer coordination'],
  },
  {
    icon: MessageSquare,
    title: 'Communication Hub',
    description: 'Integrated messaging platform with announcements, group chats, and prayer request management.',
    version: 'v1.7.2',
    size: '40 MB',
    platforms: ['Web', 'Mobile'],
    rating: 4.5,
    downloads: '6K+',
    features: ['Group messaging', 'Announcements', 'Prayer requests', 'File sharing'],
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track fellowship growth, engagement metrics, and generate detailed reports for leadership.',
    version: 'v2.0.0',
    size: '25 MB',
    platforms: ['Web'],
    rating: 4.7,
    downloads: '4K+',
    features: ['Growth tracking', 'Engagement metrics', 'Custom reports', 'Data visualization'],
  },
]

function ToolCard({ tool, category }: { tool: (typeof mobileApps)[0]; category: string }) {
  return (
    <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <tool.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">
                {tool.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {category}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  {tool.rating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{tool.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Version:</span>
            <span className="font-medium">{tool.version}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Size:</span>
            <span className="font-medium">{tool.size}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Downloads:</span>
            <span className="font-medium">{tool.downloads}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Platforms:</span>
            <span className="font-medium">{tool.platforms.join(', ')}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {tool.features.slice(0, 3).map((feature: string, index: number) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
            {tool.features.length > 3 && (
              <li className="text-blue-600 text-xs">+{tool.features.length - 3} more features</li>
            )}
          </ul>
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
          <Download className="h-4 w-4 mr-2" />
          Download Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Download Tools & Resources</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our complete suite of tools designed to empower your fellowship with everything needed for modern
            ministry and community management.
          </p>
        </div>

        <Tabs defaultValue="mobile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
            <TabsTrigger value="mobile" className="flex items-center rounded-xl">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile Apps
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center rounded-xl">
              <Monitor className="h-4 w-4 mr-2" />
              Desktop Apps
            </TabsTrigger>
            <TabsTrigger value="ministry" className="flex items-center rounded-xl">
              <Users className="h-4 w-4 mr-2" />
              Ministry Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileApps.map((app, index) => (
                <ToolCard key={index} tool={app} category="Mobile App" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {desktopApps.map((app, index) => (
                <ToolCard key={index} tool={app} category="Desktop App" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ministry">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministryTools.map((tool, index) => (
                <ToolCard key={index} tool={tool} category="Ministry Tool" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Support Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Need Help Getting Started?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {`Our support team is here to help you set up and configure all tools for your fellowship's specific needs.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-2 border-blue-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardContent className="p-6">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Comprehensive guides and tutorials for all tools</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  View Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-green-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardContent className="p-6">
                <Video className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-gray-600 mb-4">Step-by-step video guides for quick setup</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Support</h3>
                <p className="text-sm text-gray-600 mb-4">Get personalized help from our support team</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Mobile Devices</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• iOS 12.0 or later</li>
                <li>• Android 7.0 (API level 24) or later</li>
                <li>• 2GB RAM minimum</li>
                <li>• 100MB free storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Desktop Systems</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Windows 10 or later</li>
                <li>• macOS 10.14 or later</li>
                <li>• Ubuntu 18.04 or later</li>
                <li>• 4GB RAM minimum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Web Browser</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Chrome 90+ (recommended)</li>
                <li>• Firefox 88+</li>
                <li>• Safari 14+</li>
                <li>• Edge 90+</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
