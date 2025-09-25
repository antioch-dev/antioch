// Mock fellowship data and sharing functionality
export interface Fellowship {
  id: string
  name: string
  description: string
  memberCount: number
  isActive: boolean
}

export interface ShareDestination {
  id: string
  type: "post" | "prayer" | "event" | "discussion"
  title: string
  description: string
  icon: string
  fellowshipId?: string
}

export interface SharedVerse {
  id: string
  verseRef: string
  verseText: string
  note?: string
  sharedBy: string
  sharedTo: ShareDestination
  dateShared: string
  likes: number
  comments: Comment[]
}

export interface Comment {
  id: string
  author: string
  text: string
  dateAdded: string
}

// Mock fellowships
export const fellowships: Fellowship[] = [
  {
    id: "1",
    name: "Grace Community Church",
    description: "Main fellowship for Grace Community Church members",
    memberCount: 245,
    isActive: true,
  },
  {
    id: "2",
    name: "Young Adults Ministry",
    description: "Fellowship for young adults (18-35)",
    memberCount: 67,
    isActive: true,
  },
  {
    id: "3",
    name: "Bible Study Group",
    description: "Weekly Bible study and discussion group",
    memberCount: 23,
    isActive: true,
  },
  {
    id: "4",
    name: "Prayer Warriors",
    description: "Dedicated prayer and intercession group",
    memberCount: 89,
    isActive: true,
  },
]

// Mock share destinations
export const shareDestinations: ShareDestination[] = [
  {
    id: "general-post",
    type: "post",
    title: "General Fellowship Post",
    description: "Share with the entire fellowship community",
    icon: "Users",
  },
  {
    id: "prayer-request",
    type: "prayer",
    title: "Prayer Request",
    description: "Share as a prayer request with verse encouragement",
    icon: "Heart",
  },
  {
    id: "bible-study",
    type: "discussion",
    title: "Bible Study Discussion",
    description: "Add to Bible study discussion topics",
    icon: "BookOpen",
    fellowshipId: "3",
  },
  {
    id: "youth-event",
    type: "event",
    title: "Youth Event Inspiration",
    description: "Share for upcoming youth events",
    icon: "Calendar",
    fellowshipId: "2",
  },
  {
    id: "prayer-group",
    type: "prayer",
    title: "Prayer Group",
    description: "Share with the prayer warriors group",
    icon: "Zap",
    fellowshipId: "4",
  },
  {
    id: "sermon-prep",
    type: "discussion",
    title: "Sermon Preparation",
    description: "Contribute to sermon preparation discussions",
    icon: "Mic",
  },
]

// Mock shared verses
export const sharedVerses: SharedVerse[] = [
  {
    id: "1",
    verseRef: "John 3:16",
    verseText:
      "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    note: "This verse always reminds me of God's incredible love for us. Perfect for our upcoming outreach event!",
    sharedBy: "Sarah Johnson",
    sharedTo: shareDestinations[0]!,
    dateShared: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 12,
    comments: [
      {
        id: "1",
        author: "Mike Chen",
        text: "Amen! This is such a powerful reminder of God's love.",
        dateAdded: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      },
      {
        id: "2",
        author: "Lisa Rodriguez",
        text: "Perfect verse for our outreach. Thank you for sharing!",
        dateAdded: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      },
    ],
  },
  {
    id: "2",
    verseRef: "Psalms 23:1",
    verseText: "The LORD is my shepherd; I shall not want.",
    note: "Please pray for comfort for the Johnson family during this difficult time.",
    sharedBy: "Pastor David",
    sharedTo: shareDestinations[1]!,
    dateShared: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: 8,
    comments: [
      {
        id: "3",
        author: "Mary Thompson",
        text: "Praying for the Johnson family. God is our shepherd indeed.",
        dateAdded: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
  {
    id: "3",
    verseRef: "Romans 8:28",
    verseText:
      "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    note: "Great discussion topic for this week's Bible study on God's sovereignty.",
    sharedBy: "Jennifer Lee",
    sharedTo: shareDestinations[2]!,
    dateShared: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    likes: 15,
    comments: [
      {
        id: "4",
        author: "Robert Kim",
        text: "Looking forward to discussing this verse in our study group!",
        dateAdded: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: "5",
        author: "Amanda Davis",
        text: "This verse has been such an encouragement to me lately.",
        dateAdded: new Date(Date.now() - 129600000).toISOString(),
      },
    ],
  },
]

// Helper functions
export function getFellowship(id: string): Fellowship | undefined {
  return fellowships.find((f) => f.id === id)
}

export function getShareDestination(id: string): ShareDestination | undefined {
  return shareDestinations.find((d) => d.id === id)
}

export function getSharedVerses(): SharedVerse[] {
  return sharedVerses.sort((a, b) => new Date(b.dateShared).getTime() - new Date(a.dateShared).getTime())
}

export function shareVerse(verseRef: string, verseText: string, destinationId: string, note?: string): SharedVerse {
  const destination = getShareDestination(destinationId)
  if (!destination) {
    throw new Error("Invalid share destination")
  }

  const newShare: SharedVerse = {
    id: crypto.randomUUID(),
    verseRef,
    verseText,
    note,
    sharedBy: "Current User", // In a real app, this would be the logged-in user
    sharedTo: destination,
    dateShared: new Date().toISOString(),
    likes: 0,
    comments: [],
  }

  sharedVerses.unshift(newShare)
  return newShare
}
