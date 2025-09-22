"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, BookOpen, Edit3, Trash2, Plus, Search, Calendar, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  getBookmarks,
  getNotes,
  saveNote,
  removeBookmark,
  removeNote,
  initializeMockData,
  type Note,
} from "@/lib/bible-storage"
import type { Bookmark } from "@/lib/bible-data"

export default function BibleNotesPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingNote, setEditingNote] = useState<{ verseRef: string; note: string } | null>(null)
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [newNoteRef, setNewNoteRef] = useState("")
  const [newNoteText, setNewNoteText] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    initializeMockData()
    setBookmarks(getBookmarks())
    setNotes(getNotes())
  }, [])

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.verseRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.note && bookmark.note.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredNotes = notes.filter(
    (note) =>
      note.verseRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.note.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSaveNote = (verseRef: string, noteText: string) => {
    saveNote(verseRef, noteText)
    setNotes(getNotes())
    setEditingNote(null)
    toast({
      title: "Note saved!",
      description: `Note for ${verseRef} has been saved.`,
    })
  }

  const handleAddNote = () => {
    if (newNoteRef.trim() && newNoteText.trim()) {
      handleSaveNote(newNoteRef.trim(), newNoteText.trim())
      setNewNoteRef("")
      setNewNoteText("")
      setIsAddNoteOpen(false)
    }
  }

  const handleRemoveBookmark = (verseRef: string) => {
    removeBookmark(verseRef)
    setBookmarks(getBookmarks())
    toast({
      title: "Bookmark removed",
      description: `${verseRef} has been removed from your bookmarks.`,
    })
  }

  const handleRemoveNote = (verseRef: string) => {
    removeNote(verseRef)
    setNotes(getNotes())
    toast({
      title: "Note deleted",
      description: `Note for ${verseRef} has been deleted.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Bible Notes</h1>
          <p className="text-muted-foreground">Your bookmarked verses and personal reflections</p>
        </div>

        <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogDescription>Create a personal note for any Bible verse</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Verse Reference</label>
                <Input
                  placeholder="e.g., John 3:16"
                  value={newNoteRef}
                  onChange={(e) => setNewNoteRef(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Your Note</label>
                <Textarea
                  placeholder="Write your thoughts, reflections, or insights..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote} disabled={!newNoteRef.trim() || !newNoteText.trim()}>
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your bookmarks and notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Bookmarks and Notes */}
      <Tabs defaultValue="bookmarks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookmarks" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Bookmarks ({filteredBookmarks.length})
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <StickyNote className="h-4 w-4" />
            Notes ({filteredNotes.length})
          </TabsTrigger>
        </TabsList>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-4">
          {filteredBookmarks.length > 0 ? (
            <div className="grid gap-4">
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{bookmark.verseRef}</Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(bookmark.dateAdded)}
                          </Badge>
                        </div>

                        {bookmark.note && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-sm italic">"{bookmark.note}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/bible/read?ref=${encodeURIComponent(bookmark.verseRef)}`}>
                            <BookOpen className="h-4 w-4" />
                          </Link>
                        </Button>

                        {bookmark.note && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Note</DialogTitle>
                                <DialogDescription>{bookmark.verseRef}</DialogDescription>
                              </DialogHeader>
                              <Textarea
                                defaultValue={bookmark.note}
                                onChange={(e) => setEditingNote({ verseRef: bookmark.verseRef, note: e.target.value })}
                                rows={4}
                              />
                              <DialogFooter>
                                <Button
                                  onClick={() => editingNote && handleSaveNote(editingNote.verseRef, editingNote.note)}
                                >
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Bookmark</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {bookmark.verseRef} from your bookmarks? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveBookmark(bookmark.verseRef)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "No bookmarks match your search." : "Start bookmarking verses while reading!"}
                </p>
                <Button asChild>
                  <Link href="/bible/read">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Reading
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          {filteredNotes.length > 0 ? (
            <div className="grid gap-4">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{note.verseRef}</Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(note.dateModified)}
                          </Badge>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm leading-relaxed">{note.note}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/bible/read?ref=${encodeURIComponent(note.verseRef)}`}>
                            <BookOpen className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Note</DialogTitle>
                              <DialogDescription>{note.verseRef}</DialogDescription>
                            </DialogHeader>
                            <Textarea
                              defaultValue={note.note}
                              onChange={(e) => setEditingNote({ verseRef: note.verseRef, note: e.target.value })}
                              rows={4}
                            />
                            <DialogFooter>
                              <Button
                                onClick={() => editingNote && handleSaveNote(editingNote.verseRef, editingNote.note)}
                              >
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Note</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete your note for {note.verseRef}? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveNote(note.verseRef)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <StickyNote className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "No notes match your search." : "Create your first Bible study note!"}
                </p>
                <Button onClick={() => setIsAddNoteOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
