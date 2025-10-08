"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  Copy,
  ExternalLink,
  Calendar,
  Tag,
  Users,
  Heart,
  ThumbsUp,
  Send,
  Languages,
} from "lucide-react"
import { TranslationOverlay } from "@/components/live-translation/translation-overlay"

interface StreamData {
  id: number
  title: string
  fellowship: string
  type: "youtube" | "zoom"
  date: string // ISO date string
  description: string
  tags: string[]
  isLive: boolean
  viewers: number
  gradient: string
  link?: string
  meetingId?: string
  password?: string
}

const getCurrentStream = (fellowshipId: string): StreamData => {
  // Explicitly type the streams object
  const streams: Record<string, StreamData> = {
    downtown: {
      id: 1,
      title: "Sunday Morning Worship - New Beginnings",
      fellowship: "Downtown Fellowship",
      type: "youtube",
      link: "dQw4w9WgXcQ",
      date: "2024-01-14T10:00:00Z",
      description:
        "Join us for an inspiring message about new beginnings and God's faithfulness. Pastor Johnson will be sharing from Isaiah 43:19.",
      tags: ["worship", "sunday-service", "pastor-johnson"],
      isLive: true,
      viewers: 127,
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
    },
    northside: {
      id: 2,
      title: "Wednesday Bible Study - Prayer & Fasting",
      fellowship: "Northside Fellowship",
      type: "zoom",
      meetingId: "123-456-789",
      password: "faith2024",
      date: "2024-01-14T19:00:00Z",
      description: "Deep dive into the power of prayer and fasting. Interactive discussion and Q&A session.",
      tags: ["bible-study", "prayer", "interactive"],
      isLive: true,
      viewers: 45,
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    },
    westend: {
      id: 3,
      title: "Youth Service - Finding Purpose",
      fellowship: "West End Fellowship",
      type: "youtube",
      link: "dQw4w9WgXcQ",
      date: "2024-01-14T18:00:00Z",
      description: "A special service for our youth focusing on discovering God's purpose for their lives.",
      tags: ["youth", "purpose", "special-service"],
      isLive: true,
      viewers: 89,
      gradient: "from-orange-500 via-red-500 to-pink-600",
    },
    riverside: {
      id: 4,
      title: "Evening Prayer Meeting",
      fellowship: "Riverside Fellowship",
      type: "zoom",
      meetingId: "987-654-321",
      password: "prayer123",
      date: "2024-01-14T20:00:00Z",
      description: "Join us for our weekly prayer meeting as we lift up our community and nation.",
      tags: ["prayer", "community", "evening"],
      isLive: true,
      viewers: 32,
      gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
    },
  }
 
return (streams[fellowshipId] || streams.downtown)!
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 rounded-full animate-ping opacity-20"></div>
    </div>
  </div>
)

interface ChatMessageProps {
    name: string;
    message: string;
    time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ name, message, time }) => (
  <div className="group animate-slide-up p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  </div>
)

