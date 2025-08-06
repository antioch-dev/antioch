import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { StateCreator } from "zustand"
import type { Database } from "./supabase"

// Define types from Supabase database schema
export type Task = Database["public"]["Tables"]["tasks"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

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

export interface SettingsProfile {
  name: string
  email: string
  bio: string
  timezone: string
  language: string
  avatar: string | null
}

// New: Exported Notifications type for use in components
export interface Notifications {
  email: boolean
  push: boolean
  desktop: boolean
  taskReminders: boolean
  weeklyReports: boolean
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
  notifications: Notifications
  profile: SettingsProfile

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
  updateNotifications: (notifications: Partial<Notifications>) => void
  updateProfile: (profile: Partial<SettingsProfile>) => void
}

const initialState: Omit<AppState, keyof AppState> & Omit<AppState, keyof Omit<AppState, "user" | "tasks" | "selectedTask" | "sidebarOpen" | "theme" | "teamMembers" | "recurringTasks" | "checkins" | "checkouts" | "longTermTasks" | "notifications" | "profile" | "setUser" | "setTasks" | "setSelectedTask" | "setSidebarOpen" | "setTheme" | "addTask" | "updateTask" | "deleteTask" | "assignTask" | "updateTeamMember" | "addRecurringTask" | "updateRecurringTask" | "toggleRecurringTask" | "deleteRecurringTask" | "addCheckin" | "updateCheckin" | "addCheckout" | "addLongTermTask" | "updateLongTermTask" | "moveLongTermTask" | "deleteLongTermTask" | "updateNotifications" | "updateProfile">> = {
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
      nextOccurrence: new Date(Date.now() + 86400000),
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
      nextOccurrence: new Date(Date.now() + 7 * 86400000),
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
} as unknown as AppState;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user: Profile | null) => set({ user }),
      setTasks: (tasks: Task[]) => set({ tasks }),
      setSelectedTask: (selectedTask: Task | null) => set({ selectedTask }),
      setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
      setTheme: (theme: "light" | "dark") => set({ theme }),
      addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id: string, updates: Partial<Task>) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // Team & Assignment Actions
      assignTask: (taskId: string, memberId: string) => {
        const member = get().teamMembers.find((m) => m.id === memberId)
        if (member) {
          set((state) => ({
            tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, assignee_id: memberId } : task)),
            teamMembers: state.teamMembers.map((m) =>
              m.id === memberId ? { ...m, taskCount: m.taskCount + 1, tasksAssigned: m.tasksAssigned + 1 } : m,
            ),
          }))
        }
      },
      updateTeamMember: (id: string, updates: Partial<TeamMember>) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((member) => (member.id === id ? { ...member, ...updates } : member)),
        })),

      // Recurring Task Actions
      addRecurringTask: (task: Omit<RecurringTask, "id">) =>
        set((state) => ({
          recurringTasks: [...state.recurringTasks, { ...task, id: `recurring-${Date.now()}` }],
        })),
      updateRecurringTask: (id: string, updates: Partial<RecurringTask>) =>
        set((state) => ({
          recurringTasks: state.recurringTasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      toggleRecurringTask: (id: string) =>
        set((state) => ({
          recurringTasks: state.recurringTasks.map((task) =>
            task.id === id ? { ...task, isActive: !task.isActive } : task,
          ),
        })),
      deleteRecurringTask: (id: string) =>
        set((state) => ({
          recurringTasks: state.recurringTasks.filter((task) => task.id !== id),
        })),

      // Check-in Actions
      addCheckin: (checkin: Omit<CheckinEntry, "id">) =>
        set((state) => ({
          checkins: [...state.checkins, { ...checkin, id: `checkin-${Date.now()}` }],
        })),
      updateCheckin: (id: string, updates: Partial<CheckinEntry>) =>
        set((state) => ({
          checkins: state.checkins.map((checkin) => (checkin.id === id ? { ...checkin, ...updates } : checkin)),
        })),

      // Check-out Actions
      addCheckout: (checkout: Omit<CheckoutEntry, "id">) =>
        set((state) => ({
          checkouts: [...state.checkouts, { ...checkout, id: `checkout-${Date.now()}` }],
        })),

      // Long Term Task Actions
      addLongTermTask: (task: Omit<LongTermTask, "id">) =>
        set((state) => ({
          longTermTasks: [...state.longTermTasks, { ...task, id: `long-${Date.now()}` }],
        })),
      updateLongTermTask: (id: string, updates: Partial<LongTermTask>) =>
        set((state) => ({
          longTermTasks: state.longTermTasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      moveLongTermTask: (id: string, newStatus: LongTermTask["status"]) =>
        set((state) => ({
          longTermTasks: state.longTermTasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)),
        })),
      deleteLongTermTask: (id: string) =>
        set((state) => ({
          longTermTasks: state.longTermTasks.filter((task) => task.id !== id),
        })),

      // Settings Actions
      updateNotifications: (notifications: Partial<Notifications>) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
      updateProfile: (profile: Partial<SettingsProfile>) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
    }),
    {
      name: "task-management-storage",
    },
  ),
)

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "pastor" | "leader" | "member"
  fellowshipId?: string
  joinDate: string
  avatar?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  username: string
  accountStatus: "active" | "suspended" | "pending_verification"
  lastLogin: string
  permissions: {
    canManageFellowships: boolean
    canManageUsers: boolean
    canViewAnalytics: boolean
    canManagePermissions: boolean
  }
  bio?: string
}

