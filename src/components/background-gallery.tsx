"use client"

import { useEffect, useState } from "react"

interface BackgroundGalleryProps {
  images: string[]
  interval?: number
}

export function BackgroundGallery({ images, interval = 5000 }: BackgroundGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex)
        setNextImageIndex((nextImageIndex + 1) % images.length)
        setIsTransitioning(false)
      }, 1000) // Transition duration
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval, nextImageIndex])

  if (images.length === 0) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Current image with zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out zoom-effect"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          opacity: isTransitioning ? 0 : 1,
        }}
      />

      {/* Very light overlay with minimal blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20" />
    </div>
  )
}
