'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TestimonialsType = {
  id: number
  name: string
  role: string
  image: string
  quote: string
}
const testimonials: TestimonialsType[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Former alumni ICFC',
    image: '/placeholder.svg?height=200&width=200',
    quote:
      'The International Christian Festivals in China has been a blessing to my family. The welcoming atmosphere and powerful messages have strengthened our faith journey in countless ways.',
  },
  {
    id: 2,
    name: 'Michael Thompson',
    role: 'Member of the ICFC Media Team',
    image: '/placeholder.svg?height=200&width=200',
    quote:
      'Serving in the ICFC Media team has been one of the most rewarding experiences of my life. Seeing young people grow in their faith gives me so much hope for the future.',
  },
  {
    id: 3,
    name: 'Rebecca Martinez',
    role: 'New Member',
    image: '/placeholder.svg?height=200&width=200',
    quote:
      'As someone new to the area, I was looking for a spiritual home. From my first Sunday at Wuhan ICF, I felt like I belonged. The fellowship here is truly special.',
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Worship Team Member',
    image: '/placeholder.svg?height=200&width=200',
    quote:
      "Being part of the worship team has deepened my connection with God and allowed me to use my musical gifts to serve others. I'm grateful for this opportunity.",
  },
  {
    id: 5,
    name: 'Jennifer Lee',
    role: 'Small Group Leader',
    image: '/placeholder.svg?height=200&width=200',
    quote:
      "Leading a small group has been transformative for my own spiritual growth. The authentic relationships we've built support each other through life's challenges.",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<TestimonialsType[]>([])
  const [itemsToShow, setItemsToShow] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1)
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2)
      } else {
        setItemsToShow(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const endIndex = currentIndex + itemsToShow
    setVisibleTestimonials(testimonials.slice(currentIndex, endIndex))
  }, [currentIndex, itemsToShow])

  const nextSlide = () => {
    const newIndex = currentIndex + 1
    if (newIndex <= testimonials.length - itemsToShow) {
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
      setCurrentIndex(testimonials.length - itemsToShow)
    }
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(0%)` }}
        >
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="min-w-[calc(100%/3-1rem)] flex-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                  <Image
                    src={testimonial.image || '/placeholder.svg'}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="mb-4 italic">"{testimonial.quote}"</blockquote>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
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
        {testimonials.map((_, index) => (
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
