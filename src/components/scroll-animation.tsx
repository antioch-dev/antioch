"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "slide-up" | "slide-down"
  delay?: number
  duration?: number
  className?: string
}

export function ScrollAnimation({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-out`

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-8`
        case "fade-down":
          return `${baseClasses} opacity-0 -translate-y-8`
        case "fade-left":
          return `${baseClasses} opacity-0 translate-x-8`
        case "fade-right":
          return `${baseClasses} opacity-0 -translate-x-8`
        case "zoom-in":
          return `${baseClasses} opacity-0 scale-95`
        case "zoom-out":
          return `${baseClasses} opacity-0 scale-105`
        case "slide-up":
          return `${baseClasses} translate-y-full`
        case "slide-down":
          return `${baseClasses} -translate-y-full`
        default:
          return `${baseClasses} opacity-0 translate-y-8`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  )
}
