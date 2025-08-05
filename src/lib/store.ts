import { create } from "zustand"
import { persist } from "zustand/middleware" 
import type { StateCreator } from "zustand" 
import type { Database } from "./supabase"

// Define types from Supabase database schema
type Task = Database["public"]["Tables"]["tasks"]["Row"]
type Profile = Database["public"]["Tables"]["profiles"]["Row"]

// Interface for Team Members
export interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string | null
  role: string
  taskCount: number
  workload: number
  tasksAssigned: number
  tasksCompleted: number
}

// Interface for Recurring Tasks
export interface RecurringTask {
  id: string
  title: string
  description: string
  frequency: "daily" | "weekly" | "biweekly" | "monthly"
  time: string
  isActive: boolean
  nextOccurrence: Date
  category: string
  startDate: Date
}

// Interface for Check-in Entries
export interface CheckinEntry {
  id: string
  date: Date
  type: "daily" | "weekly"
  content: string
  mood: string
  responses: Record<string, string>
}

// Interface for Check-out Entries
export interface CheckoutEntry {
  id: string
  date: Date
  selectedTasks: string[]
  responses: Record<string, string>
  exportFormat: "pdf" | "markdown"
}

// Interface for Long Term Tasks
export interface LongTermTask {
  id: string
  title: string
  description: string
  status: "backlog" | "planning" | "in-progress" | "blocked" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignees: string[]
  dueDate: Date
  tags: string[]
  progress: number
}


interface AppState {
  user: Profile | null
  tasks: Task[]
  selectedTask: Task | null
  sidebarOpen: boolean
  theme: "light" | "dark"

  // Team & Assignments
  teamMembers: TeamMember[]

  // Recurring Tasks
  recurringTasks: RecurringTask[]

  // Check-ins & Check-outs
  checkins: CheckinEntry[]
  checkouts: CheckoutEntry[]

  // Long Term Tasks
  longTermTasks: LongTermTask[]

  // Settings
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
    taskReminders: boolean
    weeklyReports: boolean
  }
  profile: {
    name: string
    email: string
    bio: string
    timezone: string
    language: string
    avatar: string | null
  }

  // Actions - these are functions that modify the state
  setUser: (user: Profile | null) => void
  setTasks: (tasks: Task[]) => void
  setSelectedTask: (task: Task | null) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: "light" | "dark") => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void

  // Team & Assignment Actions
  assignTask: (taskId: string, memberId: string) => void
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void

  // Recurring Task Actions
  addRecurringTask: (task: Omit<RecurringTask, "id">) => void
  updateRecurringTask: (id: string, updates: Partial<RecurringTask>) => void
  toggleRecurringTask: (id: string) => void
  deleteRecurringTask: (id: string) => void

  // Check-in Actions
  addCheckin: (checkin: Omit<CheckinEntry, "id">) => void
  updateCheckin: (id: string, updates: Partial<CheckinEntry>) => void

  // Check-out Actions
  addCheckout: (checkout: Omit<CheckoutEntry, "id">) => void

  // Long Term Task Actions
  addLongTermTask: (task: Omit<LongTermTask, "id">) => void
  updateLongTermTask: (id: string, updates: Partial<LongTermTask>) => void
  moveLongTermTask: (id: string, newStatus: LongTermTask["status"]) => void
  deleteLongTermTask: (id: string) => void

  // Settings Actions
  updateNotifications: (notifications: Partial<AppState["notifications"]>) => void
  updateProfile: (profile: Partial<AppState["profile"]>) => void
}

