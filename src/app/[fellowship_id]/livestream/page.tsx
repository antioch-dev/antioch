'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Play, Users, Calendar, Sparkles, ArrowRight, Clock, MapPin } from 'lucide-react'

const fellowships = [
  {
    id: 'downtown',
    name: 'Downtown Fellowship',
    description: 'Heart of the city community',
    memberCount: 250,
    nextStream: '2024-01-14T10:00:00Z',
    isLive: true,
    currentViewers: 127,
    gradient: 'from-blue-600 via-purple-600 to-indigo-700'
  },
  {
    id: 'northside',
    name: 'Northside Fellowship',
    description: 'Growing together in faith',
    memberCount: 180,
    nextStream: '2024-01-14T11:00:00Z',
    isLive: false,
    currentViewers: 0,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700'
  },
  {
    id: 'westend',
    name: 'West End Fellowship',
    description: 'Community focused worship',
    memberCount: 320,
    nextStream: '2024-01-14T09:30:00Z',
    isLive: true,
    currentViewers: 89,
    gradient: 'from-orange-500 via-red-500 to-pink-600'
  },
  {
    id: 'riverside',
    name: 'Riverside Fellowship',
    description: 'Peaceful worship by the water',
    memberCount: 150,
    nextStream: '2024-01-14T10:30:00Z',
    isLive: false,
    currentViewers: 0,
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-700'
  }
]

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 rounded-lg mb-4 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
    <div className="h-10 bg-gray-300 rounded-lg"></div>
  </div>
)

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const liveFellowships = fellowships.filter(f => f.isLive)
  const currentLiveStream = liveFellowships[0] 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-ping mx-auto opacity-20"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${
                darkMode 
                  ? 'from-white via-blue-100 to-purple-200' 
                  : 'from-gray-900 via-blue-900 to-purple-900'
              } bg-clip-text text-transparent`}>
                Antioch Live
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`group px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600' 
                  : 'bg-gradient-to-r from-white to-gray-50 text-gray-900 hover:from-gray-50 hover:to-white'
              } shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20`}
            >
              <span className="flex items-center space-x-2">
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
                  {darkMode ? '☀️' : '🌙'}
                </span>
                <span className="font-medium">{darkMode ? 'Light' : 'Dark'}</span>
              </span>
            </button>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className={`text-5xl md:text-6xl font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Experience{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Divine
              </span>{' '}
              Connection
            </h2>
            <p className={`text-xl md:text-2xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-3xl mx-auto leading-relaxed`}>
              Join your fellowship community through live worship, inspiring teachings, and meaningful fellowship from anywhere in the world
            </p>
          </div>
        </header>

        {/* Live Now Section */}
        {currentLiveStream && (
          <section className="mb-16 animate-slide-up">
            <div className={`relative overflow-hidden rounded-3xl ${
              darkMode ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50' : 'bg-white/70'
            } backdrop-blur-xl border border-white/20 shadow-2xl`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${currentLiveStream.gradient} opacity-10`}></div>
              <div className="relative p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 font-semibold text-sm">LIVE NOW</span>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100/50 text-gray-600'
                    }`}>
                      <Users size={16} />
                      <span className="text-sm font-medium">{currentLiveStream.currentViewers} watching</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <h3 className={`text-3xl md:text-4xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentLiveStream.name}
                    </h3>
                    <p className={`text-lg ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Join us for an inspiring live worship service happening right now!
                    </p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <MapPin size={20} className="text-blue-500" />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {currentLiveStream.description}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center md:justify-end">
                    <Link
                      href={"/fellowship1/livestream/live"}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3">
                        <Play size={24} className="group-hover:scale-110 transition-transform duration-300" />
                        <span>Start Watching</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Fellowship Selection */}
        <section className="mb-16">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Choose Your Fellowship
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Connect with your community and join the worship experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {fellowships.map((fellowship, index) => (
              <div
                key={fellowship.id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                } backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl animate-slide-up`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(fellowship.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${fellowship.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Live Indicator */}
                {fellowship.isLive && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/30">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 font-medium text-xs">LIVE</span>
                    </div>
                  </div>
                )}
                
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${fellowship.gradient} group-hover:bg-clip-text transition-all duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {fellowship.name}
                      </h3>
                      <p className={`text-lg mb-4 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {fellowship.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                        }`}>
                          <Users size={16} className="text-blue-500" />
                        </div>
                        <span className={`font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {fellowship.memberCount}
                        </span>
                      </div>
                      
                      {fellowship.isLive ? (
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                          }`}>
                            <Play size={16} className="text-green-500" />
                          </div>
                          <span className={`font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {fellowship.currentViewers} watching
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                          }`}>
                            <Clock size={16} className="text-orange-500" />
                          </div>
                          <span className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Next: {new Date(fellowship.nextStream).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Link
                      href={"/fellowship1/livestream/live"}
                      className={`flex-1 group/btn relative overflow-hidden ${
                        fellowship.isLive 
                          ? `bg-gradient-to-r ${fellowship.gradient}` 
                          : darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-200 hover:bg-gray-300'
                      } text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className="relative flex items-center justify-center space-x-2">
                        <Play size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="font-semibold">
                          {fellowship.isLive ? 'Join Live' : 'View Stream'}
                        </span>
                      </div>
                    </Link>
                    
                    <Link
                      href={"/fellowship1/livestream/live/gallery"}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 border-2 ${
                        hoveredCard === fellowship.id
                          ? `border-transparent bg-gradient-to-r ${fellowship.gradient} text-white`
                          : darkMode 
                            ? 'border-gray-600 text-gray-300 hover:border-gray-500' 
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-medium">Gallery</span>
                      <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="animate-slide-up">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Experience Live Worship
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Everything you need for meaningful spiritual connection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Play,
                title: 'Live Streaming',
                description: 'Join live worship services and special events from anywhere in the world',
                gradient: 'from-blue-500 to-cyan-600',
                delay: '0ms'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Connect with your fellowship community through interactive features and chat',
                gradient: 'from-emerald-500 to-teal-600',
                delay: '150ms'
              },
              {
                icon: Calendar,
                title: 'Archive',
                description: 'Access past services and teachings anytime in our comprehensive gallery',
                gradient: 'from-purple-500 to-pink-600',
                delay: '300ms'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                } backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl animate-slide-up`}
                style={{ animationDelay: feature.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 text-center ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-center leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
