"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Copy, Share2, Bookmark, BookmarkCheck, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { translations, books, getChapter, getBook, getBookByName } from "@/lib/bible-data"
import { saveBookmark, removeBookmark, isBookmarked, saveNote, getNote } from "@/lib/bible-storage"
import { FellowshipShareDialog } from "@/components/bible/fellowship-share-dialog"

export default function BibleReadPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [selectedTranslation, setSelectedTranslation] = useState("KJV")
  const [selectedBook, setSelectedBook] = useState(43) // John
  const [selectedChapter, setSelectedChapter] = useState(3)
  const [highlightedVerses, setHighlightedVerses] = useState<Set<number>>(new Set())
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set())
  const [noteDialog, setNoteDialog] = useState<{ verseRef: string; text: string; isOpen: boolean }>({
    verseRef: "",
    text: "",
    isOpen: false,
  })
  const [noteText, setNoteText] = useState("")
  const [shareDialog, setShareDialog] = useState<{ verseRef: string; text: string; isOpen: boolean }>({
    verseRef: "",
    text: "",
    isOpen: false,
  })

  useEffect(() => {
    const ref = searchParams.get("ref")
    if (ref) {
      try {
        const match = /^(\d?\s?\w+)\s+(\d+)(?::(\d+))?$/.exec(ref)
        if (match) {
          const [, bookName, chapter, verse] = match
          const book = getBookByName(bookName?.trim() ?? "")
          if (book) {
            setSelectedBook(book.id)
            setSelectedChapter(Number.parseInt(chapter ?? ""))
            if (verse) {
              setHighlightedVerses(new Set([Number.parseInt(verse)]))
            }
          }
        }
      } catch (error) {
        console.error("Error parsing Bible reference:", error)
      }
    }
  }, [searchParams]) // Remove searchParams dependency to prevent re-runs

  const currentBook = useMemo(() => getBook(selectedBook), [selectedBook])
  const verses = useMemo(() => {
    if (!currentBook) return []
    return getChapter(currentBook.name, selectedChapter)
  }, [currentBook, selectedChapter])

  useEffect(() => {
    if (!currentBook || verses.length === 0) return

    const bookmarked = new Set<string>()
    verses.forEach((verse) => {
      const verseRef = `${currentBook.name} ${selectedChapter}:${verse.number}`
      if (isBookmarked(verseRef)) {
        bookmarked.add(verseRef)
      }
    })

    setBookmarkedVerses((prev) => {
      if (prev.size !== bookmarked.size) return bookmarked
      for (const ref of bookmarked) {
        if (!prev.has(ref)) return bookmarked
      }
      return prev
    })
  }, [currentBook, selectedBook, selectedChapter, verses]) // More specific dependencies

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1)
    } else if (selectedBook > 1) {
      const prevBook = getBook(selectedBook - 1)
      if (prevBook) {
        setSelectedBook(selectedBook - 1)
        setSelectedChapter(prevBook.chapters)
      }
    }
    setHighlightedVerses(new Set())
  }

  const handleNextChapter = () => {
    if (currentBook && selectedChapter < currentBook.chapters) {
      setSelectedChapter(selectedChapter + 1)
    } else if (selectedBook < 66) {
      setSelectedBook(selectedBook + 1)
      setSelectedChapter(1)
    }
    setHighlightedVerses(new Set())
  }

  const handleVerseClick = (verseNumber: number) => {
    const newHighlighted = new Set(highlightedVerses)
    if (newHighlighted.has(verseNumber)) {
      newHighlighted.delete(verseNumber)
    } else {
      newHighlighted.add(verseNumber)
    }
    setHighlightedVerses(newHighlighted)
  }

  const handleCopyVerse = async (verseNumber: number, text: string) => {
    const reference = `${currentBook?.name} ${selectedChapter}:${verseNumber}`
    const copyText = `"${text}" - ${reference} (${selectedTranslation})`
    await navigator.clipboard.writeText(copyText)
    toast({
      title: "Verse copied!",
      description: `${reference} copied to clipboard`,
    })
  }

  const handleBookmarkVerse = (verseNumber: number, _text: string) => {
    const reference = `${currentBook?.name} ${selectedChapter}:${verseNumber}`
    const wasBookmarked = isBookmarked(reference)

    if (wasBookmarked) {
      removeBookmark(reference)
      setBookmarkedVerses((prev) => {
        const newSet = new Set(prev)
        newSet.delete(reference)
        return newSet
      })
      toast({
        title: "Bookmark removed",
        description: `${reference} removed from bookmarks`,
      })
    } else {
      saveBookmark(reference)
      setBookmarkedVerses((prev) => new Set([...prev, reference]))
      toast({
        title: "Verse bookmarked!",
        description: `${reference} added to your bookmarks`,
      })
    }
  }

  const handleAddNote = (verseNumber: number, text: string) => {
    const reference = `${currentBook?.name} ${selectedChapter}:${verseNumber}`
    const existingNote = getNote(reference)

    setNoteDialog({
      verseRef: reference,
      text: text,
      isOpen: true,
    })
    setNoteText(existingNote?.note || "")
  }

  const handleSaveNote = () => {
    if (noteText.trim()) {
      saveNote(noteDialog.verseRef, noteText.trim())
      if (!isBookmarked(noteDialog.verseRef)) {
        saveBookmark(noteDialog.verseRef, noteText.trim())
        setBookmarkedVerses((prev) => new Set([...prev, noteDialog.verseRef]))
      }
      toast({
        title: "Note saved!",
        description: `Note for ${noteDialog.verseRef} has been saved`,
      })
    }
    setNoteDialog({ verseRef: "", text: "", isOpen: false })
    setNoteText("")
  }

  const handleShareVerse = (verseNumber: number, text: string) => {
    const reference = `${currentBook?.name} ${selectedChapter}:${verseNumber}`
    setShareDialog({
      verseRef: reference,
      text: text,
      isOpen: true,
    })
  }

  if (!currentBook) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {translations.map((translation) => (
                    <SelectItem key={translation.code} value={translation.code}>
                      {translation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedBook.toString()}
                onValueChange={(value) => {
                  setSelectedBook(Number.parseInt(value))
                  setSelectedChapter(1)
                  setHighlightedVerses(new Set())
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Old Testament</div>
                  {books
                    .filter((book) => book.testament === "old")
                    .map((book) => (
                      <SelectItem key={book.id} value={book.id.toString()}>
                        {book.name}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                    New Testament
                  </div>
                  {books
                    .filter((book) => book.testament === "new")
                    .map((book) => (
                      <SelectItem key={book.id} value={book.id.toString()}>
                        {book.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedChapter.toString()}
                onValueChange={(value) => {
                  setSelectedChapter(Number.parseInt(value))
                  setHighlightedVerses(new Set())
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map((chapter) => (
                    <SelectItem key={chapter} value={chapter.toString()}>
                      Chapter {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousChapter}
                disabled={selectedBook === 1 && selectedChapter === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextChapter}
                disabled={selectedBook === 66 && selectedChapter === (currentBook?.chapters || 0)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          {currentBook.name} {selectedChapter}
        </h1>
        <Badge variant="secondary">{selectedTranslation}</Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          {verses.length > 0 ? (
            <div className="space-y-4">
              {verses.map((verse) => {
                const verseRef = `${currentBook.name} ${selectedChapter}:${verse.number}`
                const isBookmarkedVerse = bookmarkedVerses.has(verseRef)

                return (
                  <div
                    key={verse.number}
                    className={`group relative p-4 rounded-lg transition-colors cursor-pointer ${
                      highlightedVerses.has(verse.number)
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    } ${isBookmarkedVerse ? "border-l-4 border-l-primary" : ""}`}
                    onClick={() => handleVerseClick(verse.number)}
                  >
                    <div className="flex gap-3">
                      <span className="text-sm font-bold text-primary min-w-[2rem] mt-1">{verse.number}</span>
                      <p className="text-base leading-relaxed flex-1">{verse.text}</p>
                    </div>

                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={async (e) => {
                          e.stopPropagation()
                          await handleCopyVerse(verse.number, verse.text)
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${isBookmarkedVerse ? "text-primary" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBookmarkVerse(verse.number, verse.text)
                        }}
                      >
                        {isBookmarkedVerse ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddNote(verse.number, verse.text)
                        }}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShareVerse(verse.number, verse.text)
                        }}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No verses available for this chapter.</p>
              <p className="text-sm mt-2">This is mock data - in a real app, all chapters would be available.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePreviousChapter}
          disabled={selectedBook === 1 && selectedChapter === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Chapter
        </Button>

        <div className="text-sm text-muted-foreground">
          {highlightedVerses.size > 0 && (
            <span>
              {highlightedVerses.size} verse{highlightedVerses.size !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>

        <Button
          variant="outline"
          onClick={handleNextChapter}
          disabled={selectedBook === 66 && selectedChapter === (currentBook?.chapters || 0)}
        >
          Next Chapter
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Dialog open={noteDialog.isOpen} onOpenChange={(open) => setNoteDialog((prev) => ({ ...prev, isOpen: open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>{noteDialog.verseRef}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm italic">`{noteDialog.text}`</p>
            </div>
            <div>
              <label className="text-sm font-medium">Your Note</label>
              <Textarea
                placeholder="Write your thoughts, reflections, or insights..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialog((prev) => ({ ...prev, isOpen: false }))}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote} disabled={!noteText.trim()}>
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FellowshipShareDialog
        isOpen={shareDialog.isOpen}
        onClose={() => setShareDialog((prev) => ({ ...prev, isOpen: false }))}
        verseRef={shareDialog.verseRef}
        verseText={shareDialog.text}
      />
    </div>
  )
}
