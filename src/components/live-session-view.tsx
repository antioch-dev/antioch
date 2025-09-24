"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Share2,
  Lock,
  Unlock,
  Send,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Crown,
  MessageCircle,
  ArrowLeft,
  Copy,
  CheckCircle,
  Book,
  FileText,
  Loader2,
  Highlighter,
  Focus,
  Play,
  Pause,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"


interface StudyGuide {
  id: string;
  title: string;
  author: string;
  description: string;
  totalChapters: number;
  totalPages: Record<number, number>; 
  currentChapter: number;
}

interface Session {
  id: number;
  title?: string;
}

interface LiveSessionViewProps {
  session: Session | null
  isLeader: boolean
  participantMode?: boolean
  onLeaveSession: () => void
  currentPage: { chapter: number; page: number }
  onPageChange: (page: { chapter: number; page: number }) => void
  bibleRef: { book: string; chapter: number; verse: number }
  onBibleRefChange: (ref: { book: string; chapter: number; verse: number }) => void
}

export function LiveSessionView({
  session,
  isLeader,
  onLeaveSession,
  currentPage,
  onPageChange,
  bibleRef,
  onBibleRefChange,
}: LiveSessionViewProps) {
  // UI State
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [activeContentType, setActiveContentType] = useState<"bible" | "guide">("guide")
  const [selectedStudyGuide, setSelectedStudyGuide] = useState("john-gospel")
  const [navigationLocked, setNavigationLocked] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [leaderModeActive, setLeaderModeActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  // Mock data
  const participants = [
    { id: 1, name: "Pastor Mike", avatar: "PM", isLeader: true, status: "active", speaking: false },
    { id: 2, name: "Sarah Johnson", avatar: "SJ", isLeader: false, status: "following", speaking: false },
    { id: 3, name: "David Wilson", avatar: "DW", isLeader: false, status: "following", speaking: true },
    { id: 4, name: "Mary Chen", avatar: "MC", isLeader: false, status: "following", speaking: false },
    { id: 5, name: "John Smith", avatar: "JS", isLeader: false, status: "active", speaking: false },
    { id: 6, name: "Lisa Brown", avatar: "LB", isLeader: false, status: "following", speaking: false },
  ]

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      author: "Pastor Mike",
      avatar: "PM",
      message: "Welcome everyone! Let's begin our study of John Chapter 8.",
      time: "7:30 PM",
      isLeader: true,
    },
    {
      id: 2,
      author: "Sarah Johnson",
      avatar: "SJ",
      message: "Thank you for leading this study, Pastor!",
      time: "7:31 PM",
      isLeader: false,
    },
    {
      id: 3,
      author: "David Wilson",
      avatar: "DW",
      message: "Looking forward to diving deeper into this passage 🙏",
      time: "7:32 PM",
      isLeader: false,
    },
    {
      id: 4,
      author: "Mary Chen",
      avatar: "MC",
      message: "Could you repeat the verse reference?",
      time: "7:33 PM",
      isLeader: false,
    },
  ])

  const studyGuides: StudyGuide[] = [
    {
      id: "john-gospel",
      title: "The Gospel of John",
      author: "Pastor Smith",
      description: "Deep dive into the Gospel of John",
      totalChapters: 21,
      totalPages: { 1: 5, 2: 4, 3: 6, 4: 3, 5: 5 }, // Pages per chapter
      currentChapter: currentPage.chapter,
    },
    {
      id: "romans-study",
      title: "Romans: Righteousness Revealed",
      author: "Dr. Johnson",
      description: "Exploring Paul's letter to the Romans",
      totalChapters: 16,
      totalPages: { 1: 4, 2: 5, 3: 3, 4: 6, 5: 4 },
      currentChapter: 1,
    },
    {
      id: "psalms-devotional",
      title: "Psalms Daily Devotional",
      author: "Sarah Wilson",
      description: "Daily reflections on the Psalms",
      totalChapters: 150,
      totalPages: { 1: 3, 2: 4, 3: 2, 4: 5, 5: 3 },
      currentChapter: 1,
    },
  ]

  const bibleBooks = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Songs",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Timothy",
    "2 Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation",
  ]

  // Enhanced content with multiple pages per chapter
  const getStudyGuideContent = (chapter: number, page: number) => {
    const contentMap: Record<string, string> = {
      "1-1": `# The Light of the World - Introduction

## Welcome to John Chapter 8

In this powerful chapter, we encounter Jesus making one of His most profound declarations about His identity. This study will guide us through understanding what it means for Jesus to be "the light of the world."

### Opening Prayer
*"Lord, open our hearts and minds to receive Your truth. Help us to walk in Your light and share that light with others. Amen."*

### Key Verse
*"When Jesus spoke again to the people, he said, 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.'" - John 8:12*`,

      "1-2": `# Understanding Light and Darkness

## Biblical Symbolism

Throughout Scripture, light and darkness carry deep spiritual significance:

### Light Represents:
- **Truth and Revelation** - God's word illuminates our path
- **Holiness and Purity** - God's perfect nature
- **Life and Hope** - The promise of eternal life
- **Guidance and Direction** - Leading us in righteousness

### Darkness Represents:
- **Sin and Evil** - Separation from God
- **Ignorance and Deception** - Lack of spiritual understanding
- **Death and Despair** - The consequence of sin
- **Confusion and Lostness** - Life without God's guidance

### Reflection Questions:
1. How do you see light and darkness in your daily life?
2. What areas of your life need God's light?`,

      "1-3": `# Jesus' Bold Declaration

## "I Am the Light of the World"

When Jesus made this statement, He was claiming to be:

### The Source of Spiritual Illumination
Jesus doesn't just show us the light - He IS the light. This means:
- All truth comes from Him
- All spiritual understanding flows through Him
- He is the answer to humanity's spiritual darkness

### The Universal Light
Notice Jesus said "the light of the world" - not just for Israel, but for all humanity:
- Every person needs this light
- No one is excluded from His offer
- His light transcends all boundaries

### The Life-Giving Light
This isn't just intellectual knowledge, but life-transforming power:
- His light brings spiritual life
- It transforms our nature
- It empowers us to live righteously

### Discussion:
How does knowing Jesus as "the light" change your perspective on life's challenges?`,

      "1-4": `# The Promise: Never Walk in Darkness

## What Does This Mean?

When Jesus promises that those who follow Him will "never walk in darkness," He's offering:

### Spiritual Security
- Protection from spiritual deception
- Clarity in moral decisions
- Confidence in God's truth

### Ongoing Guidance
- Daily direction for life's decisions
- Wisdom for difficult situations
- Peace in uncertain times

### Eternal Hope
- Assurance of salvation
- Promise of eternal life
- Victory over death and hell

### The Condition: Following Jesus
This promise comes with a requirement - we must "follow" Him:
- **Obedience** - Doing what He commands
- **Trust** - Believing in His promises
- **Commitment** - Making Him Lord of our lives

### Personal Application:
What does it mean practically to "follow" Jesus in your daily life?`,

      "1-5": `# Living as Children of Light

## Practical Applications

As followers of Jesus, we are called to:

### Reflect His Light
- Live with integrity and honesty
- Show love and compassion to others
- Stand for truth in a dark world

### Share His Light
- Tell others about Jesus
- Demonstrate His love through our actions
- Be a beacon of hope in our community

### Walk in His Light
- Make decisions based on His word
- Seek His guidance in prayer
- Trust His leading even when we can't see the full path

### Closing Prayer
*"Father, thank You for sending Jesus as the light of the world. Help us to walk in His light daily, to reflect His light to others, and to never take for granted this precious gift of spiritual illumination. In Jesus' name, Amen."*

### Next Week Preview
Join us next week as we explore Jesus' teaching about spiritual freedom in John 8:31-36.`,

      "2-1": `# The Truth Will Set You Free

## John 8:31-36

In our second chapter, we dive deeper into Jesus' conversation with the Jewish leaders about truth and freedom.

### Opening Reflection
What does freedom mean to you? How is spiritual freedom different from physical freedom?

### Key Passage
*"To the Jews who had believed him, Jesus said, 'If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.'" - John 8:31-32*`,

      "2-2": `# True Discipleship

## The Marks of a Real Disciple

Jesus outlines what it means to be His true follower:

### Holding to His Teaching
- Not just hearing, but obeying
- Consistency in following His word
- Making His teachings our life guide

### Knowing the Truth
- Understanding God's character
- Recognizing spiritual reality
- Discerning right from wrong

### Experiencing Freedom
- Liberation from sin's power
- Freedom from guilt and shame
- Release from spiritual bondage

### The Process
Notice the progression: Teaching → Discipleship → Truth → Freedom`,
    }

    return (
      contentMap[`${chapter}-${page}`] ||
      `# Chapter ${chapter}, Page ${page}\n\nContent for this page is being prepared...`
    )
  }

  const getBibleContent = (book: string, chapter: number) => {
    const bibleContent: Record<string, string> = {
      "John-1": `# John Chapter 1

## The Word Became Flesh

**1** In the beginning was the Word, and the Word was with God, and the Word was God. **2** He was with God in the beginning. **3** Through him all things were made; without him nothing was made that has been made.

**4** In him was life, and that life was the light of all mankind. **5** The light shines in the darkness, and the darkness has not overcome it.

**6** There was a man sent from God whose name was John. **7** He came as a witness to testify concerning that light, so that through him all might believe. **8** He himself was not the light; he came only as a witness to the light.

**9** The true light that gives light to everyone was coming into the world. **10** He was in the world, and though the world was made through him, the world did not recognize him. **11** He came to that which was his own, but his own did not receive him.

**12** Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God— **13** children born not of natural descent, nor of human decision or a husband's will, but born of God.

**14** The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.`,

      "John-8": `# John Chapter 8

## Jesus, the Light of the World

**12** When Jesus spoke again to the people, he said, "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."

**13** The Pharisees challenged him, "Here you are, appearing as your own witness; your testimony is not valid."

**14** Jesus answered, "Even if I testify on my behalf, my testimony is valid, for I know where I came from and where I am going. But you have no idea where I come from or where I am going. **15** You judge by human standards; I pass judgment on no one. **16** But if I do judge, my decisions are true, because I am not alone. I stand with the Father, who sent me.

**17** In your own Law it is written that the testimony of two witnesses is true. **18** I am one who testifies for myself; my other witness is the Father, who sent me."

**19** Then they asked him, "Where is your father?" "You do not know me or my Father," Jesus replied. "If you knew me, you would know my Father also."

**20** He spoke these words while teaching in the temple courts near the place where the offerings were put. Yet no one seized him, because his hour had not yet come.`,

      "Psalms-23": `# Psalm 23

## The Lord is My Shepherd

**1** The Lord is my shepherd, I lack nothing.

**2** He makes me lie down in green pastures,
    he leads me beside quiet waters,

**3** he refreshes my soul.
    He guides me along the right paths
    for his name's sake.

**4** Even though I walk
    through the darkest valley,
I will fear no evil,
    for you are with me;
your rod and your staff,
    they comfort me.

**5** You prepare a table before me
    in the presence of my enemies.
You anoint my head with oil;
    my cup overflows.

**6** Surely your goodness and love will follow me
    all the days of my life,
and I will dwell in the house of the Lord
    forever.`,
    }

    return (
      bibleContent[`${book}-${chapter}`] ||
      `# ${book} Chapter ${chapter}\n\nBible content for this passage is being loaded...`
    )
  }

  // Get current content based on selection
  const getCurrentContent = () => {
    if (activeContentType === "bible") {
      return {
        type: "bible",
        title: `${bibleRef.book} Chapter ${bibleRef.chapter}`,
        content: getBibleContent(bibleRef.book, bibleRef.chapter),
        reference: `${bibleRef.book} ${bibleRef.chapter}:${bibleRef.verse || "1-11"}`,
      }
    } else {
      const guide = studyGuides.find((g) => g.id === selectedStudyGuide)
      return {
        type: "guide",
        title: `${guide?.title} - Chapter ${currentPage.chapter}`,
        content: getStudyGuideContent(currentPage.chapter, currentPage.page),
        chapter: currentPage.chapter,
        page: currentPage.page,
        totalChapters: guide?.totalChapters || 21,
        totalPages: guide?.totalPages?.[currentPage.chapter] ?? 5,
        guide: guide?.title || "Unknown Guide",
      }
    }
  }

  const handleNavigation = (direction: "prev" | "next", type: "page" | "chapter") => {
    setIsTransitioning(true)

    setTimeout(() => {
      if (activeContentType === "bible") {
        if (type === "chapter") {
          if (direction === "next") {
            onBibleRefChange({ ...bibleRef, chapter: bibleRef.chapter + 1, verse: 1 })
          } else {
            onBibleRefChange({ ...bibleRef, chapter: Math.max(1, bibleRef.chapter - 1), verse: 1 })
          }
        }
      } else {
        const guide = studyGuides.find((g) => g.id === selectedStudyGuide)
        const maxPagesInChapter = guide?.totalPages?.[currentPage.chapter] || 5

        if (type === "page") {
          if (direction === "next") {
            if (currentPage.page < maxPagesInChapter) {
              onPageChange({ ...currentPage, page: currentPage.page + 1 })
            }
          } else {
            onPageChange({ ...currentPage, page: Math.max(1, currentPage.page - 1) })
          }
        } else if (type === "chapter") {
          if (direction === "next") {
            onPageChange({ chapter: currentPage.chapter + 1, page: 1 })
          } else {
            onPageChange({ chapter: Math.max(1, currentPage.chapter - 1), page: 1 })
          }
        }
      }
      setIsTransitioning(false)
    }, 300)
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      author: isLeader ? "Pastor Mike" : "You",
      avatar: isLeader ? "PM" : "YU",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isLeader: isLeader,
    }

    setChatMessages([...chatMessages, newMessage])
    setChatMessage("")
  }

  const handleReaction = (emoji: string) => {
    console.log(`Reaction sent: ${emoji}`)
  }

  const handleCopyLink = async () => {
    const sessionLink = `https://biblestudy.app/session/${session?.id}`
    await navigator.clipboard.writeText(sessionLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`)
  }

  const currentContent = getCurrentContent()
  const followingCount = participants.filter((p) => p.status === "following").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onLeaveSession}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Leave Session
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <h1 className="text-lg font-semibold">{session?.title}</h1>
                  <p className="text-sm text-gray-600">Live Session</p>
                </div>
              </div>

              {isLeader && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Crown className="h-3 w-3 mr-1" />
                  Session Leader
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {/* Participant count */}
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">{participants.length}</span>
              </div>

              {/* Audio/Video controls */}
              <div className="flex items-center space-x-2">
                <Button variant={isMuted ? "destructive" : "outline"} size="sm" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  variant={isCameraOn ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsCameraOn(!isCameraOn)}
                >
                  {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                </Button>
              </div>

              {/* Leader Mode Toggle */}
              {isLeader && (
                <Button
                  onClick={() => setLeaderModeActive(!leaderModeActive)}
                  className={cn(
                    "bg-red-600 hover:bg-red-700 text-white",
                    leaderModeActive && "bg-red-700 ring-2 ring-red-300",
                  )}
                  size="sm"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Leader Mode
                </Button>
              )}

              {/* Share button */}
              <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Session</DialogTitle>
                    <DialogDescription>Invite others to join your live Bible study session</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input value={`https://biblestudy.app/session/${session?.id}`} readOnly className="flex-1" />
                      <Button onClick={handleCopyLink} variant="outline">
                        {linkCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {linkCopied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Leader Mode Banner */}
            {isLeader && leaderModeActive && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600 rounded-full">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">You are in leader mode</h3>
                      <p className="text-sm text-blue-700">
                        You have full control over the session content and navigation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Session Controls */}
            {isLeader && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Session Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Content Type Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Content Type</label>
                      <Tabs value={activeContentType} onValueChange={(value) => setActiveContentType(value as "bible" | "guide")}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="guide" className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>Study Guide</span>
                          </TabsTrigger>
                          <TabsTrigger value="bible" className="flex items-center space-x-2">
                            <Book className="h-4 w-4" />
                            <span>Bible</span>
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Bible Study Selection */}
                    {activeContentType === "guide" && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Bible Study</label>
                        <Select value={selectedStudyGuide} onValueChange={setSelectedStudyGuide}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {studyGuides.map((guide) => (
                              <SelectItem key={guide.id} value={guide.id}>
                                {guide.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Scripture Selection */}
                    {activeContentType === "bible" && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Scripture</label>
                        <div className="flex space-x-2">
                          <Select
                            value={bibleRef.book}
                            onValueChange={(book) => onBibleRefChange({ ...bibleRef, book })}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {bibleBooks.map((book) => (
                                <SelectItem key={book} value={book}>
                                  {book}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            value={bibleRef.chapter}
                            onChange={(e) =>
                              onBibleRefChange({ ...bibleRef, chapter: Number.parseInt(e.target.value) || 1 })
                            }
                            className="w-20"
                            min="1"
                            placeholder="Ch"
                          />
                        </div>
                      </div>
                    )}

                    {/* Navigation Lock */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Navigation Control</label>
                      <div className="flex items-center space-x-3">
                        <Switch checked={navigationLocked} onCheckedChange={setNavigationLocked} id="navigation-lock" />
                        <label htmlFor="navigation-lock" className="text-sm flex items-center space-x-1">
                          {navigationLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                          <span>Lock Navigation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Content Display */}
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-800">{currentContent.title}</CardTitle>
                    {currentContent.type === "bible" && (
                      <p className="text-sm text-gray-600 mt-1">{currentContent.reference}</p>
                    )}
                    {currentContent.type === "guide" && (
                      <p className="text-sm text-gray-600 mt-1">
                        Chapter {currentContent.chapter}, Page {currentContent.page} of {currentContent.totalPages} •{" "}
                        {currentContent.guide}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="bg-white">
                    {activeContentType === "bible" ? "Bible" : "Study Guide"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative">
                {/* Left Navigation Arrow */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg bg-white/90 hover:bg-white border"
                  onClick={() => handleNavigation("prev", activeContentType === "bible" ? "chapter" : "page")}
                  disabled={
                    isTransitioning || (activeContentType === "bible" ? bibleRef.chapter <= 1 : currentPage.page <= 1)
                  }
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Right Navigation Arrow */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg bg-white/90 hover:bg-white border"
                  onClick={() => handleNavigation("next", activeContentType === "bible" ? "chapter" : "page")}
                  disabled={
                    isTransitioning ||
                    (activeContentType === "guide" && (currentContent?.page ?? 0) >= (currentContent?.totalPages ?? 0))
                  }
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Content Area */}
                <div className="p-12 min-h-[600px] bg-white">
                  <div
                    className={cn("transition-opacity duration-300 max-w-4xl mx-auto", isTransitioning && "opacity-50")}
                  >
                    {isTransitioning && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                        <span className="ml-2 text-sm text-gray-600">Loading...</span>
                      </div>
                    )}
                    <div
                      className="prose prose-lg max-w-none leading-relaxed text-gray-800"
                      style={{
                        lineHeight: "1.8",
                        fontSize: "16px",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: currentContent.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\*(.*?)\*/g, "<em>$1</em>")
                            .replace(
                              /^# (.*$)/gm,
                              '<h1 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">$1</h1>',
                            )
                            .replace(
                              /^## (.*$)/gm,
                              '<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">$1</h2>',
                            )
                            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium text-gray-700 mb-3 mt-6">$1</h3>')
                            .replace(
                              /^\*\*(\d+)\*\*/gm,
                              '<span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold mr-2">$1</span>',
                            )
                            .replace(/^- (.*$)/gm, '<li class="mb-2 text-gray-700">$1</li>')
                            .replace(/\n\n/g, '</p><p class="mb-4">')
                            .replace(/^(?!<[h|l|s])/gm, '<p class="mb-4">'),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => handleNavigation("prev", "chapter")}
                      disabled={
                        isTransitioning ||
                        (activeContentType === "bible" ? bibleRef.chapter <= 1 : currentPage.chapter <= 1)
                      }
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous Chapter
                    </Button>

                    {activeContentType === "guide" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleNavigation("prev", "page")}
                          disabled={isTransitioning || currentPage.page <= 1}
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Previous Page
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleNavigation("next", "page")}
                          disabled={isTransitioning ?? (currentContent?.page ?? 0) >= (currentContent?.totalPages ?? 0)}
                        >
                          Next Page
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </>
                    )}

                    <Button onClick={() => handleNavigation("next", "chapter")} disabled={isTransitioning}>
                      Next Chapter
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {isLeader && (
                    <div className="text-sm text-gray-600">
                      {navigationLocked ? (
                        <span className="flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Navigation locked
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Unlock className="h-3 w-3 mr-1" />
                          Free navigation
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Compact Leader Controls */}
            {isLeader && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <span>Leader Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Content Type Tabs */}
                  <div className="space-y-2">
                    <Tabs value={activeContentType} onValueChange={(value) => setActiveContentType(value as "bible" | "guide")}>
                      <TabsList className="grid w-full grid-cols-2 h-8">
                        <TabsTrigger value="guide" className="text-xs">
                          Guide
                        </TabsTrigger>
                        <TabsTrigger value="bible" className="text-xs">
                          Bible
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Chapter Navigation */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNavigation("prev", "chapter")}
                        disabled={
                          isTransitioning ||
                          (activeContentType === "bible" ? bibleRef.chapter <= 1 : currentPage.chapter <= 1)
                        }
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">
                        Ch. {activeContentType === "bible" ? bibleRef.chapter : currentPage.chapter}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNavigation("next", "chapter")}
                        disabled={isTransitioning}
                      >
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Page Navigation (for Study Guide) */}
                  {activeContentType === "guide" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleNavigation("prev", "page")}
                          disabled={isTransitioning || currentPage.page <= 1}
                        >
                          <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">Page {currentPage.page}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleNavigation("next", "page")}
                          disabled={isTransitioning ?? (currentContent?.page ?? 0) >= (currentContent?.totalPages ?? 0)}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">Quick Actions</label>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction("highlight")}
                        className="flex-1"
                      >
                        <Highlighter className="h-3 w-3 mr-1" />
                        <span className="text-xs">Highlight</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleQuickAction("focus")} className="flex-1">
                        <Focus className="h-3 w-3 mr-1" />
                        <span className="text-xs">Focus</span>
                      </Button>
                    </div>
                  </div>

                  {/* Voice & Video */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">Voice & Video</label>
                    <div className="flex space-x-2">
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => setIsRecording(!isRecording)}
                        className="flex-1"
                      >
                        {isRecording ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        <span className="text-xs ml-1">{isRecording ? "Stop" : "Record"}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participants */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Participants ({participants.length})</span>
                  <Badge variant="outline" className="text-xs">
                    {followingCount}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{participant.avatar}</AvatarFallback>
                        </Avatar>
                        {participant.speaking && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{participant.name}</span>
                      {participant.isLeader && <Crown className="h-3 w-3 text-yellow-500" />}
                    </div>
                    <div className="flex items-center space-x-1">
                      {participant.status === "following" && (
                        <Badge variant="outline" className="text-xs">
                          Following
                        </Badge>
                      )}
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          participant.status === "active" ? "bg-green-500" : "bg-yellow-500",
                        )}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Live Chat</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setChatOpen(!chatOpen)}>
                    {chatOpen ? <MessageCircle className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {chatOpen && (
                <CardContent className="space-y-4">
                  {/* Messages */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">{msg.author}</span>
                          {msg.isLeader && <Crown className="h-3 w-3 text-yellow-500" />}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm ml-7">{msg.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Reactions */}
                  <div className="flex space-x-2">
                    {["👍", "❤️", "🙏", "✋", "❓"].map((emoji) => (
                      <Button
                        key={emoji}
                        variant="outline"
                        size="sm"
                        onClick={() => handleReaction(emoji)}
                        className="text-lg p-1 h-8 w-8"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
