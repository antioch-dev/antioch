"use client"

import { DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import {
  Book,
  Search,
  Bookmark,
  HighlighterIcon as Highlight,
  Upload,
  ShoppingCart,
  MessageSquare,
  Users,
  Play,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
  ThumbsUp,
  ThumbsDown,
  QrCode,
  CheckCircle,
  Clock,
  FileText,
  PlusCircle,
  Share2,
  Eye,
  LinkIcon,
  Flame,
  Trophy,
  Target,
  Award,
  Zap,
  StickyNote,
  Mic,
  Camera,
  ImageIcon,
  Edit3,
  Trash2,
  MoreVertical,
  Volume2,
  Pause,
  Square,
  TrendingUp,
  ArrowLeft,
  Lightbulb,
  CheckSquare,
  MessageCircle,
  BookmarkIcon,
  Minus,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LiveSessionView } from "@/components/live-session-view"
import { SessionJoinModal } from "@/components/session-join-modal"
import { cn } from "@/lib/utils"


// Interfaces
interface StudyGuide {
  id: number
  title: string
  author: string
  price: number
  chapters: number
  rating: number
  purchased: boolean
  status: string | null
  type: string
}

interface Note {
  id: number
  title: string
  content: string
  lastEdited: string
  hasAudio: boolean
  hasImages: boolean
}

interface ForumPost {
  id: number
  title: string
  author: string
  replies: number
  votes: number
  time: string
}

interface LiveSession {
  id: number
  title: string
  leader: string
  participants: number
  status: "live" | "scheduled"
  time: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: LucideIcon
  unlocked: boolean
}

interface StudyGuideChapter {
  id: number
  title: string
  subtitle: string
  content: string
  questions: string[]
  keyVerses: string[]
  practicalApplications: string[]
}

type StudyGuideContent = Record<number, {
    title: string
    author: string
    description: string
    totalChapters: number
    chapters: Record<number, StudyGuideChapter>
  }>;

interface BuilderChapter {
  id: number
  title?: string
  content?: string
  questions?: string[]
  keyVerses?: string[]
  practicalApplications?:string[]
}

interface BuildingGuide {
  title: string
  author: string
  description: string
  tradition: string
  audience: string
}

interface SessionPage {
  type?: string
  chapter: number
  page: number
}

interface BibleReference {
  book: string
  chapter: number
  verse: number
}

interface SessionParticipant {
  id: number
  name: string
  avatar: string
  isLeader: boolean
  status: string
}

export default function BibleStudySystem() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bibleOpen, setBibleOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [activeSession, setActiveSession] = useState<LiveSession | null>(null)
  const [isSessionLeader, setIsSessionLeader] = useState(false)
  const [, setSessionParticipants] = useState<SessionParticipant[]>([])
  const [currentSessionPage, setCurrentSessionPage] = useState<SessionPage>({ type: "guide", chapter: 1, page: 1 })
  const [sessionBibleRef, setSessionBibleRef] = useState<BibleReference>({ book: "John", chapter: 3, verse: 16 })
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showStreakCalendar, setShowStreakCalendar] = useState(false)

  const [showWeeklyGoalModal, setShowWeeklyGoalModal] = useState(false)
  const [showLevelModal, setShowLevelModal] = useState(false)

  // Study Guide Viewer State
  const [activeStudyGuide, setActiveStudyGuide] = useState<StudyGuide | null>(null)
  const [studyGuideChapter, setStudyGuideChapter] = useState(1)
  const [, setStudyGuidePage] = useState(1)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [completedApplications, setCompletedApplications] = useState<Record<string, boolean>>({})

  // Study Guide Builder State
  const [buildingGuide, setBuildingGuide] = useState<BuildingGuide | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [builderChapters, setBuilderChapters] = useState<BuilderChapter[]>([])
  const [currentBuilderChapter, setCurrentBuilderChapter] = useState(0)

  // Notes state - UI only, no persistence
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "John 3:16 - God's Love",
      content:
        "For God so loved the world... This verse speaks about God's unconditional love for humanity. Key insights:\n\n• 'So loved' - demonstrates the depth of God's love\n• 'The world' - universal scope, not limited to a select few\n• 'Gave his one and only Son' - the ultimate sacrifice\n• 'Whoever believes' - salvation is available to all\n\nPersonal reflection: How does understanding God's love change my perspective on daily challenges?",
      lastEdited: "2 hours ago",
      hasAudio: true,
      hasImages: false,
    },
    {
      id: 2,
      title: "Prayer Requests & Testimonies",
      content:
        "Prayer Requests:\n• Healing for Sarah's mother\n• Wisdom for John's job decision\n• Peace for the Johnson family\n\nTestimonies:\n• Thanksgiving for answered prayer about housing\n• God's provision during financial difficulty\n• Healing testimony from last month\n\nScripture for prayer: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' - Philippians 4:6",
      lastEdited: "1 day ago",
      hasAudio: false,
      hasImages: true,
    },
    {
      id: 3,
      title: "Romans 8:28 Study Notes",
      content:
        "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.\n\nKey points from today's study:\n• 'All things' - includes both good and difficult circumstances\n• 'Works for good' - God actively orchestrates, not passive\n• 'Those who love him' - conditional on our relationship with God\n• 'Called according to his purpose' - part of God's greater plan\n\nApplication: Trust God's sovereignty even when circumstances seem difficult.",
      lastEdited: "3 days ago",
      hasAudio: true,
      hasImages: false,
    },
  ])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [newNoteTitle, setNewNoteTitle] = useState("")

  // Mock data - no backend required
  const studyGuides: StudyGuide[] = [
    {
      id: 1,
      title: "The Gospel of John",
      author: "Pastor Smith",
      price: 15.99,
      chapters: 21,
      rating: 4.8,
      purchased: true,
      status: "completed",
      type: "interactive",
    },
    {
      id: 2,
      title: "Romans Study Guide",
      author: "Dr. Johnson",
      price: 12.99,
      chapters: 16,
      rating: 4.9,
      purchased: false,
      status: null,
      type: "pdf",
    },
    {
      id: 3,
      title: "Psalms Devotional",
      author: "Sarah Wilson",
      price: 18.99,
      chapters: 150,
      rating: 4.7,
      purchased: true,
      status: "pending",
      type: "interactive",
    },
  ]

  // Mock study guide content
  const studyGuideContent: StudyGuideContent = {
    1: {
      title: "The Gospel of John",
      author: "Pastor Smith",
      description:
        "A comprehensive study through the Gospel of John, exploring the divine nature of Christ and His mission to bring eternal life to all who believe.",
      totalChapters: 21,
      chapters: {
        1: {
          id: 1,
          title: "In the Beginning Was the Word",
          subtitle: "John 1:1-18 - The Prologue",
          content: `# Chapter 1: In the Beginning Was the Word

## Scripture Focus: John 1:1-18

### Introduction
The Gospel of John opens with one of the most profound theological statements in all of Scripture. Unlike the other Gospels that begin with genealogies or birth narratives, John takes us back to the very beginning of time itself.

### Key Themes

#### 1. The Eternal Word (Logos)
"In the beginning was the Word, and the Word was with God, and the Word was God." (John 1:1)

The term "Word" (Greek: Logos) was familiar to both Jewish and Greek audiences:
- **Jewish Understanding**: God's creative and revelatory word
- **Greek Philosophy**: The rational principle governing the universe
- **John's Innovation**: The Word is a person - Jesus Christ

#### 2. The Light of the World
"In him was life, and that life was the light of all mankind. The light shines in the darkness, and the darkness has not overcome it." (John 1:4-5)

Light represents:
- Truth and revelation
- Spiritual illumination
- Hope in darkness
- God's presence among humanity

#### 3. The Incarnation
"The Word became flesh and made his dwelling among us." (John 1:14)

This is the central miracle of Christianity - God becoming human while remaining fully divine.

### Memory Verse
*"In the beginning was the Word, and the Word was with God, and the Word was God."* - John 1:1

### Prayer Focus
Lord Jesus, thank You for being the eternal Word who became flesh to dwell among us. Help us to walk in Your light and reflect Your truth to a world in darkness. May we never take for granted the miracle of the incarnation. Amen.`,
          questions: [
            "How does understanding Jesus as the eternal Word change your perspective on His teachings?",
            "What does it mean that 'the Word was with God, and the Word was God'?",
            "In what ways can we be 'children of light' in our daily lives?",
            "Why do you think John chose to begin his Gospel this way?",
          ],
          keyVerses: ["John 1:1", "John 1:14", "John 1:4-5"],
          practicalApplications: [
            "Begin each day remembering Christ as the Light",
            "Let the eternal Word guide your decisions",
            "Reflect Christ's light in relationships",
            "Study how Jesus fulfills Old Testament prophecies",
          ],
        },
        2: {
          id: 2,
          title: "The First Sign: Water into Wine",
          subtitle: "John 2:1-11 - Revealing His Glory",
          content: `# Chapter 2: The First Sign - Water into Wine

## Scripture Focus: John 2:1-11

### Introduction
Jesus' first miracle at the wedding in Cana reveals important truths about His identity, mission, and the nature of His kingdom. This "sign" points beyond the physical miracle to deeper spiritual realities.

### The Setting: A Wedding in Cana

#### Cultural Context
- Weddings in first-century Palestine were community celebrations lasting several days
- Running out of wine would bring shame to the host family
- Jesus' presence at the celebration shows His affirmation of marriage and joy

#### The Crisis
When the wine runs out, Mary brings the problem to Jesus, demonstrating her faith in His ability to help.

### The Miracle Analyzed

#### 1. The Timing
"My hour has not yet come" (John 2:4) - Jesus operates on divine timing, not human urgency.

#### 2. The Method
- Six stone water jars used for ceremonial washing
- Each jar held 20-30 gallons
- Total: 120-180 gallons of wine!

#### 3. The Quality
The master of the banquet declares this the best wine - Jesus doesn't just meet needs, He exceeds expectations.

### Theological Significance

#### Symbol of Transformation
- Water to wine represents the transformation Jesus brings
- Old covenant (ceremonial washing) to new covenant (celebration)
- Law to grace, ritual to relationship

#### Revelation of Glory
"What Jesus did here in Cana of Galilee was the first of the signs through which he revealed his glory" (John 2:11)

### Memory Verse
*"What Jesus did here in Cana of Galilee was the first of the signs through which he revealed his glory; and his disciples believed in him."* - John 2:11`,
          questions: [
            "What can we learn from Jesus attending a wedding celebration?",
            "How does the transformation of water into wine represent what Jesus does in our lives?",
            "How do we balance bringing our needs to Jesus while trusting His timing?",
            "What does the abundance and quality of the wine teach us about God's provision?",
          ],
          keyVerses: ["John 2:11", "John 2:4", "John 2:10"],
          practicalApplications: [
            "Invite Christ into your family gatherings",
            "Trust God to transform ordinary moments",
            "Look for signs of God's glory in everyday situations",
            "Expect God to work beyond your expectations",
          ],
        },
      },
    },
  }

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: "Understanding John 3:16 in context",
      author: "BibleStudent123",
      replies: 12,
      votes: 8,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "How to apply Romans 8:28 in daily life?",
      author: "FaithSeeker",
      replies: 7,
      votes: 15,
      time: "5 hours ago",
    },
  ]

  const liveSessions: LiveSession[] = [
    {
      id: 1,
      title: "Evening Study: Book of Acts",
      leader: "Pastor Mike",
      participants: 24,
      status: "live",
      time: "Started 30 min ago",
    },
    {
      id: 2,
      title: "Youth Bible Study",
      leader: "Sarah K.",
      participants: 12,
      status: "scheduled",
      time: "Starts in 2 hours",
    },
  ]

  // Mock achievements data
  const achievements: Achievement[] = [
    { id: 1, title: "First Steps", description: "Complete your first study", icon: Trophy, unlocked: true },
    { id: 2, title: "Consistent Reader", description: "7-day reading streak", icon: Flame, unlocked: true },
    { id: 3, title: "Scholar", description: "Complete 5 study guides", icon: Award, unlocked: false },
    { id: 4, title: "Community Helper", description: "Answer 10 forum questions", icon: Users, unlocked: false },
  ]

  // Simulate data loading (UI only)
  useEffect(() => {
    // Simulate loading delay for realistic UX
    const timer = setTimeout(() => {
      console.log("UI-only Bible Study System loaded")
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Mock function to simulate joining via link (no actual network call)
  const handleJoinViaLink = (sessionId: string, _userName: string) => {
    // Simulate processing delay
    setTimeout(() => {
      const mockSession: LiveSession = {
        id: parseInt(sessionId, 10),
        title: "Joined Session",
        leader: "Session Leader",
        participants: 15,
        status: "live",
        time: "Just started",
      }

      setActiveSession(mockSession)
      setIsSessionLeader(false)
      setActiveSection("session-view")
    }, 500)
  }

  // Study Guide Functions
  const handleContinueStudy = (guide: StudyGuide) => {
    setActiveStudyGuide(guide)
    setStudyGuideChapter(1)
    setStudyGuidePage(1)
    setActiveSection("study-guide-view")
  }

  const handleAnswerChange = (chapterId: number, questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [`${chapterId}-${questionIndex}`]: answer,
    }))
  }

  const handleApplicationToggle = (chapterId: number, appIndex: number) => {
    const key = `${chapterId}-${appIndex}`
    setCompletedApplications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Builder Functions
  const initializeBuilder = () => {
    setBuildingGuide({
      title: "",
      author: "",
      description: "",
      tradition: "",
      audience: "",
    })
    setBuilderChapters([
      {
        id: 1,
        title: "",
        content: "",
        questions: [""],
        keyVerses: [""],
        practicalApplications: [""],
      },
    ])
    setCurrentBuilderChapter(0)
    setPreviewMode(false)
    setActiveSection("study-guide-builder")
  }

  const addBuilderChapter = () => {
    const newChapter: BuilderChapter = {
      id: builderChapters.length + 1,
      title: "",
      content: "",
      questions: [""],
      keyVerses: [""],
      practicalApplications: [""],
    }
    setBuilderChapters([...builderChapters, newChapter])
  }

  const updateBuilderChapter = (
  chapterIndex: number, 
  field: keyof BuilderChapter, 
  value: string
) => {
  const updatedChapters = [...builderChapters]
  const currentChapter = updatedChapters[chapterIndex]

  if (!currentChapter) return // prevent crash

  if (field === 'title' || field === 'content') {
    const updatedChapter: BuilderChapter = {
      ...currentChapter,
      [field]: value ?? "", // ensure it's never undefined
    }
    updatedChapters[chapterIndex] = updatedChapter
    setBuilderChapters(updatedChapters)
  }
}


const addArrayItem = (
  chapterIndex: number,
  field: 'questions' | 'keyVerses' | 'practicalApplications'
) => {
  const updatedChapters = [...builderChapters]
  const currentChapter = updatedChapters[chapterIndex]

  if (!currentChapter) return // Guard for invalid index

  const newArray = [...(currentChapter[field] ?? []), ""]

  const updatedChapter: BuilderChapter = {
    ...currentChapter,
    [field]: newArray,
  }

  updatedChapters[chapterIndex] = updatedChapter
  setBuilderChapters(updatedChapters)
}

const updateArrayItem = (
  chapterIndex: number,
  field: 'questions' | 'keyVerses' | 'practicalApplications',
  itemIndex: number,
  value: string
) => {
  const updatedChapters = [...builderChapters]
  const currentChapter = updatedChapters[chapterIndex]

  if (!currentChapter) return // Guard

  const newArray = [...(currentChapter[field] ?? [])]
  if (itemIndex < 0 || itemIndex >= newArray.length) return // Guard invalid index

  newArray[itemIndex] = value

  const updatedChapter: BuilderChapter = {
    ...currentChapter,
    [field]: newArray,
  }

  updatedChapters[chapterIndex] = updatedChapter
  setBuilderChapters(updatedChapters)
}

const removeArrayItem = (
  chapterIndex: number,
  field: 'questions' | 'keyVerses' | 'practicalApplications',
  itemIndex: number
) => {
  const updatedChapters = [...builderChapters]
  const currentChapter = updatedChapters[chapterIndex]

  if (!currentChapter) return // Guard

  const newArray = [...(currentChapter[field] ?? [])]
  if (itemIndex < 0 || itemIndex >= newArray.length) return // Guard invalid index

  newArray.splice(itemIndex, 1)

  const updatedChapter: BuilderChapter = {
    ...currentChapter,
    [field]: newArray,
  }

  updatedChapters[chapterIndex] = updatedChapter
  setBuilderChapters(updatedChapters)
}
  // Notes functions - all UI state management
  const createNewNote = () => {
    if (!newNoteTitle.trim()) return

    const newNote: Note = {
      id: Date.now(), // Simple ID generation for UI demo
      title: newNoteTitle,
      content: "",
      lastEdited: "Just now",
      hasAudio: false,
      hasImages: false,
    }

    setNotes([newNote, ...notes])
    setActiveNote(newNote)
    setNewNoteTitle("")
  }

  const updateNote = (noteId: number, updates: Partial<Note>) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, ...updates, lastEdited: "Just now" } : note)))
  }

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId))
    if (activeNote?.id === noteId) {
      setActiveNote(null)
    }
  }

 

  const NavigationSidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold">Bible Study</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        <Button
          variant={activeSection === "dashboard" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "dashboard" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("dashboard")}
        >
          <Book className="mr-2 h-4 w-4" />
          Dashboard
        </Button>

        <Button
          variant={activeSection === "bible" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "bible" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("bible")}
        >
          <Book className="mr-2 h-4 w-4" />
          Digital Bible
        </Button>

        <Button
          variant={activeSection === "notes" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "notes" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("notes")}
        >
          <StickyNote className="mr-2 h-4 w-4" />
          My Notes
        </Button>

        <Button
          variant={activeSection === "guides" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "guides" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("guides")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Study Guides
        </Button>

        <Button
          variant={activeSection === "marketplace" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "marketplace" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("marketplace")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Marketplace
        </Button>

        <Button
          variant={activeSection === "upload" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "upload" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("upload")}
        >
          <Upload className="mr-2 h-4 w-4" />
          Submit Guide
        </Button>

        <Button
          variant={activeSection === "forum" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "forum" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("forum")}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Q&A Forum
        </Button>

        <Button
          variant={activeSection === "live" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-white hover:bg-slate-800 hover:text-white",
            activeSection === "live" && "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900",
          )}
          onClick={() => setActiveSection("live")}
        >
          <Users className="mr-2 h-4 w-4" />
          Live Sessions
        </Button>
      </nav>
    </div>
  )

  const BibleSidebar = () => (
    <div
      className={`fixed inset-y-0 right-0 z-40 w-80 bg-white border-l shadow-lg transform transition-transform duration-300 ease-in-out ${bibleOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Digital Bible</h3>
        <Button variant="ghost" size="sm" onClick={() => setBibleOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search verses, chapters, or keywords..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Book" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">Genesis</SelectItem>
              <SelectItem value="exodus">Exodus</SelectItem>
              <SelectItem value="matthew">Matthew</SelectItem>
              <SelectItem value="john">John</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Ch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Static Bible content for demo */}
        <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="text-sm font-medium text-gray-600">John 3:16</p>
              <p className="text-sm">
                For God so loved the world that he gave his one and only Son, that whoever believes in him shall not
                perish but have eternal life.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-3">
              <p className="text-sm font-medium text-gray-600">John 3:17</p>
              <p className="text-sm">
                For God did not send his Son into the world to condemn the world, but to save the world through him.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Highlight className="mr-1 h-3 w-3" />
            Highlight
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Bookmark className="mr-1 h-3 w-3" />
            Bookmark
          </Button>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button size="sm" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">John 3</span>
          <Button size="sm" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const DashboardContent = () => {
    // Generate mock streak data for calendar
    const generateStreakDays = () => {
      const today = new Date()
      const streakDays = []
      for (let i = 14; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        streakDays.push(date.getDate())
      }
      return streakDays
    }

    const streakDays = generateStreakDays()
    const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back! 👋</h1>
            <p className="text-gray-600 mt-1">Continue your spiritual journey</p>
          </div>
          <Button onClick={() => setBibleOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Book className="mr-2 h-4 w-4" />
            Open Bible
          </Button>
        </div>

        {/* Streak and Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Reading Streak - Clickable */}
          <Card
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setShowStreakCalendar(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Reading Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Flame className="h-8 w-8 text-yellow-300" />
                <div>
                  <div className="text-3xl font-bold">15</div>
                  <p className="text-sm opacity-90">days in a row</p>
                </div>
              </div>
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <div className="bg-yellow-300 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-xs mt-2 opacity-75">{`5 more days to unlock "Faithful Reader" 🏆`}</p>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card
            className="bg-gradient-to-br from-green-500 to-emerald-500 text-white cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setShowWeeklyGoalModal(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Weekly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-green-200" />
                <div>
                  <div className="text-3xl font-bold">5/7</div>
                  <p className="text-sm opacity-90">study sessions</p>
                </div>
              </div>
              <Progress value={71} className="mt-4 bg-white/20" />
              <p className="text-xs mt-2 opacity-75">2 more to reach your goal! 💪</p>
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card
            className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setShowLevelModal(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Level 3 Scholar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Zap className="h-8 w-8 text-purple-200" />
                <div>
                  <div className="text-3xl font-bold">1,250</div>
                  <p className="text-sm opacity-90">XP earned</p>
                </div>
              </div>
              <Progress value={62} className="mt-4 bg-white/20" />
              <p className="text-xs mt-2 opacity-75">750 XP to Level 4</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Study Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="mr-1 h-3 w-3" />3 completed this month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Live Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">5</div>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>2 active now
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Forum Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">28</div>
              <p className="text-xs text-blue-600 mt-1">8 this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <StickyNote className="mr-2 h-4 w-4" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{notes.length}</div>
              <p className="text-xs text-purple-600 mt-1">Personal study notes</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${achievement.unlocked ? "bg-yellow-100" : "bg-gray-100"}`}>
                      <achievement.icon
                        className={`h-6 w-6 ${achievement.unlocked ? "text-yellow-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Study Guides</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActiveSection("guides")}>
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyGuides.slice(0, 3).map((guide) => (
                <div
                  key={guide.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setActiveSection("guides")}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{guide.title}</p>
                    <p className="text-xs text-gray-600">
                      {guide.author} • {guide.chapters} chapters
                    </p>
                  </div>
                  <Badge variant={guide.purchased ? "default" : "secondary"}>
                    {guide.purchased ? "Owned" : "Available"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Live Sessions</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActiveSection("live")}>
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {liveSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setActiveSection("live")}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      session.status === "live" ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    <Users className={`h-5 w-5 ${session.status === "live" ? "text-green-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{session.title}</p>
                    <p className="text-xs text-gray-600">
                      {session.leader} • {session.participants} participants
                    </p>
                  </div>
                  <Badge variant={session.status === "live" ? "default" : "secondary"}>
                    {session.status === "live" ? "Live" : "Scheduled"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Calendar Modal for Reading Streak */}
        <Dialog open={showStreakCalendar} onOpenChange={setShowStreakCalendar}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Flame className="mr-2 h-5 w-5 text-orange-500" />
                Reading Streak Calendar
              </DialogTitle>
              <DialogDescription>Your 15-day reading streak • {currentMonth}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-xs font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}

                {/* Generate calendar days for current month */}
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1
                  const isStreakDay = streakDays.includes(day)
                  const isToday = day === new Date().getDate()

                  return (
                    <div
                      key={day}
                      className={`p-2 text-sm rounded-full relative ${
                        isToday
                          ? "bg-blue-500 text-white font-bold"
                          : isStreakDay
                            ? "bg-orange-100 text-orange-700 font-medium"
                            : "text-gray-400"
                      }`}
                    >
                      {day}
                      {isStreakDay && !isToday && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Streak days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Today</span>
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Keep it up!</strong>{` You're 5 days away from unlocking the "Faithful Reader" achievement.`}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Weekly Goal Modal */}
        <Dialog open={showWeeklyGoalModal} onOpenChange={setShowWeeklyGoalModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-green-500" />
                Weekly Study Goal
              </DialogTitle>
              <DialogDescription>Track your weekly study progress</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5/7</div>
                <p className="text-gray-600">Study sessions completed this week</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>71%</span>
                </div>
                <Progress value={71} className="h-3" />
                <p className="text-sm text-gray-600">2 more sessions to reach your goal!</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">{`This Week's Sessions`}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - John Study</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tuesday - Prayer Time</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wednesday - Romans Guide</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thursday - Live Session</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Psalms Reading</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Saturday - Planned</span>
                    <span>○</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sunday - Planned</span>
                    <span>○</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">{7 - new Date().getDay()} days remaining this week</p>
                <Button onClick={() => setShowWeeklyGoalModal(false)} className="w-full">
                  Continue Studying
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Level Progress Modal */}
        <Dialog open={showLevelModal} onOpenChange={setShowLevelModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-purple-500" />
                Level 3 Scholar
              </DialogTitle>
              <DialogDescription>Your learning progress and achievements</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-1">1,250</div>
                <p className="text-gray-600 mb-3">Total XP earned</p>
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                  <Zap className="h-10 w-10 text-purple-600" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level 4</span>
                  <span>750 XP needed</span>
                </div>
                <Progress value={62} className="h-3" />
                <p className="text-sm text-gray-600">62% complete</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-3">Recent XP Activities</h4>
                <div className="space-y-2 text-sm max-h-24 overflow-y-auto">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Completed Romans Study Guide</span>
                    </div>
                    <span className="text-green-600 font-medium">+200 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Attended Live Bible Study</span>
                    </div>
                    <span className="text-blue-600 font-medium">+150 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>15-day Reading Streak</span>
                    </div>
                    <span className="text-orange-600 font-medium">+100 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Helped in Q&A Forum</span>
                    </div>
                    <span className="text-purple-600 font-medium">+75 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Created Study Note</span>
                    </div>
                    <span className="text-yellow-600 font-medium">+50 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Completed Daily Devotion</span>
                    </div>
                    <span className="text-indigo-600 font-medium">+25 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Shared Bible Verse</span>
                    </div>
                    <span className="text-pink-600 font-medium">+30 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Memorized Scripture</span>
                    </div>
                    <span className="text-teal-600 font-medium">+80 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Prayer Request Answered</span>
                    </div>
                    <span className="text-red-600 font-medium">+40 XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Joined Prayer Group</span>
                    </div>
                    <span className="text-emerald-600 font-medium">+60 XP</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Next Level Rewards</h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>Level 4 Scholar Badge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Exclusive Study Materials</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>Priority Forum Support</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={() => setShowLevelModal(false)} className="w-full">
                  Keep Learning
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const NotesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>Give your note a descriptive title</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Note title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setNewNoteTitle("")}>
                  Cancel
                </Button>
                <Button onClick={createNewNote}>Create Note</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Notes List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">All Notes ({notes.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                    activeNote?.id === note.id ? "bg-blue-50 border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setActiveNote(note)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm truncate">{note.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{note.content || "No content yet..."}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">{note.lastEdited}</span>
                        {note.hasAudio && <Mic className="h-3 w-3 text-blue-500" />}
                        {note.hasImages && <ImageIcon className="h-3 w-3 text-green-500" />}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setActiveNote(note)}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteNote(note.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Note Editor */}
        <Card className="lg:col-span-2">
          {activeNote ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <Input
                    value={activeNote.title}
                    onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                    className="text-lg font-semibold border-none p-0 focus-visible:ring-0"
                  />
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {activeNote.lastEdited}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4 h-full">
                  {/* Toolbar */}
                  <div className="flex items-center space-x-2 py-2 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className={isRecording ? "bg-red-50 text-red-600" : ""}
                    >
                      {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      {isRecording ? "Stop" : "Record"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Screenshot
                    </Button>
                    <Button variant="outline" size="sm">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                  </div>

                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-600">Recording audio... (UI Demo)</span>
                      <Button size="sm" variant="ghost" onClick={() => setIsRecording(false)}>
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Audio Recordings */}
                  {activeNote.hasAudio && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Audio Recordings</h4>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Button size="sm" variant="outline">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <div className="flex-1 bg-blue-200 h-2 rounded-full">
                            <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                          </div>
                          <span className="text-xs text-gray-600">0:45 / 2:30</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {activeNote.hasImages && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Attached Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Bible verse screenshot</p>
                          </div>
                        </div>
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Study notes photo</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text Editor */}
                  <Textarea
                    placeholder="Start writing your notes here..."
                    value={activeNote.content}
                    onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                    className="min-h-64 resize-none border-none focus-visible:ring-0"
                  />
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Select a note to edit</h3>
                <p className="text-sm text-gray-500">Choose a note from the list or create a new one</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )

  const BibleContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Digital Bible</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmarks
          </Button>
          <Button variant="outline">
            <Highlight className="mr-2 h-4 w-4" />
            Highlights
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Book" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genesis">Genesis</SelectItem>
                <SelectItem value="exodus">Exodus</SelectItem>
                <SelectItem value="matthew">Matthew</SelectItem>
                <SelectItem value="john">John</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Ch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search verses or keywords..." className="pl-10" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Static Bible content for demo */}
          <div className="bg-gray-50 p-6 rounded-lg min-h-96 bible-text">
            <h2 className="text-xl font-bold mb-4 text-slate-900">John Chapter 3</h2>
            <div className="space-y-4 text-sm leading-relaxed text-slate-800">
              <p>
                <span className="font-bold text-slate-600">1</span> Now there was a Pharisee, a man named Nicodemus who
                was a member of the Jewish ruling council.
              </p>
              <p>
                <span className="font-bold text-slate-600">2</span>{` He came to Jesus at night and said, "Rabbi, we know
                that you are a teacher who has come from God. For no one could perform the signs you are doing if God
                were not with him.`}
              </p>
              <p className="bg-yellow-100 p-2 rounded border-l-4 border-yellow-500">
                <span className="font-bold text-slate-600">16</span> For God so loved the world that he gave his one and
                only Son, that whoever believes in him shall not perish but have eternal life.
              </p>
              <p>
                <span className="font-bold text-slate-600">17</span> For God did not send his Son into the world to
                condemn the world, but to save the world through him.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Chapter
            </Button>
            <span className="text-sm text-gray-600">John 3:1-36</span>
            <Button variant="outline">
              Next Chapter
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const StudyGuidesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Study Guides</h1>
        <Button onClick={() => setActiveSection("marketplace")}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Browse More
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGuides
          .filter((guide) => guide.purchased)
          .map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.author}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant={guide.status === "completed" ? "default" : "secondary"}>{guide.status}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {guide.type === "interactive" ? "Interactive" : "PDF"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{guide.chapters} chapters</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{guide.rating}</span>
                    </div>
                  </div>

                  <Progress value={guide.status === "completed" ? 100 : 45} className="h-2" />

                  <div className="flex space-x-2">
                    <Button className="flex-1" onClick={() => handleContinueStudy(guide)}>
                      <Play className="mr-2 h-4 w-4" />
                      Continue
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleContinueStudy(guide)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )

  const StudyGuideViewerContent = () => {
    const guide = activeStudyGuide ? studyGuideContent[activeStudyGuide.id] : null
    const chapter = guide?.chapters[studyGuideChapter]

    if (!guide || !chapter) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">Study guide not found</h3>
            <Button onClick={() => setActiveSection("guides")} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Study Guides
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveSection("guides")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guides
              </Button>
              <div>
                <h1 className="text-xl font-bold">{guide.title}</h1>
                <p className="text-sm text-gray-600">by {guide.author}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                Chapter {studyGuideChapter} of {guide.totalChapters}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setBibleOpen(true)}>
                <Book className="h-4 w-4 mr-2" />
                Bible
              </Button>
            </div>
          </div>
          <Progress value={(studyGuideChapter / guide.totalChapters) * 100} className="mt-4 h-2" />
        </div>

        <div className="flex gap-6 p-6">
          {/* Sidebar */}
          <div className="w-80 space-y-4">
            {/* Study Tools */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Study Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <StickyNote className="h-4 w-4 mr-2" />
                  Take Notes
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Highlight className="h-4 w-4 mr-2" />
                  Highlight Text
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <BookmarkIcon className="h-4 w-4 mr-2" />
                  Bookmark Page
                </Button>
              </CardContent>
            </Card>

            {/* Key Verses */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Key Verses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {chapter.keyVerses.map((verse, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 text-xs"
                    onClick={() => console.log("Open verse:", verse)}
                  >
                    {verse}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Practical Applications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Practical Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {chapter.practicalApplications.map((app, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                      onClick={() => handleApplicationToggle(studyGuideChapter, index)}
                    >
                      <CheckSquare
                        className={`h-4 w-4 ${
                          completedApplications[`${studyGuideChapter}-${index}`] ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </Button>
                    <p className="text-xs text-gray-700 leading-relaxed">{app}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStudyGuideChapter(Math.max(1, studyGuideChapter - 1))}
                    disabled={studyGuideChapter <= 1}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStudyGuideChapter(Math.min(guide.totalChapters, studyGuideChapter + 1))}
                    disabled={studyGuideChapter >= guide.totalChapters}
                    className="flex-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Select
                  value={studyGuideChapter.toString()}
                  onValueChange={(value) => setStudyGuideChapter(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: guide.totalChapters }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Chapter {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader className="border-b">
                <div>
                  <CardTitle className="text-2xl">{chapter.title}</CardTitle>
                  <CardDescription className="text-base mt-1">{chapter.subtitle}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Content */}
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-800 leading-relaxed text-base">{chapter.content}</div>
                  </div>

                  {/* Discussion Questions */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-blue-900 flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Discussion Questions
                    </h3>
                    <div className="space-y-4">
                      {chapter.questions.map((question, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-medium text-blue-800 flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <p className="text-blue-800 font-medium">{question}</p>
                          </div>
                          <Textarea
                            placeholder="Write your thoughts here..."
                            value={userAnswers[`${studyGuideChapter}-${index}`] || ""}
                            onChange={(e) => handleAnswerChange(studyGuideChapter, index, e.target.value)}
                            className="ml-9 bg-white border-blue-200 focus:border-blue-400"
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex justify-between items-center pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setStudyGuideChapter(Math.max(1, studyGuideChapter - 1))}
                      disabled={studyGuideChapter <= 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous Chapter
                    </Button>
                    <span className="text-sm text-gray-600">
                      Chapter {studyGuideChapter} of {guide.totalChapters}
                    </span>
                    <Button
                      onClick={() => setStudyGuideChapter(Math.min(guide.totalChapters, studyGuideChapter + 1))}
                      disabled={studyGuideChapter >= guide.totalChapters}
                    >
                      Next Chapter
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const StudyGuideBuilderContent = () => {
    const currentChapter = builderChapters[currentBuilderChapter]

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveSection("upload")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Submit
              </Button>
              <div>
                <h1 className="text-xl font-bold">Study Guide Builder</h1>
                <p className="text-sm text-gray-600">Create your interactive study guide</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className={previewMode ? "bg-blue-50 border-blue-200" : ""}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Edit Mode" : "Preview"}
              </Button>
              <Button onClick={() => console.log("Save guide (UI demo)")}>Save Guide</Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 p-6">
          {/* Sidebar */}
          <div className="w-80 space-y-4">
            {/* Guide Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Guide Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Title</label>
                  <Input
                    value={buildingGuide?.title || ""}
                    onChange={(e) => setBuildingGuide(buildingGuide ? { ...buildingGuide, title: e.target.value } : null)}
                    placeholder="Study guide title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Author</label>
                  <Input
                    value={buildingGuide?.author || ""}
                    onChange={(e) => setBuildingGuide(buildingGuide ? { ...buildingGuide, author: e.target.value } : null)}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Description</label>
                  <Textarea
                    value={buildingGuide?.description || ""}
                    onChange={(e) => setBuildingGuide(buildingGuide ? { ...buildingGuide, description: e.target.value } : null)}
                    placeholder="Brief description"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Chapters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  Chapters ({builderChapters.length})
                  <Button size="sm" variant="outline" onClick={addBuilderChapter}>
                    <PlusCircle className="h-3 w-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {builderChapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                      currentBuilderChapter === index ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentBuilderChapter(index)}
                  >
                    <div className="font-medium">
                      Chapter {index + 1}
                      {chapter.title && `: ${chapter.title.substring(0, 20)}${chapter.title.length > 20 ? "..." : ""}`}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {previewMode ? (
              /* Preview Mode */
              <Card>
                <CardHeader className="border-b">
                  <div>
                    <CardTitle className="text-2xl">{currentChapter?.title || "Chapter Title"}</CardTitle>
                    <CardDescription className="text-base mt-1">Preview Mode</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="max-w-4xl mx-auto space-y-8">
                    {/* Content Preview */}
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-line text-gray-800 leading-relaxed text-base">
                        {currentChapter?.content || "Chapter content will appear here..."}
                      </div>
                    </div>

                    {/* Questions Preview */}
                    {currentChapter?.questions?.filter((q) => q.trim()).length ? (
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4 text-blue-900 flex items-center">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Discussion Questions
                        </h3>
                        <div className="space-y-4">
                          {currentChapter.questions
                            .filter((q) => q.trim())
                            .map((question, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-medium text-blue-800 flex-shrink-0 mt-1">
                                  {index + 1}
                                </div>
                                <p className="text-blue-800 font-medium">{question}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Key Verses Preview */}
                  {currentChapter?.keyVerses?.filter((v) => v.trim()).length ? (
  <div className="bg-green-50 p-6 rounded-lg">
    <h3 className="font-semibold mb-4 text-green-900">Key Verses</h3>
    <div className="flex flex-wrap gap-2">
      {currentChapter?.keyVerses
        ?.filter((v) => v.trim())
        .map((verse, index) => (
          <Badge key={index} variant="secondary" className="bg-green-200 text-green-800">
            {verse}
          </Badge>
        ))}
    </div>
  </div>
) : null}
                    

                   {/* Applications Preview */}
{currentChapter?.practicalApplications?.filter((a) => a.trim()).length ? (
  <div className="bg-purple-50 p-6 rounded-lg">
    <h3 className="font-semibold mb-4 text-purple-900">Practical Applications</h3>
    <div className="space-y-2">
      {currentChapter?.practicalApplications
        ?.filter((a) => a.trim())
        .map((app, index) => (
          <div key={index} className="flex items-start space-x-2">
            <CheckSquare className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
            <p className="text-purple-800">{app}</p>
          </div>
        ))}
    </div>
  </div>
) : null}
                  </div>
              </CardContent>
              </Card>
            ): (
              /* Edit Mode */
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Chapter {currentBuilderChapter + 1} - Edit Mode</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Chapter Title */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Chapter Title</label>
                      <Input
                        value={currentChapter?.title || ""}
                        onChange={(e) => updateBuilderChapter(currentBuilderChapter, "title", e.target.value)}
                        placeholder="Enter chapter title"
                        className="mt-1"
                      />
                    </div>

                    {/* Chapter Content */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Chapter Content</label>
                      <Textarea
                        value={currentChapter?.content || ""}
                        onChange={(e) => updateBuilderChapter(currentBuilderChapter, "content", e.target.value)}
                        placeholder="Write your chapter content here. You can use markdown formatting like **bold** and *italic*."
                        className="mt-1 min-h-64"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tip: Use # for headings, ** for bold, * for italic, and - for bullet points
                      </p>
                    </div>

                    {/* Discussion Questions */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Discussion Questions</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addArrayItem(currentBuilderChapter, "questions")}
                        >
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add Question
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {currentChapter?.questions?.map((question, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              value={question}
                              onChange={(e) =>
                                updateArrayItem(currentBuilderChapter, "questions", index, e.target.value)
                              }
                              placeholder={`Question ${index + 1}`}
                              className="flex-1"
                            />
                          <Button
                             size="sm"
                             variant="outline"
                             onClick={() => removeArrayItem(currentBuilderChapter, "questions", index)}
                             disabled={(currentChapter.questions?.length ?? 0) <= 1}
                               >
                               Remove
                              <Minus className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Verses */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Key Verses</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addArrayItem(currentBuilderChapter, "keyVerses")}
                        >
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add Verse
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {currentChapter?.keyVerses?.map((verse, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              value={verse}
                              onChange={(e) =>
                                updateArrayItem(currentBuilderChapter, "keyVerses", index, e.target.value)
                              }
                              placeholder="e.g., John 3:16"
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeArrayItem(currentBuilderChapter, "keyVerses", index)}
                              disabled={(currentChapter.keyVerses?.length ?? 0) <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Practical Applications */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Practical Applications</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addArrayItem(currentBuilderChapter, "practicalApplications")}
                        >
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add Application
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {currentChapter?.practicalApplications?.map((app, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              value={app}
                              onChange={(e) =>
                                updateArrayItem(currentBuilderChapter, "practicalApplications", index, e.target.value)
                              }
                              placeholder={`Application ${index + 1}`}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeArrayItem(currentBuilderChapter, "practicalApplications", index)}
                              disabled={(currentChapter.practicalApplications?.length ?? 0) <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  const MarketplaceContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Study Guide Marketplace</h1>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="gospels">Gospels</SelectItem>
              <SelectItem value="epistles">Epistles</SelectItem>
              <SelectItem value="prophets">Prophets</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGuides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.author}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${guide.price}</div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{guide.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{guide.chapters} chapters</span>
                  <Badge variant="outline" className="text-xs">
                    {guide.type === "interactive" ? "Interactive" : "PDF"}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600">{guide.chapters} chapters of comprehensive study material</p>

                {guide.purchased ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Purchased</span>
                    <Badge variant={guide.status === "completed" ? "default" : "secondary"}>{guide.status}</Badge>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => console.log("Mock purchase:", guide.title)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Purchase with QR Code
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Status</CardTitle>
          <CardDescription>Track your recent purchases (UI Demo)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Psalms Devotional</p>
                  <p className="text-sm text-gray-600">Payment verification pending</p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">The Gospel of John</p>
                  <p className="text-sm text-gray-600">Payment verified and access granted</p>
                </div>
              </div>
              <Badge>Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const UploadContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Submit Study Guide</h1>
        <Button onClick={initializeBuilder}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Interactive Builder
        </Button>
      </div>

      {/* Add publisher verification notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <CheckCircle className="mr-2 h-5 w-5" />
            Publisher Verification Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">
            To maintain quality and theological accuracy, all study guide submissions are reviewed by our content team
            before publication. New contributors must complete the publisher verification process.
          </p>
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => console.log("Publisher application (UI demo)")}
            >
              Apply for Publisher Status
            </Button>
            <Button variant="outline" className="bg-white" onClick={() => console.log("Learn more (UI demo)")}>
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content Submission</TabsTrigger>
          <TabsTrigger value="pdf">PDF Submission</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Study Guide Content</CardTitle>
              <CardDescription>Build your study guide chapter by chapter for review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Guide Title</label>
                  <Input placeholder="Enter study guide title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Author/Ministry Name</label>
                  <Input placeholder="Your name or ministry" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Theological Tradition</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tradition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="evangelical">Evangelical</SelectItem>
                      <SelectItem value="reformed">Reformed</SelectItem>
                      <SelectItem value="catholic">Catholic</SelectItem>
                      <SelectItem value="orthodox">Orthodox</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Target Audience</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginners">New Believers</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="youth">Youth</SelectItem>
                      <SelectItem value="all">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Brief description of the study guide" />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h3 className="font-medium mb-4">Chapter 1</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Chapter Title</label>
                    <Input placeholder="Enter chapter title" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea placeholder="Chapter content and teaching material" className="min-h-32" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Discussion Questions</label>
                    <Textarea placeholder="Add questions for discussion" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Scripture References</label>
                    <Input placeholder="e.g., John 3:16, Romans 8:28" />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => console.log("Add chapter (UI demo)")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Chapter
                </Button>
                <Button onClick={initializeBuilder}>
                  <Eye className="mr-2 h-4 w-4" />
                  Use Interactive Builder
                </Button>
                <Button onClick={() => console.log("Submit for review (UI demo)")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit for Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pdf" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit PDF Study Guide</CardTitle>
              <CardDescription>Upload a complete PDF study guide for review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Guide Title</label>
                  <Input placeholder="Enter study guide title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Suggested Price ($)</label>
                  <Input placeholder="0.00" type="number" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Author/Ministry</label>
                  <Input placeholder="Your name or ministry" />
                </div>
                <div>
                  <label className="text-sm font-medium">Copyright Information</label>
                  <Input placeholder="e.g., © 2025 Your Ministry" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Brief description of the study guide" />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drop your PDF here</p>
                <p className="text-sm text-gray-600">or click to browse files (UI Demo)</p>
                <Button className="mt-4" onClick={() => console.log("Choose file (UI demo)")}>
                  Choose File
                </Button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Review Process</p>
                    <p className="text-sm text-yellow-700">
                     {` Submissions typically take 5-7 business days to review. You'll receive an email notification when
                      your guide is approved or if additional information is needed.`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => console.log("Submit for review (UI demo)")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit for Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add submission status card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Submissions</CardTitle>
          <CardDescription>Track the status of your submitted guides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Understanding Revelation</p>
                  <p className="text-sm text-gray-600">Submitted 2 days ago</p>
                </div>
              </div>
              <Badge variant="secondary">Under Review</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <X className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Prayer Fundamentals</p>
                  <p className="text-sm text-gray-600">Additional information requested</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                View Feedback
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Psalms for Daily Life</p>
                  <p className="text-sm text-gray-600">Approved and published</p>
                </div>
              </div>
              <Badge>Published</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ForumContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Q&A Forum</h1>
        <Button onClick={() => console.log("Ask question (UI demo)")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ask Question
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {forumPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Button variant="ghost" size="sm" onClick={() => console.log("Upvote (UI demo)")}>
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{post.votes}</span>
                    <Button variant="ghost" size="sm" onClick={() => console.log("Downvote (UI demo)")}>
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>by {post.author}</span>
                      <span>{post.time}</span>
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">
                  Prayer
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Faith
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Salvation
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Discipleship
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Pastor Smith</p>
                    <p className="text-xs text-gray-600">142 answers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Wilson</p>
                    <p className="text-xs text-gray-600">98 answers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const LiveSessionsContent = () => {
    const [, setParticipantMode] = useState(false)
    const [showScheduledSessionInfo, setShowScheduledSessionInfo] = useState(false)
    const [selectedScheduledSession, setSelectedScheduledSession] = useState<LiveSession | null>(null)

    // Mock function to handle joining a session (UI only)
    const handleJoinSession = (session: LiveSession, asLeader = false) => {
      if (session.status === "live") {
        setActiveSession(session)
        setIsSessionLeader(asLeader)
        setParticipantMode(!asLeader) // Set participantMode to true when joining as participant
        setSessionParticipants([
          { id: 1, name: "John Smith", avatar: "JS", isLeader: asLeader, status: "active" },
          { id: 2, name: "Mary Johnson", avatar: "MJ", isLeader: false, status: "active" },
          { id: 3, name: "David Wilson", avatar: "DW", isLeader: false, status: "following" },
        ])
        setActiveSection("session-view")
      }
    }

    // Handle scheduled session click
    const handleScheduledSessionClick = (session: LiveSession) => {
      setSelectedScheduledSession(session)
      setShowScheduledSessionInfo(true)
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Live Bible Study Sessions</h1>
          <Button onClick={() => console.log("Create session (UI demo)")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                Live Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {liveSessions
                .filter((session) => session.status === "live")
                .map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{session.title}</h3>
                      <Badge className="bg-red-500">Live</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Led by {session.leader}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{session.participants} participants</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleJoinSession(session, false)}>
                          <Play className="mr-1 h-3 w-3" />
                          Join
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => console.log("Share session (UI demo)")}>
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {liveSessions
                .filter((session) => session.status === "scheduled")
                .map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleScheduledSessionClick(session)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{session.title}</h3>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Led by {session.leader}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("Remind me (UI demo)")
                          }}
                        >
                          <Bookmark className="mr-1 h-3 w-3" />
                          Remind Me
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("Share session (UI demo)")
                          }}
                        >
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        <Button onClick={() => setShowJoinModal(true)} variant="outline">
          <LinkIcon className="mr-2 h-4 w-4" />
          Join via Link
        </Button>

        {/* Scheduled Session Info Dialog */}
        <Dialog open={showScheduledSessionInfo} onOpenChange={setShowScheduledSessionInfo}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                Scheduled Session Details
              </DialogTitle>
            </DialogHeader>

            {selectedScheduledSession && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-blue-900 mb-2">{selectedScheduledSession.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Leader:</span>
                      <span>{selectedScheduledSession.leader}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Time:</span>
                      <span>{selectedScheduledSession.time}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Expected Participants:</span>
                      <span>{selectedScheduledSession.participants}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      console.log("Set reminder (UI demo)")
                      setShowScheduledSessionInfo(false)
                    }}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Set Reminder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log("Share session (UI demo)")
                      setShowScheduledSessionInfo(false)
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                 {` You'll receive a notification when this session starts`}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "bible":
        return <BibleContent />
      case "notes":
        return <NotesContent />
      case "guides":
        return <StudyGuidesContent />
      case "study-guide-view":
        return <StudyGuideViewerContent />
      case "study-guide-builder":
        return <StudyGuideBuilderContent />
      case "marketplace":
        return <MarketplaceContent />
      case "upload":
        return <UploadContent />
      case "forum":
        return <ForumContent />
      case "live":
        return <LiveSessionsContent />
      case "session-view":
        return (
          <LiveSessionView
            session={activeSession}
            isLeader={isSessionLeader}
            participantMode={!isSessionLeader} // Pass participantMode based on leader status
            onLeaveSession={() => {
              setActiveSession(null)
              setIsSessionLeader(false)
              setSessionParticipants([])
              setActiveSection("live")
            }}
            currentPage={currentSessionPage}
            onPageChange={(page) => setCurrentSessionPage(page)}
            bibleRef={sessionBibleRef}
            onBibleRefChange={setSessionBibleRef}
          />
        )
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)} className="bg-white shadow-md">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex">
        <NavigationSidebar />

        <main className="flex-1 lg:ml-0">
          <div
            className={
              activeSection === "study-guide-view" || activeSection === "study-guide-builder" ? "" : "p-6 lg:p-8"
            }
          >
            {renderContent()}
          </div>
        </main>
      </div>

      <BibleSidebar />

      {/* Floating Bible access button */}
      {activeSection !== "study-guide-view" && activeSection !== "study-guide-builder" && (
        <Button
          onClick={() => setBibleOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 z-30"
        >
          <Book className="h-6 w-6" />
        </Button>
      )}
      <SessionJoinModal open={showJoinModal} onOpenChange={setShowJoinModal} onJoinSession={handleJoinViaLink} />
    </div>
  )
}