const initialState: AppState = {
  user: null,
  tasks: [],
  selectedTask: null,
  sidebarOpen: true,
  theme: "dark",
  teamMembers: [
    {
      id: "member-1",
      name: "Alice Johnson",
      email: "alice@company.com",
      avatar: "/placeholder-user.jpg",
      role: "Frontend Developer",
      tasksAssigned: 8,
      tasksCompleted: 6,
      workload: 75,
      taskCount: 8,
    },
    {
      id: "member-2",
      name: "Bob Smith",
      email: "bob@company.com",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer",
      tasksAssigned: 12,
      tasksCompleted: 9,
      workload: 90,
      taskCount: 12,
    },
    {
      id: "member-3",
      name: "Carol Davis",
      email: "carol@company.com",
      avatar: "/placeholder-user.jpg",
      role: "UI/UX Designer",
      tasksAssigned: 6,
      tasksCompleted: 4,
      workload: 60,
      taskCount: 6,
    },
    {
      id: "member-4",
      name: "David Wilson",
      email: "david@company.com",
      avatar: "/placeholder-user.jpg",
      role: "Product Manager",
      tasksAssigned: 10,
      tasksCompleted: 7,
      workload: 80,
      taskCount: 10,
    },
  ],
  recurringTasks: [
    {
      id: "recurring-1",
      title: "Daily Standup Meeting",
      description: "Team sync meeting every morning",
      frequency: "daily",
      time: "09:00",
      isActive: true,
      nextOccurrence: new Date(Date.now() + 86400000), // Tomorrow
      category: "Meeting",
      startDate: new Date(),
    },
    {
      id: "recurring-2",
      title: "Weekly Code Review",
      description: "Review pull requests and code quality",
      frequency: "weekly",
      time: "14:00",
      isActive: true,
      nextOccurrence: new Date(Date.now() + 7 * 86400000), // Next week
      category: "Development",
      startDate: new Date(),
    },
  ],
  checkins: [
    {
      id: "checkin-1",
      date: new Date(Date.now() - 86400000), 
      type: "daily",
      content: "Great progress on authentication module",
      mood: "Productive",
      responses: {},
    },
  ],
  checkouts: [],
  longTermTasks: [
    {
      id: "long-1",
      title: "Mobile App Development",
      description: "Develop cross-platform mobile application with React Native",
      status: "in-progress",
      priority: "high",
      assignees: ["Alice Johnson", "Bob Smith"],
      dueDate: new Date(Date.now() + 30 * 86400000),
      tags: ["Mobile", "React Native", "Frontend"],
      progress: 65,
    },
    {
      id: "long-2",
      title: "API Integration Overhaul",
      description: "Refactor and optimize all API endpoints for better performance",
      status: "planning",
      priority: "medium",
      assignees: ["Carol Davis"],
      dueDate: new Date(Date.now() + 15 * 86400000),
      tags: ["Backend", "API", "Performance"],
      progress: 20,
    },
  ],
  notifications: {
    email: true,
    push: false,
    desktop: true,
    taskReminders: true,
    weeklyReports: false,
  },
  profile: {
    name: "John Doe",
    email: "john.doe@company.com",
    bio: "Product Manager passionate about building great user experiences.",
    timezone: "UTC-8",
    language: "en",
    avatar: "/placeholder-user.jpg",
  },

  setUser: () => {},
  setTasks: () => {},
  setSelectedTask: () => {},
  setSidebarOpen: () => {},
  setTheme: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  assignTask: () => {},
  updateTeamMember: () => {},
  addRecurringTask: () => {},
  updateRecurringTask: () => {},
  toggleRecurringTask: () => {},
  deleteRecurringTask: () => {},
  addCheckin: () => {},
  updateCheckin: () => {},
  addCheckout: () => {},
  addLongTermTask: () => {},
  updateLongTermTask: () => {},
  moveLongTermTask: () => {},
  deleteLongTermTask: () => {},
  updateNotifications: () => {},
  updateProfile: () => {},
};


