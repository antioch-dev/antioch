// Mock API functions for Sunday Analytics
import type { AttendanceRecord, MonthlyStats } from "./mock-data"

// Simulate API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Local storage keys
const STORAGE_KEYS = {
  ATTENDANCE_RECORDS: "antioch_attendance_records",
  MONTHLY_STATS: "antioch_monthly_stats",
  LIVE_COUNTER: "antioch_live_counter",
} as const

// Error simulation
const shouldSimulateError = () => Math.random() < 0.05 // 5% chance of error

class MockAPIError extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message)
    this.name = "MockAPIError"
  }
}

// Mock API responses
interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
}

interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Attendance Records API
export const attendanceAPI = {
  // Get all attendance records with optional filtering
  async getRecords(params?: {
    startDate?: string
    endDate?: string
    serviceType?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<AttendanceRecord>> {
    await delay(800) // Simulate network delay

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to fetch attendance records", 500)
    }

    // Get data from localStorage or use default
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE_RECORDS)
    let records: AttendanceRecord[] = stored ? JSON.parse(stored) : []

    // Apply filters
    if (params?.startDate) {
      records = records.filter((r) => r.date >= params.startDate!)
    }
    if (params?.endDate) {
      records = records.filter((r) => r.date <= params.endDate!)
    }
    if (params?.serviceType && params.serviceType !== "all") {
      records = records.filter((r) => r.serviceType === params.serviceType)
    }

    // Sort by date (newest first)
    records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedRecords = records.slice(startIndex, endIndex)

    return {
      data: paginatedRecords,
      success: true,
      pagination: {
        page,
        limit,
        total: records.length,
        totalPages: Math.ceil(records.length / limit),
      },
    }
  },

  // Create new attendance record
  async createRecord(
    record: Omit<AttendanceRecord, "date"> & { date?: string },
  ): Promise<APIResponse<AttendanceRecord>> {
    await delay(500)

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to create attendance record", 500)
    }

    const newRecord: AttendanceRecord = {
      date: record.date || new Date().toISOString().split("T")[0],
      total: record.total,
      adults: record.adults,
      youth: record.youth,
      children: record.children,
      newVisitors: record.newVisitors,
      serviceType: record.serviceType,
    }

    // Get existing records
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE_RECORDS)
    const records: AttendanceRecord[] = stored ? JSON.parse(stored) : []

    // Add new record
    records.push(newRecord)
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE_RECORDS, JSON.stringify(records))

    return {
      data: newRecord,
      success: true,
      message: "Attendance record created successfully",
    }
  },

  // Update existing attendance record
  async updateRecord(date: string, updates: Partial<AttendanceRecord>): Promise<APIResponse<AttendanceRecord>> {
    await delay(500)

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to update attendance record", 500)
    }

    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE_RECORDS)
    const records: AttendanceRecord[] = stored ? JSON.parse(stored) : []

    const recordIndex = records.findIndex((r) => r.date === date)
    if (recordIndex === -1) {
      throw new MockAPIError("Attendance record not found", 404)
    }

    // Update record
    records[recordIndex] = { ...records[recordIndex], ...updates }
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE_RECORDS, JSON.stringify(records))

    return {
      data: records[recordIndex],
      success: true,
      message: "Attendance record updated successfully",
    }
  },

  // Delete attendance record
  async deleteRecord(date: string): Promise<APIResponse<null>> {
    await delay(300)

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to delete attendance record", 500)
    }

    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE_RECORDS)
    const records: AttendanceRecord[] = stored ? JSON.parse(stored) : []

    const filteredRecords = records.filter((r) => r.date !== date)
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE_RECORDS, JSON.stringify(filteredRecords))

    return {
      data: null,
      success: true,
      message: "Attendance record deleted successfully",
    }
  },
}

