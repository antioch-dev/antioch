'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Play, Calendar, Tag, Eye } from 'lucide-react'

// Mock data for archived streams
const getArchivedStreams = (fellowshipId: string) => {
  const baseStreams = [
    {
      id: 1,
      title: "Christmas Eve Service - The Light of Hope",
      type: "youtube",
      link: "dQw4w9WgXcQ",
      date: "2023-12-24T19:00:00Z",
      description: "A beautiful Christmas Eve service celebrating the birth of our Savior.",
      tags: ["christmas", "special-service", "hope"],
      views: 342,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Christmas+Service"
    },
    {
      id: 2,
      title: "New Year Prayer & Fasting",
      type: "zoom",
      meetingId: "123-456-789",
      date: "2024-01-01T06:00:00Z",
      description: "Starting the new year with prayer and seeking God's direction.",
      tags: ["prayer", "fasting", "new-year"],
      views: 156,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Prayer+Meeting"
    },
    {
      id: 3,
      title: "Youth Conference - Identity in Christ",
      type: "youtube",
      link: "dQw4w9WgXcQ",
      date: "2023-11-15T18:00:00Z",
      description: "Three-day youth conference focusing on finding identity in Christ.",
      tags: ["youth", "conference", "identity"],
      views: 289,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Youth+Conference"
    },
    {
      id: 4,
      title: "Baptism Sunday - New Life",
      type: "youtube",
      link: "dQw4w9WgXcQ",
      date: "2023-10-08T10:00:00Z",
      description: "Celebrating new life in Christ through baptism.",
      tags: ["baptism", "sunday-service", "celebration"],
      views: 198,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Baptism+Service"
    },
    {
      id: 5,
      title: "Marriage Enrichment Workshop",
      type: "zoom",
      meetingId: "987-654-321",
      date: "2023-09-20T19:00:00Z",
      description: "Strengthening marriages through biblical principles.",
      tags: ["marriage", "workshop", "relationships"],
      views: 87,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Marriage+Workshop"
    },
    {
      id: 6,
      title: "Missions Sunday - Global Impact",
      type: "youtube",
      link: "dQw4w9WgXcQ",
      date: "2023-08-13T10:00:00Z",
      description: "Celebrating our global missions and impact around the world.",
      tags: ["missions", "global", "sunday-service"],
      views: 234,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Missions+Sunday"
    }
  ]
  
  return baseStreams.map(stream => ({
    ...stream,
    fellowship: fellowshipId
  }))
}

export default function GalleryPage() {
  const params = useParams()
  const fellowshipId = params?.fellowship as string || 'downtown'
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [mounted, setMounted] = useState(false)

  const archivedStreams = getArchivedStreams(fellowshipId)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatFellowshipName = (id: string) => {
    return id.split(/(?=[A-Z])/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') + ' Fellowship'
  }

  const filteredStreams = archivedStreams
    .filter(stream => {
      const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stream.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesFilter = selectedFilter === 'all' || 
                           selectedFilter === stream.type ||
                           stream.tags.includes(selectedFilter)
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'most-viewed':
          return b.views - a.views
        default: // newest
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const uniqueTags = [...new Set(archivedStreams.flatMap(stream => stream.tags))]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Link
              href={"/fellowship1/live/"}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Stream Gallery
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatFellowshipName(fellowshipId)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              } shadow-sm`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Link
              href={"/fellowship1/live/manage"}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 shadow-sm"
            >
              Manage
            </Link>
          </div>
        </header>

        {/* Search and Filters */}
        <div className={`rounded-xl p-6 mb-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} animate-slide-up`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search streams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Type
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Types</option>
                    <option value="youtube">YouTube</option>
                    <option value="zoom">Zoom</option>
                    {uniqueTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="most-viewed">Most Viewed</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedFilter('all')
                      setSortBy('newest')
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} animate-fade-in`}>
          Showing {filteredStreams.length} of {archivedStreams.length} streams
        </div>

        {/* Stream Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStreams.map((stream, index) => (
            <div
              key={stream.id}
              className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                {stream.type === 'youtube' ? (
                  <img
                    src={stream.thumbnail || "/placeholder.svg"}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=300&text=Video+Thumbnail"
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Play size={24} />
                      </div>
                      <p className="text-sm font-medium">Zoom Recording</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{stream.views}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className={`font-semibold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stream.title}
                </h3>
                <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stream.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{new Date(stream.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag size={12} />
                    <span>{stream.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {stream.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded text-xs ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (stream.type === 'youtube') {
                      window.open(`https://www.youtube.com/watch?v=${stream.link}`, '_blank')
                    } else {
                      alert(`Zoom Meeting ID: ${stream.meetingId}`)
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Play size={16} />
                  <span>Watch</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStreams.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Search className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={32} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No streams found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
