// Local storage utilities for Bible bookmarks and notes
import type { Bookmark } from "./bible-data"

const BOOKMARKS_KEY = "antioch-bible-bookmarks"
const NOTES_KEY = "antioch-bible-notes"

export interface Note {
  id: string
  verseRef: string
  note: string
  dateAdded: string
  dateModified: string
}

// Bookmark functions
export function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY)
    return stored ? JSON.parse(stored) as Bookmark[] : []
  } catch {
    return []
  }
}

export function saveBookmark(verseRef: string, note?: string): void {
  if (typeof window === "undefined") return

  const bookmarks = getBookmarks()
  const existing = bookmarks.find((b) => b.verseRef === verseRef)

  if (existing) {
    if (note !== undefined) {
      existing.note = note
      existing.dateAdded = new Date().toISOString()
    }
  } else {
    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      verseRef,
      note,
      dateAdded: new Date().toISOString(),
    }
    bookmarks.unshift(newBookmark)
  }

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
}

export function removeBookmark(verseRef: string): void {
  if (typeof window === "undefined") return

  const bookmarks = getBookmarks()
  const filtered = bookmarks.filter((b) => b.verseRef !== verseRef)
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered))
}

export function isBookmarked(verseRef: string): boolean {
  const bookmarks = getBookmarks()
  return bookmarks.some((b) => b.verseRef === verseRef)
}

// Note functions
export function getNotes(): Note[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(NOTES_KEY)
    return stored ? JSON.parse(stored) as Note[] : []
  } catch {
    return []
  }
}

export function saveNote(verseRef: string, noteText: string): void {
  if (typeof window === "undefined") return

  const notes = getNotes()
  const existing = notes.find((n) => n.verseRef === verseRef)

  if (existing) {
    existing.note = noteText
    existing.dateModified = new Date().toISOString()
  } else {
    const newNote: Note = {
      id: crypto.randomUUID(),
      verseRef,
      note: noteText,
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    }
    notes.unshift(newNote)
  }

  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

export function removeNote(verseRef: string): void {
  if (typeof window === "undefined") return

  const notes = getNotes()
  const filtered = notes.filter((n) => n.verseRef !== verseRef)
  localStorage.setItem(NOTES_KEY, JSON.stringify(filtered))
}

export function getNote(verseRef: string): Note | undefined {
  const notes = getNotes()
  return notes.find((n) => n.verseRef === verseRef)
}

// Initialize with some mock data if empty
export function initializeMockData(): void {
  if (typeof window === "undefined") return

  const bookmarks = getBookmarks()
  const notes = getNotes()

  if (bookmarks.length === 0) {
    const mockBookmarks: Bookmark[] = [
      {
        id: "1",
        verseRef: "John 3:16",
        note: "This verse reminds me of God's incredible love for all humanity.",
        dateAdded: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: "2",
        verseRef: "Psalms 23:1",
        dateAdded: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: "3",
        verseRef: "Romans 8:28",
        note: "A powerful reminder that God works all things for good in our lives.",
        dateAdded: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      },
    ]
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(mockBookmarks))
  }

  if (notes.length === 0) {
    const mockNotes: Note[] = [
      {
        id: "1",
        verseRef: "Philippians 4:13",
        note: "This verse has been my strength during difficult times. It reminds me that with Christ, I can overcome any challenge that comes my way.",
        dateAdded: new Date(Date.now() - 86400000).toISOString(),
        dateModified: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "2",
        verseRef: "Jeremiah 29:11",
        note: "God's plans for us are always good, even when we can't see the bigger picture. This brings me peace during uncertain times.",
        dateAdded: new Date(Date.now() - 172800000).toISOString(),
        dateModified: new Date(Date.now() - 172800000).toISOString(),
      },
    ]
    localStorage.setItem(NOTES_KEY, JSON.stringify(mockNotes))
  }
}