export const useStore = create<AppState>()(
  persist(
    (set:any, get:any) => ({ 
      ...initialState, 

      // Basic Actions
      setUser: (user: Profile | null) => set({ user }),
      setTasks: (tasks: Task[]) => set({ tasks }),
      setSelectedTask: (selectedTask: Task | null) => set({ selectedTask }),
      setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
      setTheme: (theme: "light" | "dark") => set({ theme }),
      addTask: (task: Task) => set((state:any) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id: string, updates: Partial<Task>) =>
        set((state:any) => ({
          tasks: state.tasks.map((task:any) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      deleteTask: (id: string) =>
        set((state:any) => ({
          tasks: state.tasks.filter((task:any) => task.id !== id),
        })),

      // Team & Assignment Actions
      assignTask: (taskId: string, memberId: string) => {
        const member = get().teamMembers.find((m:any) => m.id === memberId)
        if (member) {
          set((state:any) => ({
            tasks: state.tasks.map((task:any) => (task.id === taskId ? { ...task, assignee_id: memberId } : task)),
            teamMembers: state.teamMembers.map((m:any) =>
              m.id === memberId ? { ...m, taskCount: m.taskCount + 1, tasksAssigned: m.tasksAssigned + 1 } : m,
            ),
          }))
        }
      },
      updateTeamMember: (id: string, updates: Partial<TeamMember>) =>
        set((state:any) => ({
          teamMembers: state.teamMembers.map((member:any) => (member.id === id ? { ...member, ...updates } : member)),
        })),

      // Recurring Task Actions
      addRecurringTask: (task: Omit<RecurringTask, "id">) =>
        set((state:any) => ({
          recurringTasks: [...state.recurringTasks, { ...task, id: `recurring-${Date.now()}` }],
        })),
      updateRecurringTask: (id: string, updates: Partial<RecurringTask>) =>
        set((state:any) => ({
          recurringTasks: state.recurringTasks.map((task:any) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      toggleRecurringTask: (id: string) =>
        set((state:any) => ({
          recurringTasks: state.recurringTasks.map((task:any) =>
            task.id === id ? { ...task, isActive: !task.isActive } : task,
          ),
        })),
      deleteRecurringTask: (id: string) =>
        set((state:any) => ({
          recurringTasks: state.recurringTasks.filter((task:any) => task.id !== id),
        })),

      // Check-in Actions
      addCheckin: (checkin: Omit<CheckinEntry, "id">) =>
        set((state:any) => ({
          checkins: [...state.checkins, { ...checkin, id: `checkin-${Date.now()}` }],
        })),
      updateCheckin: (id: string, updates: Partial<CheckinEntry>) =>
        set((state:any) => ({
          checkins: state.checkins.map((checkin:any) => (checkin.id === id ? { ...checkin, ...updates } : checkin)),
        })),

      // Check-out Actions
      addCheckout: (checkout: Omit<CheckoutEntry, "id">) =>
        set((state:any) => ({
          checkouts: [...state.checkouts, { ...checkout, id: `checkout-${Date.now()}` }],
        })),

      // Long Term Task Actions
      addLongTermTask: (task: Omit<LongTermTask, "id">) =>
        set((state:any) => ({
          longTermTasks: [...state.longTermTasks, { ...task, id: `long-${Date.now()}` }],
        })),
      updateLongTermTask: (id: string, updates: Partial<LongTermTask>) =>
        set((state:any) => ({
          longTermTasks: state.longTermTasks.map((task:any) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      moveLongTermTask: (id: string, newStatus: LongTermTask["status"]) =>
        set((state:any) => ({
          longTermTasks: state.longTermTasks.map((task:any) => (task.id === id ? { ...task, status: newStatus } : task)),
        })),
      deleteLongTermTask: (id: string) =>
        set((state:any) => ({
          longTermTasks: state.longTermTasks.filter((task:any) => task.id !== id),
        })),

      // Settings Actions
      updateNotifications: (notifications: Partial<AppState["notifications"]>) =>
        set((state:any) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
      updateProfile: (profile: Partial<AppState["profile"]>) =>
        set((state:any) => ({
          profile: { ...state.profile, ...profile },
        })),
    }),
    {
      name: "task-management-storage", 
    },
  ),
)
