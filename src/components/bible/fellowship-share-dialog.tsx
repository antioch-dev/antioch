"use client"

import { useState } from "react"
import { Users, Heart, BookOpen, Calendar, Mic, Zap, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import { useToast } from "@/hooks/use-toast"
import { shareDestinations, fellowships, shareVerse, type ShareDestination } from "@/lib/fellowship-data"

interface FellowshipShareDialogProps {
  isOpen: boolean
  onClose: () => void
  verseRef: string
  verseText: string
}

const iconMap = {
  Users,
  Heart,
  BookOpen,
  Calendar,
  Mic,
  Zap,
}

export function FellowshipShareDialog({ isOpen, onClose, verseRef, verseText }: FellowshipShareDialogProps) {
  const [selectedDestination, setSelectedDestination] = useState<ShareDestination | null>(null)
  const [note, setNote] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const { toast } = useToast()

  const handleShare = async () => {
    if (!selectedDestination) return

    setIsSharing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      shareVerse(verseRef, verseText, selectedDestination.id, note.trim() || undefined)

      toast({
        title: "Verse shared successfully!",
        description: `Shared ${verseRef} to ${selectedDestination.title}`,
      })

      // Reset form
      setSelectedDestination(null)
      setNote("")
      onClose()
    } catch {
      toast({
        title: "Error sharing verse",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const getDestinationIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || Users
    return Icon
  }

  const getFellowshipName = (fellowshipId?: string) => {
    if (!fellowshipId) return null
    const fellowship = fellowships.find((f) => f.id === fellowshipId)
    return fellowship?.name
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Verse with Fellowship</DialogTitle>
          <DialogDescription>Share `{verseRef} with your fellowship community</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Verse Preview */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Badge variant="outline">{verseRef}</Badge>
                <blockquote className="text-sm italic leading-relaxed">`{verseText}`</blockquote>
              </div>
            </CardContent>
          </Card>

          {/* Share Destinations */}
          <div className="space-y-3">
            <h4 className="font-medium">Choose where to share:</h4>
            <div className="grid gap-3">
              {shareDestinations.map((destination) => {
                const Icon = getDestinationIcon(destination.icon)
                const fellowshipName = getFellowshipName(destination.fellowshipId)
                const isSelected = selectedDestination?.id === destination.id

                return (
                  <Card
                    key={destination.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedDestination(destination)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium">{destination.title}</h5>
                            {fellowshipName && (
                              <Badge variant="secondary" className="text-xs">
                                {fellowshipName}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{destination.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Optional Note */}
          {selectedDestination && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Add a note (optional)
                {selectedDestination.type === "prayer" && (
                  <span className="text-muted-foreground"> - Share your prayer request or encouragement</span>
                )}
              </label>
              <Textarea
                placeholder={
                  selectedDestination.type === "prayer"
                    ? "Share your prayer request or how this verse encourages you..."
                    : selectedDestination.type === "discussion"
                      ? "Add context or discussion points..."
                      : "Share why this verse is meaningful to you..."
                }
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSharing}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={!selectedDestination || isSharing}>
            {isSharing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Sharing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Share Verse
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
