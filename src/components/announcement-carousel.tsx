'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type AnnouncementType = {
  id: number
  title: string
  description: string
  image: string
}
const announcements: AnnouncementType[] = [
  {
    id: 1,
    title: 'Thursday Prayer Meeting',
    description: 'Join us every Thursday night by 10:30 PM on ZOOM as we wait upon the Lord in prayers for the land!',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    id: 2,
    title: 'Spring Leadership Training',
    description:
      'Our annual Spring Leadership Training is here again! Be a part of what the Lord is doing in this season - stirring up the gifts in leaders',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    id: 3,
    title: 'Summerfest',
    description: 'Our annual Summerfest is here again! Be a part of what the Lord is doing in this season',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    id: 4,
    title: 'Building Fund Update',
    description:
      "We're excited to announce we've reached 75% of our goal for the new children's wing. Thank you for your generous support!",
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    id: 5,
    title: 'New Worship Schedule',
    description:
      "Starting June 1st, we'll be adding a new contemporary service at 11:30 AM in addition to our traditional 9:00 AM service.",
    image: '/placeholder.svg?height=400&width=600',
  },
]

export default function AnnouncementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleAnnouncements, setVisibleAnnouncements] = useState<AnnouncementType[]>([])
  const [itemsToShow, setItemsToShow] = useState(2)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1)
      } else {
        setItemsToShow(2)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const endIndex = currentIndex + itemsToShow
    setVisibleAnnouncements(announcements.slice(currentIndex, endIndex))
  }, [currentIndex, itemsToShow])

  const nextSlide = () => {
    const newIndex = currentIndex + 1
    if (newIndex <= announcements.length - itemsToShow) {
      setCurrentIndex(newIndex)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    const newIndex = currentIndex - 1
    if (newIndex >= 0) {
      setCurrentIndex(newIndex)
    } else {
      setCurrentIndex(announcements.length - itemsToShow)
    }
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(0%)` }}
        >
          {visibleAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="min-w-[calc(100%/2-0.75rem)] flex-1">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={announcement.image ?? '/placeholder.svg'}
                  alt={announcement.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                <p className="text-muted-foreground mb-4">{announcement.description}</p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>

      <div className="flex justify-center mt-6 gap-1">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index >= currentIndex && index < currentIndex + itemsToShow ? 'bg-primary' : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