export interface Fellowship {
  id: string
  name: string
  description: string
  location: {
    address: string
    city: string
    state: string
    zipCode: string
    coordinates?: { lat: number; lng: number }
  }
  memberCount: number
  pastor: string
  established: string
  status: "active" | "inactive" | "banned" | "pending"
  image?: string
  contactEmail: string
  contactPhone: string
  website?: string
  adminIds: string[]
  applicationStatus: "approved" | "pending" | "rejected"
  applicationDate: string
  permissions: {
    canCreateEvents: boolean
    canManageMembers: boolean
    canViewAnalytics: boolean
    canEditInfo: boolean
  }
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  fellowshipId: string
  attendees: number
  maxAttendees?: number
  type: "service" | "bible-study" | "fellowship" | "outreach" | "prayer"
}

export interface FellowshipApplication {
  id: string
  applicantName: string
  fellowshipId: string
  fellowshipName: string
  pastorName: string
  email: string
  phone: string
  address: string
  description: string
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  notes?: string
}

export const mockFellowships: Fellowship[] = [
  {
    id: "fellowship-1",
    name: "Grace Community Fellowship",
    description: "A vibrant community focused on worship, fellowship, and service",
    location: {
      address: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      coordinates: { lat: 39.7817, lng: -89.6501 },
    },
    memberCount: 150,
    pastor: "Pastor John Smith",
    established: "2018",
    status: "active",
    contactEmail: "info@gracecommunity.org",
    contactPhone: "(555) 123-4567",
    website: "https://gracecommunity.org",
    adminIds: ["user-2", "user-6"],
    applicationStatus: "approved",
    applicationDate: "2018-01-15",
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: true,
      canEditInfo: true,
    },
  },
  {
    id: "fellowship-2",
    name: "Hope Baptist Fellowship",
    description: "Traditional Baptist fellowship with strong community roots",
    location: {
      address: "456 Oak Avenue",
      city: "Springfield",
      state: "IL",
      zipCode: "62702",
    },
    memberCount: 89,
    pastor: "Pastor Mary Johnson",
    established: "2015",
    status: "active",
    contactEmail: "contact@hopebaptist.org",
    contactPhone: "(555) 234-5678",
    adminIds: ["user-3"],
    applicationStatus: "approved",
    applicationDate: "2015-06-10",
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: false,
      canEditInfo: true,
    },
  },
  {
    id: "fellowship-3",
    name: "New Life Assembly",
    description: "Contemporary worship and dynamic youth programs",
    location: {
      address: "789 Pine Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62703",
    },
    memberCount: 203,
    pastor: "Pastor David Wilson",
    established: "2020",
    status: "active",
    contactEmail: "hello@newlifeassembly.org",
    contactPhone: "(555) 345-6789",
    website: "https://newlifeassembly.org",
    adminIds: ["user-4"],
    applicationStatus: "approved",
    applicationDate: "2020-03-01",
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: true,
      canEditInfo: true,
    },
  },
  {
    id: "fellowship-4",
    name: "Unity Methodist Fellowship",
    description: "Methodist fellowship emphasizing social justice and community service",
    location: {
      address: "321 Elm Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
    },
    memberCount: 67,
    pastor: "Pastor Sarah Brown",
    established: "2019",
    status: "banned",
    contactEmail: "info@unitymethodist.org",
    contactPhone: "(555) 456-7890",
    adminIds: ["user-5"],
    applicationStatus: "approved",
    applicationDate: "2019-08-15",
    permissions: {
      canCreateEvents: false,
      canManageMembers: false,
      canViewAnalytics: false,
      canEditInfo: false,
    },
  },
  {
    id: "fellowship-5",
    name: "Riverside Community Church",
    description: "A growing community church focused on family ministry and community outreach",
    location: {
      address: "555 River Road",
      city: "Springfield",
      state: "IL",
      zipCode: "62705",
    },
    memberCount: 0,
    pastor: "Pastor James Wilson",
    established: "2022",
    status: "active",
    contactEmail: "james@riverside.org",
    contactPhone: "(555) 567-8901",
    adminIds: [],
    applicationStatus: "pending",
    applicationDate: "2022-01-01",
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: true,
      canEditInfo: true,
    },
  },
  {
    id: "fellowship-6",
    name: "Mountain View Fellowship",
    description: "Contemporary worship with emphasis on youth and young adult ministry",
    location: {
      address: "777 Hill Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62706",
    },
    memberCount: 0,
    pastor: "Pastor Lisa Chen",
    established: "2021",
    status: "active",
    contactEmail: "lisa@mountainview.org",
    contactPhone: "(555) 678-9012",
    adminIds: [],
    applicationStatus: "pending",
    applicationDate: "2021-01-01",
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: true,
      canEditInfo: true,
    },
  },
  {
    id: "fellowship-7",
    name: "Faith Community Center",
    description: "Multi-cultural fellowship serving diverse community needs",
    location: {
      address: "999 Faith Avenue",
      city: "Springfield",
      state: "IL",
      zipCode: "62707",
    },
    memberCount: 0,
    pastor: "Pastor Robert Davis",
    established: "2020",
    status: "active",
    contactEmail: "robert@faithcenter.org",
    contactPhone: "(555) 789-0123",
    adminIds: [],
    applicationStatus: "approved",
    applicationDate: "2020-01-01",
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: true,
      canEditInfo: true,
    },
  },
];

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alice Cooper",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    role: "member",
    fellowshipId: "fellowship-1",
    joinDate: "2023-01-15",
    isEmailVerified: true,
    isPhoneVerified: false,
    username: "alice_cooper",
    accountStatus: "active",
    lastLogin: "2024-01-10T10:30:00Z",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManagePermissions: false,
    },
    bio: "Passionate about community service and outreach."
  },
  {
    id: "user-2",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    role: "leader",
    fellowshipId: "fellowship-1",
    joinDate: "2022-06-10",
    isEmailVerified: true,
    isPhoneVerified: true,
    username: "bob_johnson",
    accountStatus: "active",
    lastLogin: "2024-01-11T14:20:00Z",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: true,
      canManagePermissions: false,
    },
    bio: "Leads the youth ministry and loves teaching."
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@platform.com",
    phone: "+1 (555) 999-0000",
    role: "admin",
    joinDate: "2021-01-01",
    isEmailVerified: true,
    isPhoneVerified: true,
    username: "platform_admin",
    accountStatus: "active",
    lastLogin: "2024-01-11T16:45:00Z",
    permissions: {
      canManageFellowships: true,
      canManageUsers: true,
      canViewAnalytics: true,
      canManagePermissions: true,
    },
    bio: "Platform administrator with full access."
  },
  {
    id: "user-3",
    name: "Emma Thompson",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    role: "pastor",
    fellowshipId: "fellowship-2",
    joinDate: "2022-03-15",
    isEmailVerified: true,
    isPhoneVerified: true,
    username: "emma_thompson",
    accountStatus: "active",
    lastLogin: "2024-01-10T09:15:00Z",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: true,
      canManagePermissions: false,
    },
    bio: "Head pastor of Hope Baptist Fellowship."
  },
  {
    id: "user-4",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "member",
    fellowshipId: "fellowship-3",
    joinDate: "2023-07-20",
    isEmailVerified: false,
    isPhoneVerified: false,
    username: "michael_brown",
    accountStatus: "pending_verification",
    lastLogin: "2024-01-09T18:30:00Z",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManagePermissions: false,
    },
    bio: "New member, eager to get involved."
  },
];

