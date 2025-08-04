'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Users, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollAnimation } from '@/components/scroll-animation'

interface Fellowship {
  id: string
  name: string
  country: string
  city: string
  memberCount: number
  description: string
  tags: string[]
  image: string
}

export function FellowshipSearch() {
  const [fellowships, setFellowships] = useState<Fellowship[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all') // Updated default value
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFellowships = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockFellowships: Fellowship[] = [
        {
          id: '1',
          name: 'Grace Fellowship Beijing',
          country: 'China',
          city: 'Beijing',
          memberCount: 150,
          description: 'A vibrant international community serving expatriates and locals in Beijing.',
          tags: ['International', 'Bilingual', 'Family-friendly'],
          image:
            'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        },
        {
          id: '2',
          name: 'Hope Church Shanghai',
          country: 'China',
          city: 'Shanghai',
          memberCount: 200,
          description: 'Connecting hearts and building faith in the heart of Shanghai.',
          tags: ['Young Professionals', 'Urban Ministry'],
          image:
            'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        },
        {
          id: '3',
          name: 'New Life Fellowship Singapore',
          country: 'Singapore',
          city: 'Singapore',
          memberCount: 180,
          description: 'Multicultural fellowship welcoming all nations and backgrounds.',
          tags: ['Multicultural', 'International'],
          image:
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        },
      ]

      setFellowships(mockFellowships)
      setIsLoading(false)
    }

    void fetchFellowships()
  }, [])

  const filteredFellowships = fellowships.filter((fellowship) => {
    const matchesSearch =
      fellowship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fellowship.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || fellowship.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  const countries = [...new Set(fellowships.map((f) => f.country))].sort()

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-bl from-blue-200/30 to-purple-200/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Discover{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fellowships
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Connect with Christian communities around the world and find your spiritual home
            </p>
          </div>
        </ScrollAnimation>

        {/* Search Interface */}
        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-12 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search fellowships by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                />
              </div>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem> {/* Updated value prop */}
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                {isLoading ? 'Loading...' : `${filteredFellowships.length} fellowships found`}
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Link href="/search">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollAnimation>

        {/* Fellowship Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={index * 150}>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))
            : filteredFellowships.map((fellowship, index) => (
                <ScrollAnimation key={fellowship.id} animation="fade-up" delay={index * 150}>
                  <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden hover:scale-105">
                    <div className="relative overflow-hidden">
                      <Image
                        src={fellowship.image || '/placeholder.svg'}
                        alt={fellowship.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {fellowship.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                          <span>
                            {fellowship.city}, {fellowship.country}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-green-500" />
                          <span>{fellowship.memberCount} members</span>
                        </div>

                        <p className="text-gray-700 text-sm line-clamp-2">{fellowship.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {fellowship.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              {tag}
                            </Badge>
                          ))}
                          {fellowship.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{fellowship.tags.length - 2} more
                            </Badge>
                          )}
                        </div>

                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <Link href={`/fellowship/${fellowship.id}`}>
                            <Globe className="mr-2 h-4 w-4" />
                            Visit Fellowship
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
        </div>

        {filteredFellowships.length === 0 && !isLoading && (
          <ScrollAnimation animation="fade-up">
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No fellowships found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria or browse all fellowships.</p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCountry('all') // Updated default value
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Show All Fellowships
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