// Monthly Stats API
export const monthlyStatsAPI = {
  async getStats(year?: number): Promise<APIResponse<MonthlyStats[]>> {
    await delay(600)

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to fetch monthly statistics", 500)
    }

    const stored = localStorage.getItem(STORAGE_KEYS.MONTHLY_STATS)
    let stats: MonthlyStats[] = stored ? JSON.parse(stored) : []

    if (year) {
      stats = stats.filter((s) => new Date(s.month + "-01").getFullYear() === year)
    }

    return {
      data: stats,
      success: true,
    }
  },

  async generateStats(month: string): Promise<APIResponse<MonthlyStats>> {
    await delay(1000) // Longer delay for generation

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to generate monthly statistics", 500)
    }

    // Get attendance records for the month
    const attendanceResponse = await attendanceAPI.getRecords({
      startDate: month + "-01",
      endDate: month + "-31",
      limit: 100,
    })

    const records = attendanceResponse.data
    const totalAttendance = records.reduce((sum, r) => sum + r.total, 0)
    const newVisitors = records.reduce((sum, r) => sum + r.newVisitors, 0)
    const averageWeekly = records.length > 0 ? Math.round(totalAttendance / records.length) : 0

    // Calculate growth rate (mock calculation)
    const growthRate = (Math.random() - 0.5) * 20 // Random growth between -10% and +10%

    const monthlyStats: MonthlyStats = {
      month,
      totalAttendance,
      newVisitors,
      growthRate: Math.round(growthRate * 10) / 10,
      averageWeekly,
    }

    // Store the generated stats
    const stored = localStorage.getItem(STORAGE_KEYS.MONTHLY_STATS)
    const allStats: MonthlyStats[] = stored ? JSON.parse(stored) : []
    const existingIndex = allStats.findIndex((s) => s.month === month)

    if (existingIndex >= 0) {
      allStats[existingIndex] = monthlyStats
    } else {
      allStats.push(monthlyStats)
    }

    localStorage.setItem(STORAGE_KEYS.MONTHLY_STATS, JSON.stringify(allStats))

    return {
      data: monthlyStats,
      success: true,
      message: "Monthly statistics generated successfully",
    }
  },
}

// Live Counter API
export interface LiveCounterState {
  adults: number
  youth: number
  children: number
  lastUpdated: string
  serviceDate: string
}

export const liveCounterAPI = {
  async saveCounter(state: LiveCounterState): Promise<APIResponse<LiveCounterState>> {
    await delay(200) // Quick save

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to save counter state", 500)
    }

    localStorage.setItem(STORAGE_KEYS.LIVE_COUNTER, JSON.stringify(state))

    return {
      data: state,
      success: true,
      message: "Counter saved successfully",
    }
  },

  async loadCounter(serviceDate: string): Promise<APIResponse<LiveCounterState | null>> {
    await delay(300)

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to load counter state", 500)
    }

    const stored = localStorage.getItem(STORAGE_KEYS.LIVE_COUNTER)
    const state: LiveCounterState | null = stored ? JSON.parse(stored) : null

    // Only return state if it's for the same service date
    if (state && state.serviceDate === serviceDate) {
      return {
        data: state,
        success: true,
      }
    }

    return {
      data: null,
      success: true,
    }
  },

  async finalizeCounter(state: LiveCounterState): Promise<APIResponse<AttendanceRecord>> {
    await delay(800)

    if (shouldSimulateError()) {
      throw new MockAPIError("Failed to finalize attendance record", 500)
    }

    // Create attendance record from counter state
    const attendanceRecord: AttendanceRecord = {
      date: state.serviceDate,
      total: state.adults + state.youth + state.children,
      adults: state.adults,
      youth: state.youth,
      children: state.children,
      newVisitors: Math.floor(Math.random() * 15 + 5), // Mock new visitors count
      serviceType: "Morning", // Default service type
    }

    // Save as attendance record
    const response = await attendanceAPI.createRecord(attendanceRecord)

    // Clear the live counter
    localStorage.removeItem(STORAGE_KEYS.LIVE_COUNTER)

    return response
  },
}

// Data initialization
export const initializeMockData = () => {
  // Only initialize if no data exists
  if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE_RECORDS)) {
    // Import and use the default mock data
    import("./mock-data").then(({ mockAttendanceData, mockMonthlyStats }) => {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE_RECORDS, JSON.stringify(mockAttendanceData))
      localStorage.setItem(STORAGE_KEYS.MONTHLY_STATS, JSON.stringify(mockMonthlyStats))
    })
  }
}

// Export utility functions
export { MockAPIError }
export type { APIResponse, PaginatedResponse }