export const mockFellowshipApplications: FellowshipApplication[] = [
  {
    id: "app-1",
    applicantName: "John Doe",
    fellowshipId: "fellowship-5",
    fellowshipName: "Riverside Community Church",
    pastorName: "Pastor James Wilson",
    email: "james@riverside.org",
    phone: "(555) 567-8901",
    address: "555 River Road, Springfield, IL 62705",
    description: "A growing community church focused on family ministry and community outreach",
    status: "pending",
    submittedDate: "2024-01-05",
  },
  {
    id: "app-2",
    applicantName: "Jane Smith",
    fellowshipId: "fellowship-6",
    fellowshipName: "Mountain View Fellowship",
    pastorName: "Pastor Lisa Chen",
    email: "lisa@mountainview.org",
    phone: "(555) 678-9012",
    address: "777 Hill Street, Springfield, IL 62706",
    description: "Contemporary worship with emphasis on youth and young adult ministry",
    status: "pending",
    submittedDate: "2024-01-08",
  },
  {
    id: "app-3",
    applicantName: "Peter Jones",
    fellowshipId: "fellowship-7",
    fellowshipName: "Faith Community Center",
    pastorName: "Pastor Robert Davis",
    email: "robert@faithcenter.org",
    phone: "(555) 789-0123",
    address: "999 Faith Avenue, Springfield, IL 62707",
    description: "Multi-cultural fellowship serving diverse community needs",
    status: "approved",
    submittedDate: "2023-12-15",
    reviewedDate: "2023-12-20",
    reviewedBy: "admin-1",
    notes: "Excellent application with strong community references",
  },
];

