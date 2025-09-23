const READING_PROGRESS_KEY = "antioch-bible-reading-progress"

export interface ReadingProgress {
  planId: string
  completedDays: number[]
  startDate: string
  lastReadDate?: string
}

export function getReadingProgress(): ReadingProgress[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(READING_PROGRESS_KEY)
    return stored ? JSON.parse(stored) as ReadingProgress[] : []
  } catch {
    return []
  }
}

export function getPlanProgress(planId: string): ReadingProgress | undefined {
  const allProgress = getReadingProgress()
  return allProgress.find((p) => p.planId === planId)
}

export function updatePlanProgress(planId: string, dayNumber: number, completed: boolean): void {
  if (typeof window === "undefined") return

  const allProgress = getReadingProgress()
  let planProgress = allProgress.find((p) => p.planId === planId)

  if (!planProgress) {
    planProgress = {
      planId,
      completedDays: [],
      startDate: new Date().toISOString(),
    }
    allProgress.push(planProgress)
  }

  if (completed) {
    if (!planProgress.completedDays.includes(dayNumber)) {
      planProgress.completedDays.push(dayNumber)
      planProgress.completedDays.sort((a, b) => a - b)
    }
    planProgress.lastReadDate = new Date().toISOString()
  } else {
    planProgress.completedDays = planProgress.completedDays.filter((d) => d !== dayNumber)
  }

  localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(allProgress))
}

export function startPlan(planId: string): void {
  if (typeof window === "undefined") return

  const allProgress = getReadingProgress()
  const existingProgress = allProgress.find((p) => p.planId === planId)

  if (!existingProgress) {
    const newProgress: ReadingProgress = {
      planId,
      completedDays: [],
      startDate: new Date().toISOString(),
    }
    allProgress.push(newProgress)
    localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(allProgress))
  }
}

export function calculateProgress(
  planId: string,
  totalDays: number,
): {
  completedDays: number
  totalDays: number
  percentage: number
  streak: number
  daysRemaining: number
} {
  const progress = getPlanProgress(planId)
  const completedDays = progress?.completedDays.length || 0
  const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0

  // Calculate current streak
  let streak = 0
  if (progress?.completedDays.length) {
    const sortedDays = [...progress.completedDays].sort((a, b) => b - a)
    let expectedDay = sortedDays[0]

    for (const day of sortedDays) {
      if (day === expectedDay) {
        streak++
        expectedDay--
      } else {
        break
      }
    }
  }

  return {
    completedDays,
    totalDays,
    percentage,
    streak,
    daysRemaining: totalDays - completedDays,
  }
}

export function getNextUnreadDay(planId: string): number | null {
  const progress = getPlanProgress(planId)
  if (!progress) return 1

  // Find the first day that hasn't been completed
  for (let day = 1; day <= 365; day++) {
    if (!progress.completedDays.includes(day)) {
      return day
    }
  }

  return null // All days completed
}

// Initialize with some mock progress data
export function initializeMockProgress(): void {
  if (typeof window === "undefined") return

  const existingProgress = getReadingProgress()
  if (existingProgress.length === 0) {
    const mockProgress: ReadingProgress[] = [
      {
        planId: "1",
        completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        lastReadDate: new Date().toISOString(),
      },
      {
        planId: "2",
        completedDays: [1, 2, 3, 4, 5],
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        lastReadDate: new Date().toISOString(),
      },
    ]
    localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(mockProgress))
  }
}