export default function LiveStreamPage() {
  const params = useParams()
  const fellowshipId = (params?.fellowship as string) || "downtown"
  const [darkMode, setDarkMode] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(42)
  const [showTranslation, setShowTranslation] = useState(false)

  // The type of currentStream is now safely inferred as StreamData
  const currentStream = getCurrentStream(fellowshipId)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const formatFellowshipName = (id: string) => {
    return (
      id
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") + " Fellowship"
    )
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessage("")
    }
  }

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "dark bg-gradient-to-br from-gray-900 via-slate-900 to-black"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${currentStream.gradient} opacity-10 rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${currentStream.gradient} opacity-10 rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`group p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-white text-gray-600"
              } shadow-lg hover:shadow-xl backdrop-blur-sm`}
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
            <div>
              <h1
                className={`text-3xl font-bold bg-gradient-to-r ${currentStream.gradient} bg-clip-text text-transparent`}
              >
                {formatFellowshipName(fellowshipId)}
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Live Stream Experience</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                showTranslation
                  ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-50"
              } shadow-lg hover:shadow-xl backdrop-blur-sm font-medium`}
            >
              <Languages size={18} />
              <span>Translate</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-900 hover:bg-gray-50"
              } shadow-lg hover:shadow-xl backdrop-blur-sm`}
            >
              <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
            </button>
            <Link
              href={"/fellowship1/live/gallery"}
              className={`px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"
              } shadow-lg hover:shadow-xl backdrop-blur-sm font-medium`}
            >
              Gallery
            </Link>
            <Link
              href={"/fellowship1/live//manage"}
              className={`px-6 py-2 bg-gradient-to-r ${currentStream.gradient} text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium`}
            >
              Manage
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stream Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Badge */}
            {currentStream.isLive && (
              <div className="flex items-center justify-between animate-slide-up">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 font-semibold">LIVE NOW</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                      darkMode ? "bg-gray-800/50 text-gray-300" : "bg-white/50 text-gray-600"
                    } backdrop-blur-sm`}
                  >
                    <Users size={16} />
                    <span className="font-medium">{currentStream.viewers} watching</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      liked
                        ? "bg-red-500/20 text-red-500 border border-red-500/30"
                        : darkMode
                          ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                          : "bg-white/50 text-gray-600 hover:bg-white/70"
                    } backdrop-blur-sm`}
                  >
                    <Heart
                      size={16}
                      className={`transition-all duration-300 ${liked ? "fill-current scale-110" : "group-hover:scale-110"}`}
                    />
                    <span className="font-medium">{likeCount}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stream Content */}
            <div
              className={`rounded-3xl overflow-hidden shadow-2xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl border border-white/20 animate-fade-in`}
            >
              {currentStream.type === "youtube" ? (
                <div className="aspect-video relative group">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentStream.link}?autoplay=0&mute=0`}
                    className="w-full h-full rounded-3xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentStream.title}
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-700/20 animate-pulse"></div>
                  <div className="relative text-center text-white p-8 z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm animate-pulse">
                      <ExternalLink size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Zoom Meeting</h3>
                    <p className="mb-2 text-lg">
                      Meeting ID: <span className="font-mono">{currentStream.meetingId}</span>
                    </p>
                    <p className="mb-8 text-lg">
                      Password: <span className="font-mono">{currentStream.password}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() =>
                          
                          window.open(`https://zoom.us/j/${currentStream.meetingId?.replace(/-/g, "")}`, "_blank")
                        }
                        className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Join Meeting
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(`Meeting ID: ${currentStream.meetingId}, Password: ${currentStream.password}`)
                        }
                        className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
                      >
                        <Copy size={18} />
                        <span>{copied ? "Copied!" : "Copy Details"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stream Info */}
            <div
              className={`rounded-3xl p-8 shadow-xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl border border-white/20 animate-slide-up`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {currentStream.title}
              </h2>
              <div className="flex items-center space-x-6 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-100/50"}`}>
                    <Calendar size={16} className="text-blue-500" />
                  </div>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {new Date(currentStream.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-100/50"}`}>
                    <Tag size={16} className="text-purple-500" />
                  </div>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>{currentStream.tags.join(", ")}</span>
                </div>
              </div>
              <p className={`mb-6 text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {currentStream.description}
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Share:</span>
                  <div className="flex space-x-3">
                    {[
                      { icon: Share2, color: "from-blue-500 to-blue-600", label: "Share" },
                      { icon: ExternalLink, color: "from-red-500 to-red-600", label: "External" },
                      { icon: Share2, color: "from-purple-500 to-purple-600", label: "Social" },
                    ].map((social, index) => (
                      <button
                        key={index}
                        className={`p-3 bg-gradient-to-r ${social.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-110`}
                        title={social.label}
                      >
                        <social.icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    liked
                      ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                      : darkMode
                        ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                        : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50"
                  } backdrop-blur-sm font-medium`}
                >
                  <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
                  <span>Like</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="space-y-6">
            <div
              className={`rounded-3xl shadow-xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/70"
              } backdrop-blur-xl border border-white/20 overflow-hidden animate-slide-up`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Live Chat</h3>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                      darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>

              {showChat && (
                <div className="p-6">
                  <div className="h-80 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    <ChatMessage name="Sarah M." message="Blessed by this message! 🙏" time="2m ago" />
                    <ChatMessage name="John D." message="Amen! Great teaching today." time="3m ago" />
                    <ChatMessage name="Mary K." message="Praying for everyone watching! ❤️" time="5m ago" />
                    <ChatMessage
                      name="David L."
                      message="This is exactly what I needed to hear today. Thank you!"
                      time="7m ago"
                    />
                    <ChatMessage
                      name="Grace W."
                      message="Powerful worship! Feeling the presence of God 🔥"
                      time="10m ago"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700"
                          : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm`}
                    />
                    <button
                      onClick={handleSendMessage}
                      className={`px-6 py-3 bg-gradient-to-r ${currentStream.gradient} text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center space-x-2`}
                    >
                      <Send size={18} />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TranslationOverlay
        isOpen={showTranslation}
        onClose={() => setShowTranslation(false)}
        darkMode={darkMode}
        streamGradient={currentStream.gradient}
      />
    </div>
  )
}