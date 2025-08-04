'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Users, Globe, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Fellowship {
  id: string
  name: string
  country: string
  city: string
  memberCount: number
  description: string
  subpath: string
  tags: string[]
  established: string
  languages: string[]
  image: string
}

export default function SearchPage() {
  const [fellowships, setFellowships] = useState<Fellowship[]>([])
  const [filteredFellowships, setFilteredFellowships] = useState<Fellowship[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    // Mock API call with more comprehensive data
    const mockFellowships: Fellowship[] = [
      {
        id: '1',
        name: 'Grace Fellowship Beijing',
        country: 'China',
        city: 'Beijing',
        memberCount: 150,
        description:
          'A vibrant international community serving expatriates and locals in Beijing with English and Chinese services.',
        subpath: 'grace-beijing',
        tags: ['International', 'Bilingual', 'Family-friendly'],
        established: '2018',
        languages: ['English', 'Chinese'],
        image:
          'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '2',
        name: 'Hope Church Shanghai',
        country: 'China',
        city: 'Shanghai',
        memberCount: 200,
        description:
          'Connecting hearts and building faith in the heart of Shanghai with a focus on young professionals.',
        subpath: 'hope-shanghai',
        tags: ['Young Professionals', 'Urban Ministry', 'Contemporary'],
        established: '2015',
        languages: ['English', 'Chinese', 'Korean'],
        image:
          'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '3',
        name: 'Living Waters Guangzhou',
        country: 'China',
        city: 'Guangzhou',
        memberCount: 120,
        description: 'A growing fellowship focused on community outreach and discipleship in South China.',
        subpath: 'living-waters-gz',
        tags: ['Community Outreach', 'Discipleship', 'Missions'],
        established: '2019',
        languages: ['English', 'Chinese'],
        image:
          'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '4',
        name: 'New Life Fellowship Singapore',
        country: 'Singapore',
        city: 'Singapore',
        memberCount: 180,
        description: 'Multicultural fellowship welcoming all nations and backgrounds in the heart of Southeast Asia.',
        subpath: 'newlife-singapore',
        tags: ['Multicultural', 'International', 'Worship'],
        established: '2012',
        languages: ['English', 'Mandarin', 'Tamil', 'Malay'],
        image:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '5',
        name: 'Cornerstone Church Tokyo',
        country: 'Japan',
        city: 'Tokyo',
        memberCount: 95,
        description: 'English-speaking fellowship in the heart of Tokyo, serving the international community.',
        subpath: 'cornerstone-tokyo',
        tags: ['International', 'English-speaking', 'Expat Community'],
        established: '2020',
        languages: ['English', 'Japanese'],
        image:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '6',
        name: 'Lighthouse Fellowship Seoul',
        country: 'South Korea',
        city: 'Seoul',
        memberCount: 140,
        description: 'Dynamic fellowship serving both Korean and international communities with contemporary worship.',
        subpath: 'lighthouse-seoul',
        tags: ['Contemporary', 'Bilingual', 'Youth Ministry'],
        established: '2017',
        languages: ['Korean', 'English'],
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '7',
        name: 'Harvest Church Kuala Lumpur',
        country: 'Malaysia',
        city: 'Kuala Lumpur',
        memberCount: 220,
        description:
          'Thriving multicultural church in Malaysia with strong emphasis on family ministry and community service.',
        subpath: 'harvest-kl',
        tags: ['Family Ministry', 'Community Service', 'Multicultural'],
        established: '2014',
        languages: ['English', 'Malay', 'Chinese', 'Tamil'],
        image:
          'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
      {
        id: '8',
        name: 'Victory Fellowship Manila',
        country: 'Philippines',
        city: 'Manila',
        memberCount: 300,
        description: 'Large, vibrant fellowship in the Philippines with strong missions focus and youth programs.',
        subpath: 'victory-manila',
        tags: ['Missions', 'Youth Programs', 'Large Community'],
        established: '2010',
        languages: ['English', 'Filipino'],
        image:
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      },
    ]

    setFellowships(mockFellowships)
    setFilteredFellowships(mockFellowships)
  }, [])

  useEffect(() => {
    let filtered = fellowships

    if (searchTerm) {
      filtered = filtered.filter(
        (fellowship) =>
          fellowship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fellowship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fellowship.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCountry) {
      filtered = filtered.filter((fellowship) => fellowship.country === selectedCountry)
    }

    if (selectedCity) {
      filtered = filtered.filter((fellowship) => fellowship.city === selectedCity)
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'members':
          return b.memberCount - a.memberCount
        case 'established':
          return Number.parseInt(b.established) - Number.parseInt(a.established)
        default:
          return 0
      }
    })

    setFilteredFellowships(filtered)
  }, [searchTerm, selectedCountry, selectedCity, sortBy, fellowships])

  const countries = [...new Set(fellowships.map((f) => f.country))].sort()
  const cities = selectedCountry
    ? [...new Set(fellowships.filter((f) => f.country === selectedCountry).map((f) => f.city))].sort()
    : [...new Set(fellowships.map((f) => f.city))].sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Fellowship</h1>
          <p className="text-lg text-gray-600">
            Discover Christian communities around the world and connect with fellowships that share your values.
          </p>
        </div>

        {/* Advanced Search Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search fellowships, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="members">Member Count</SelectItem>
                <SelectItem value="established">Recently Established</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredFellowships.length} of {fellowships.length} fellowships
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCountry('')
                setSelectedCity('')
                setSortBy('name')
              }}
              variant="outline"
              size="sm"
              className="rounded-full hover:scale-105 transition-all duration-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Fellowship Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFellowships.map((fellowship) => (
            <Card
              key={fellowship.id}
              className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg group-hover:text-blue-600 transition-colors duration-300">
                    {fellowship.name}
                  </span>
                  <Globe className="h-5 w-5 text-blue-600" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img
                    src={fellowship.image || '/placeholder.svg'}
                    alt={fellowship.name}
                    width={300}
                    height={200}
                    className="rounded-xl object-cover mb-4 w-full h-48 transition-transform duration-500 group-hover:scale-105"
                  />
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

                  <p className="text-gray-700 text-sm line-clamp-3">{fellowship.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {fellowship.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {tag}
                      </Badge>
                    ))}
                    {fellowship.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{fellowship.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Established: {fellowship.established}</p>
                    <p>Languages: {fellowship.languages.join(', ')}</p>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Link href={`/fellowship/${fellowship.subpath}`}>Visit Fellowship</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFellowships.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No fellowships found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or browse all fellowships.</p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('')
                  setSelectedCity('')
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Show All Fellowships
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
