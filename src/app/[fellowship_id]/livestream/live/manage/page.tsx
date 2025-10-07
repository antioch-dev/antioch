'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Play, Calendar, Tag, X } from 'lucide-react'

// Mock data for streams management
const getManageableStreams = (fellowshipId: string) => {
  return [
    {
      id: 1,
      title: "Sunday Morning Worship - New Beginnings",
      type: "youtube" as const,
      link: "dQw4w9WgXcQ",
      date: "2024-01-14T10:00:00",
      description: "Join us for an inspiring message about new beginnings and God's faithfulness.",
      tags: ["worship", "sunday-service", "pastor-johnson"],
      isLive: true,
      isHidden: false,
      views: 127
    },
    {
      id: 2,
      title: "Wednesday Bible Study - Prayer & Fasting",
      type: "zoom" as const,
      meetingId: "123-456-789",
      password: "faith2024",
      date: "2024-01-10T19:00:00",
      description: "Deep dive into the power of prayer and fasting.",
      tags: ["bible-study", "prayer", "interactive"],
      isLive: false,
      isHidden: false,
      views: 89
    },
    {
      id: 3,
      title: "Christmas Eve Service - The Light of Hope",
      type: "youtube" as const,
      link: "dQw4w9WgXcQ",
      date: "2023-12-24T19:00:00",
      description: "A beautiful Christmas Eve service celebrating the birth of our Savior.",
      tags: ["christmas", "special-service", "hope"],
      isLive: false,
      isHidden: true,
      views: 342
    }
  ]
}

interface Stream {
  id?: number
  title: string
  type: 'youtube' | 'zoom'
  link?: string
  meetingId?: string
  password?: string
  date: string
  description: string
  tags: string[]
  isLive: boolean
  isHidden: boolean
  views?: number
}

export default function ManagePage() {
  const params = useParams()
  const fellowshipId = params?.fellowship as string || 'downtown'
  const [darkMode, setDarkMode] = useState(false)
  const [streams, setStreams] = useState<Stream[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingStream, setEditingStream] = useState<Stream | null>(null)
  const [formData, setFormData] = useState<Stream>({
    title: '',
    type: 'youtube',
    link: '',
    meetingId: '',
    password: '',
    date: '',
    description: '',
    tags: [],
    isLive: false,
    isHidden: false
  })
  const [tagInput, setTagInput] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStreams(getManageableStreams(fellowshipId))
    setMounted(true)
  }, [fellowshipId])

  const formatFellowshipName = (id: string) => {
    return id.split(/(?=[A-Z])/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') + ' Fellowship'
  }

  const openModal = (stream?: Stream) => {
    if (stream) {
      setEditingStream(stream)
      setFormData(stream)
    } else {
      setEditingStream(null)
      setFormData({
        title: '',
        type: 'youtube',
        link: '',
        meetingId: '',
        password: '',
        date: '',
        description: '',
        tags: [],
        isLive: false,
        isHidden: false
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingStream(null)
    setTagInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingStream) {
      setStreams(streams.map(stream => 
        stream.id === editingStream.id ? { ...formData, id: editingStream.id } : stream
      ))
    } else {
      const newStream = { ...formData, id: Date.now(), views: 0 }
      setStreams([newStream, ...streams])
    }
    
    closeModal()
  }

  const deleteStream = (id: number) => {
    if (confirm('Are you sure you want to delete this stream?')) {
      setStreams(streams.filter(stream => stream.id !== id))
    }
  }

  const toggleVisibility = (id: number) => {
    setStreams(streams.map(stream => 
      stream.id === id ? { ...stream, isHidden: !stream.isHidden } : stream
    ))
  }

  const setCurrentStream = (id: number) => {
    setStreams(streams.map(stream => ({
      ...stream,
      isLive: stream.id === id
    })))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

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
              href={"/fellowship1/live"}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Manage Streams
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
              href={"/fellowship1/live//gallery"}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
            >
              Gallery
            </Link>
            <button
              onClick={() => openModal()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 shadow-sm flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Stream</span>
            </button>
          </div>
        </header>

        {/* Streams List */}
        <div className="space-y-4">
          {streams.map((stream, index) => (
            <div
              key={stream.id}
              className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } ${stream.isHidden ? 'opacity-60' : ''} animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stream.title}
                    </h3>
                    {stream.isLive && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </span>
                    )}
                    {stream.isHidden && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>
                        HIDDEN
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{new Date(stream.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag size={16} />
                      <span>{stream.type}</span>
                    </div>
                    {stream.views !== undefined && (
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{stream.views} views</span>
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stream.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {stream.tags.map(tag => (
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
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {!stream.isLive && (
                    <button
                      onClick={() => setCurrentStream(stream.id!)}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                      title="Set as Current"
                    >
                      <Play size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => toggleVisibility(stream.id!)}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      stream.isHidden
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                    title={stream.isHidden ? 'Show' : 'Hide'}
                  >
                    {stream.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => openModal(stream)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteStream(stream.id!)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {streams.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Play className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={32} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No streams yet
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Create your first stream to get started
            </p>
            <button
              onClick={() => openModal()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              Add Stream
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
            <div
              className={`rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } animate-fade-in`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {editingStream ? 'Edit Stream' : 'Add New Stream'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter stream title"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'youtube' | 'zoom' })}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>

                  {formData.type === 'youtube' ? (
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        YouTube Video ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.link || ''}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="e.g., dQw4w9WgXcQ"
                      />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Meeting ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.meetingId || ''}
                          onChange={(e) => setFormData({ ...formData, meetingId: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="123-456-789"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Password
                        </label>
                        <input
                          type="text"
                          value={formData.password || ''}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Optional password"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter stream description"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Tags
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-300 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded text-sm flex items-center space-x-1 ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-500 transition-colors duration-300"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isLive}
                        onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Set as current live stream
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isHidden}
                        onChange={(e) => setFormData({ ...formData, isHidden: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Hide from public
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                    >
                      {editingStream ? 'Update Stream' : 'Create Stream'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