export const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Sunday Morning Service",
    description: "Weekly worship service with communion",
    date: "2024-01-07",
    time: "10:00 AM",
    location: "Main Sanctuary",
    fellowshipId: "fellowship-1",
    attendees: 120,
    maxAttendees: 150,
    type: "service",
  },
  {
    id: "event-2",
    title: "Wednesday Bible Study",
    description: "Study of the Book of Romans",
    date: "2024-01-10",
    time: "7:00 PM",
    location: "Fellowship Hall",
    fellowshipId: "fellowship-1",
    attendees: 45,
    maxAttendees: 60,
    type: "bible-study",
  },
  {
    id: "event-3",
    title: "Youth Fellowship Night",
    description: "Games, worship, and fellowship for teens",
    date: "2024-01-12",
    time: "6:30 PM",
    location: "Youth Center",
    fellowshipId: "fellowship-1",
    attendees: 28,
    maxAttendees: 40,
    type: "fellowship",
  },
];

export const getFellowshipById = (id: string): Fellowship | undefined => {
  return mockFellowships.find((f) => f.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((u) => u.id === id);
};

export const getEventsByFellowshipId = (fellowshipId: string): Event[] => {
  return mockEvents.filter((e) => e.fellowshipId === fellowshipId);
};

export const getApprovedFellowshipApplications = (fellowshipId: string): FellowshipApplication[] => {
  return mockFellowshipApplications.filter(
    (app) => app.fellowshipId === fellowshipId && app.status === "approved"
  );
};

export const approveFellowshipApplication = (id: string, notes = "", reviewedBy = "admin-1") => {
  const application = mockFellowshipApplications.find((app) => app.id === id);
  if (application) {
    application.status = "approved";
    application.reviewedDate = new Date().toISOString().split('T')[0];
    application.notes = notes;
    application.reviewedBy = reviewedBy;
  }
};

export const rejectFellowshipApplication = (id: string, notes = "", reviewedBy = "admin-1") => {
  const application = mockFellowshipApplications.find((app) => app.id === id);
  if (application) {
    application.status = "rejected";
    application.reviewedDate = new Date().toISOString().split('T')[0];
    application.notes = notes;
    application.reviewedBy = reviewedBy;
  }
};

export const getFellowshipApplications = () => {
  return mockFellowshipApplications;
};

export const getPendingApplications = () => {
  return mockFellowshipApplications.filter((app) => app.status === "pending");
};

export const getFellowshipStats = (fellowshipId: string) => {
  const fellowship = getFellowshipById(fellowshipId);
  const events = getEventsByFellowshipId(fellowshipId);

  return {
    totalMembers: fellowship?.memberCount || 0,
    activeEvents: events.length,
    avgAttendance: events.reduce((acc, e) => acc + e.attendees, 0) / events.length || 0,
    upcomingEvents: events.filter((e) => new Date(e.date) > new Date()).length,
  };
};

export function updateUser(id: string, updatedFields: Partial<User>): User | undefined {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex > -1) {
    const userToUpdate: User = mockUsers[userIndex]!;
    Object.assign(userToUpdate, updatedFields);
    userToUpdate.lastLogin = new Date().toISOString();
    return userToUpdate;
  }
  return undefined;
}

export function deleteUser(id: string): boolean {
  const initialLength = mockUsers.length;
  const newMockUsers = mockUsers.filter(user => user.id !== id);
  mockUsers.splice(0, mockUsers.length, ...newMockUsers);
  return mockUsers.length < initialLength;
}


export type TaskStatus = "not_started" | "in_progress" | "completed" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "urgent";