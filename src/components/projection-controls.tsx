"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Eye, EyeOff, Play, Pause, RotateCcw } from "lucide-react"

interface ProjectionControlsProps {
  currentIndex: number
  totalQuestions: number
  isPlaying: boolean
  showAnswer: boolean
  onPrevious: () => void
  onNext: () => void
  onTogglePlay: () => void
  onToggleAnswer: () => void
  onReset: () => void
}

export default function ProjectionControls({
  currentIndex,
  totalQuestions,
  isPlaying,
  showAnswer,
  onPrevious,
  onNext,
  onTogglePlay,
  onToggleAnswer,
  onReset,
}: ProjectionControlsProps) {
  return (
    <Card className="bg-card/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Projection Controls</span>
          <Badge variant="outline">
            {currentIndex + 1} / {totalQuestions}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Navigation Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={totalQuestions <= 1}
            className="flex-1 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={totalQuestions <= 1}
            className="flex-1 bg-transparent"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Playback Controls */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onTogglePlay} className="flex-1 bg-transparent">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause Auto
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Auto Play
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Answer Controls */}
        <Button variant={showAnswer ? "default" : "outline"} size="sm" onClick={onToggleAnswer} className="w-full">
          {showAnswer ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Answer
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Show Answer
            </>
          )}
        </Button>

        {/* Keyboard Shortcuts */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <div className="font-medium">Keyboard Shortcuts:</div>
          <div>← → Navigate questions</div>
          <div>Enter: Toggle answer</div>
          <div>Space: Next question</div>
          <div>Esc: Hide answer</div>
        </div>
      </CardContent>
    </Card>
  )
}
