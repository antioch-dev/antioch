
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "pastor" | "leader" | "member" | "super_admin" | "tenure_manager" | "department_head"
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
  personId?: string
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


export interface Tenure {
  id: string
  title: string
  startDate: string // ISO date string
  endDate: string // ISO date string
  status: "active" | "past" | "upcoming"
  fellowshipId: string
  createdAt: string
  updatedAt: string
}

export interface Position {
  id: string
  name: string
  description: string
  departmentId: string | null // null for standalone positions
  isActive: boolean
  fellowshipId: string
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  name: string
  description: string
  fellowshipId: string
  createdAt: string
  updatedAt: string
}

export interface Person {
  id: string
  name: string
  email: string
  phone: string
  fellowshipId: string
  bio: string
  photoUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  tenureId: string
  positionId: string
  personId: string
  status: "pending" | "accepted" | "declined" | "revoked"
  inviteLink: string
  inviteToken: string
  appointedBy: string // admin user id
  appointedAt: string
  respondedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Permission {
  id: string
  role: "super_admin" | "tenure_manager" | "department_head"
  actions: string[]
  fellowshipId: string
  userId: string
  createdAt: string
  updatedAt: string
}

// Extended types for UI
export interface AppointmentWithDetails extends Appointment {
  tenure: Tenure
  position: Position
  person: Person
  department?: Department
}

export interface PositionWithDepartment extends Position {
  department?: Department
}

export interface TenureStats {
  totalTenures: number
  activeTenures: number
  totalPositions: number
  totalAppointments: number
  pendingAppointments: number
}

export interface DepartmentMember {
  departmentId: string
  personId: string
  role: "leader" | "member"
  joinedAt: string
}


export interface DepartmentWithMembers extends Department {
  members: (DepartmentMember & { person: Person })[]
  positionCount: number
  leaderCount: number
}

export interface PersonWithDepartments extends Person {
  departments: (DepartmentMember & { department: Department })[]
  currentAppointments: AppointmentWithDetails[]
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
]

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
    bio: "Passionate about community service and outreach.",
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
    bio: "Leads the youth ministry and loves teaching.",
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
    bio: "Platform administrator with full access.",
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
    bio: "Head pastor of Hope Baptist Fellowship.",
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
    bio: "New member, eager to get involved.",
  },
  {
    id: "admin_1",
    name: "Pastor Johnson",
    email: "pastor@antiochfellowship.org",
    role: "super_admin",
    personId: "person_1",
    joinDate: "",
    isEmailVerified: false,
    isPhoneVerified: false,
    username: "",
    accountStatus: "active",
    lastLogin: "",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManagePermissions: false
    }
  },
  {
    id: "admin_2",
    name: "Elder Smith",
    email: "elder.smith@antiochfellowship.org",
    role: "tenure_manager",
    personId: "person_2",
    joinDate: "",
    isEmailVerified: false,
    isPhoneVerified: false,
    username: "",
    accountStatus: "active",
    lastLogin: "",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManagePermissions: false
    }
  },
  {
    id: "admin_3",
    name: "Deacon Brown",
    email: "deacon.brown@antiochfellowship.org",
    role: "department_head",
    personId: "person_5",
    joinDate: "",
    isEmailVerified: false,
    isPhoneVerified: false,
    username: "",
    accountStatus: "active",
    lastLogin: "",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManagePermissions: false
    }
  },
  {
    id: "user_1",
    name: "Michael Davis",
    email: "michael.davis@email.com",
    role: "member",
    personId: "person_3",
    joinDate: "",
    isEmailVerified: false,
    isPhoneVerified: false,
    username: "",
    accountStatus: "active",
    lastLogin: "",
    permissions: {
      canManageFellowships: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canManagePermissions: false
    }
  },
]

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
]

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
]

export const getFellowshipById = (id: string): Fellowship | undefined => {
  return mockFellowships.find((f) => f.id === id)
}

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((u) => u.id === id)
}

export const getEventsByFellowshipId = (fellowshipId: string): Event[] => {
  return mockEvents.filter((e) => e.fellowshipId === fellowshipId)
}

export const getApprovedFellowshipApplications = (fellowshipId: string): FellowshipApplication[] => {
  return mockFellowshipApplications.filter((app) => app.fellowshipId === fellowshipId && app.status === "approved")
}

export const approveFellowshipApplication = (id: string, notes = "", reviewedBy = "admin-1") => {
  const application = mockFellowshipApplications.find((app) => app.id === id)
  if (application) {
    application.status = "approved"
    application.reviewedDate = new Date().toISOString().split("T")[0]
    application.notes = notes
    application.reviewedBy = reviewedBy
  }
}

export const rejectFellowshipApplication = (id: string, notes = "", reviewedBy = "admin-1") => {
  const application = mockFellowshipApplications.find((app) => app.id === id)
  if (application) {
    application.status = "rejected"
    application.reviewedDate = new Date().toISOString().split("T")[0]
    application.notes = notes
    application.reviewedBy = reviewedBy
  }
}

export const getFellowshipApplications = () => {
  return mockFellowshipApplications
}

export const getPendingApplications = () => {
  return mockFellowshipApplications.filter((app) => app.status === "pending")
}

export const getFellowshipStats = (fellowshipId: string) => {
  const fellowship = getFellowshipById(fellowshipId)
  const events = getEventsByFellowshipId(fellowshipId)

  return {
    totalMembers: fellowship?.memberCount || 0,
    activeEvents: events.length,
    avgAttendance: events.reduce((acc, e) => acc + e.attendees, 0) / events.length || 0,
    upcomingEvents: events.filter((e) => new Date(e.date) > new Date()).length,
  }
}

export function updateUser(id: string, updatedFields: Partial<User>): User | undefined {
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex > -1) {
    const userToUpdate: User = mockUsers[userIndex]!
    Object.assign(userToUpdate, updatedFields)
    userToUpdate.lastLogin = new Date().toISOString()
    return userToUpdate
  }
  return undefined
}

export function deleteUser(id: string): boolean {
  const initialLength = mockUsers.length
  const newMockUsers = mockUsers.filter((user) => user.id !== id)
  mockUsers.splice(0, mockUsers.length, ...newMockUsers)
  return mockUsers.length < initialLength
}
import type { Database } from "./supabase"

// Define the RecurrencePattern types based on your mock data
export type RecurrencePattern =
  | { type: "weekly"; day: string; time: string }
  | { type: "daily"; time: string }
  | { type: "monthly"; day: number; time: string }
  | { type: "yearly"; date: string; time: string }

// Update the Task type to use the new RecurrencePattern
type Task = Omit<Database["public"]["Tables"]["tasks"]["Row"], "recurrence_pattern"> & {
  recurrence_pattern: RecurrencePattern | null
}
type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export const mockUser: Profile = {
  id: "mock-user-id",
  email: "demo@taskflow.com",
  full_name: "Demo User",
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Setup project structure",
    description: "Initialize the Next.js project with required dependencies and configure the development environment",
    status: "completed",
    priority: "high",
    due_date: null,
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "general",
    tags: ["setup", "development", "infrastructure"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 0,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "Design user interface",
    description:
      "Create mockups and design system for the application including color schemes, typography, and component library",
    status: "in_progress",
    priority: "high",
    due_date: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "general",
    tags: ["design", "ui", "mockups"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 1,
    created_at: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    updated_at: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
  },
  {
    id: "3",
    title: "Implement authentication system",
    description: "Set up user authentication with email/password, social login options, and secure session management",
    status: "not_started",
    priority: "medium",
    due_date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "general",
    tags: ["auth", "backend", "security"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 2,
    created_at: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: "4",
    title: "Create task management system",
    description: "Build comprehensive CRUD operations for tasks with filtering, sorting, and search capabilities",
    status: "not_started",
    priority: "high",
    due_date: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "assignment",
    tags: ["tasks", "crud", "features"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 3,
    created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    updated_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "5",
    title: "Weekly team standup",
    description: "Regular team sync meeting to discuss progress, blockers, and upcoming priorities",
    status: "not_started",
    priority: "medium",
    due_date: new Date(Date.now() + 604800000).toISOString(), // 1 week from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "recurring",
    tags: ["meeting", "team", "sync"],
    is_recurring: true,
    recurrence_pattern: { type: "weekly", day: "monday", time: "09:00" },
    parent_task_id: null,
    position: 4,
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "6",
    title: "Platform architecture review",
    description:
      "Comprehensive review of platform architecture for scalability, performance, and maintainability improvements",
    status: "blocked",
    priority: "low",
    due_date: null,
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "long_term",
    tags: ["architecture", "planning", "scalability"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Mobile app development",
    description: "Develop React Native mobile application with core task management features",
    status: "not_started",
    priority: "medium",
    due_date: new Date(Date.now() + 1209600000).toISOString(), // 2 weeks from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "long_term",
    tags: ["mobile", "react-native", "development"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 6,
    created_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    updated_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "8",
    title: "Database optimization",
    description: "Optimize database queries and implement caching strategies for better performance",
    status: "in_progress",
    priority: "urgent",
    due_date: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "assignment",
    tags: ["database", "performance", "optimization"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 7,
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "9",
    title: "Daily code review",
    description: "Review pull requests and provide feedback to team members",
    status: "completed",
    priority: "medium",
    due_date: null,
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "recurring",
    tags: ["code-review", "quality", "team"],
    is_recurring: true,
    recurrence_pattern: { type: "daily", time: "14:00" },
    parent_task_id: null,
    position: 8,
    created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    updated_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "10",
    title: "User testing and feedback collection",
    description: "Conduct user testing sessions and collect feedback for product improvements",
    status: "not_started",
    priority: "high",
    due_date: new Date(Date.now() + 518400000).toISOString(), // 6 days from now
    assignee_id: null,
    created_by: "mock-user-id",
    team_id: "mock-team-id",
    category: "general",
    tags: ["testing", "feedback", "ux"],
    is_recurring: false,
    recurrence_pattern: null,
    parent_task_id: null,
    position: 9,
    created_at: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    updated_at: new Date(Date.now() - 900000).toISOString(),
  },
]

export const mockTeamMembers = [
  {
    id: "member-1",
    name: "Alice Johnson",
    email: "alice@taskflow.com",
    avatar: null,
    role: "Frontend Developer",
    taskCount: 3,
  },
  {
    id: "member-2",
    name: "Bob Smith",
    email: "bob@taskflow.com",
    avatar: null,
    role: "Backend Developer",
    taskCount: 2,
  },
  {
    id: "member-3",
    name: "Carol Davis",
    email: "carol@taskflow.com",
    avatar: null,
    role: "UI/UX Designer",
    taskCount: 4,
  },
  {
    id: "member-4",
    name: "David Wilson",
    email: "david@taskflow.com",
    avatar: null,
    role: "Product Manager",
    taskCount: 1,
  },
]

export const mockCheckins = [
  {
    id: "checkin-1",
    user_id: "mock-user-id",
    content: "Started working on the authentication system. Made good progress on the login form and validation logic.",
    type: "daily" as const,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "checkin-2",
    user_id: "mock-user-id",
    content: "Completed the UI design mockups for the dashboard. Ready for development phase.",
    type: "daily" as const,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "checkin-3",
    user_id: "mock-user-id",
    content: "Weekly review: Great progress on the core features. Team collaboration is excellent.",
    type: "weekly" as const,
    created_at: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
  },
]

export const mockCheckouts = [
  {
    id: "checkout-1",
    user_id: "mock-user-id",
    content:
      "Wrapped up the day with successful implementation of task filtering. Tomorrow will focus on the search functionality.",
    task_ids: ["2", "4"],
    type: "daily" as const,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "checkout-2",
    user_id: "mock-user-id",
    content: "Good productive day. Completed the design system and started on component implementation.",
    task_ids: ["1", "2"],
    type: "daily" as const,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
]
export interface PrayerRequest {
  id: string
  name: string
  fellowship: string
  contact?: string
  category: "Healing" | "Guidance" | "Thanksgiving" | "Other"
  text: string
  isPrivate: boolean
  status: "Pending" | "In Progress" | "Completed"
  dateSubmitted: string
  fileUrl?: string
}

export interface PrayerMeeting {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "General Fellowship Prayer" | "Ministry-specific Prayer" | "Special Event Prayer"
  link?: string
  description: string
  attendees: { id: string; name: string; email: string }[]
}

export interface PrayerAssignment {
  id: string
  requestId: string
  assignedMember: string
  status: "Pending" | "Completed"
  notes?: string
  dateAssigned: string
  dateCompleted?: string
}

export interface MinistryAssignment {
  id: string
  ministryName: string
  members: string[]
  description: string
  rotationSchedule?: string
}

// Mock Prayer Requests
export const mockPrayerRequests: PrayerRequest[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    fellowship: "Sample Fellowship",
    contact: "sarah.j@email.com",
    category: "Healing",
    text: "Please pray for my mother who is recovering from surgery. She needs strength and healing during this difficult time.",
    isPrivate: false,
    status: "Pending",
    dateSubmitted: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Michael Chen",
    fellowship: "Sample Fellowship",
    category: "Guidance",
    text: "Seeking guidance and wisdom for a major career decision. Pray that God would open the right doors.",
    isPrivate: false,
    status: "In Progress",
    dateSubmitted: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    name: "Anonymous",
    fellowship: "Sample Fellowship",
    category: "Guidance",
    text: "Marriage is going through a difficult season. Please pray for reconciliation and healing.",
    isPrivate: true,
    status: "Completed",
    dateSubmitted: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    name: "David Martinez",
    fellowship: "Sample Fellowship",
    contact: "david.m@email.com",
    category: "Thanksgiving",
    text: "Starting a new youth outreach program. Pray for wisdom, resources, and the right team members.",
    isPrivate: false,
    status: "Completed",
    dateSubmitted: "2024-01-10T16:45:00Z",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    fellowship: "Sample Fellowship",
    category: "Guidance",
    text: "Feeling distant from God lately. Please pray for renewed passion and deeper relationship with Him.",
    isPrivate: false,
    status: "In Progress",
    dateSubmitted: "2024-01-12T11:30:00Z",
  },
]

// Mock Prayer Meetings
export const mockPrayerMeetings: PrayerMeeting[] = [
  {
    id: "1",
    title: "Weekly Fellowship Prayer",
    date: "2024-01-20",
    time: "19:00",
    location: "Fellowship Hall",
    type: "General Fellowship Prayer",
    description: "Our weekly gathering to pray for our community, nation, and world. All are welcome.",
    attendees: [
      { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com" },
      { id: "2", name: "Michael Chen", email: "michael.c@email.com" },
      { id: "3", name: "David Martinez", email: "david.m@email.com" },
      { id: "4", name: "Lisa Thompson", email: "lisa.t@email.com" },
      { id: "5", name: "Pastor James", email: "pastor.james@fellowship.com" },
    ],
  },
  {
    id: "2",
    title: "Youth Ministry Prayer",
    date: "2024-01-22",
    time: "18:30",
    location: "Youth Room",
    type: "Ministry-specific Prayer",
    description: "Focused prayer time for our youth ministry, upcoming events, and young people in our community.",
    attendees: [
      { id: "3", name: "David Martinez", email: "david.m@email.com" },
      { id: "6", name: "Youth Pastor Mark", email: "mark.y@fellowship.com" },
    ],
  },
  {
    id: "3",
    title: "Healing Prayer Service",
    date: "2024-01-25",
    time: "20:00",
    location: "Online - Zoom",
    type: "Special Event Prayer",
    link: "https://zoom.us/j/123456789",
    description:
      "Special prayer service focused on healing and restoration. Join us online for this powerful time of prayer.",
    attendees: [
      { id: "5", name: "Pastor James", email: "pastor.james@fellowship.com" },
      { id: "7", name: "Elder Mary", email: "mary.e@fellowship.com" },
    ],
  },
  {
    id: "4",
    title: "Early Morning Prayer",
    date: "2024-01-27",
    time: "06:00",
    location: "Sanctuary",
    type: "General Fellowship Prayer",
    description: "Start your day with prayer. Coffee and light breakfast provided.",
    attendees: [{ id: "8", name: "Early Birds Group", email: "earlybirds@fellowship.com" }],
  },
]

// Mock Prayer Assignments
export const mockPrayerAssignments: PrayerAssignment[] = [
  {
    id: "1",
    requestId: "1",
    assignedMember: "Pastor James",
    status: "Completed",
    notes: "Visited Sarah's mother in the hospital. Prayed with the family. Surgery went well!",
    dateAssigned: "2024-01-15T11:00:00Z",
    dateCompleted: "2024-01-16T15:30:00Z",
  },
  {
    id: "2",
    requestId: "2",
    assignedMember: "Elder Mary",
    status: "Pending",
    dateAssigned: "2024-01-14T15:00:00Z",
  },
  {
    id: "3",
    requestId: "3",
    assignedMember: "Counselor Tom",
    status: "Completed",
    notes: "Had a counseling session and prayer time. Couple is working through their issues with professional help.",
    dateAssigned: "2024-01-13T10:00:00Z",
    dateCompleted: "2024-01-14T14:00:00Z",
  },
  {
    id: "4",
    requestId: "5",
    assignedMember: "Mentor Susan",
    status: "Pending",
    dateAssigned: "2024-01-12T12:00:00Z",
  },
]

// Mock Ministry Assignments
export const mockMinistryAssignments: MinistryAssignment[] = [
  {
    id: "1",
    ministryName: "Worship Team",
    members: ["Sarah Johnson", "Michael Chen", "Grace Wilson"],
    description: "Pray for worship services, sound equipment, and team unity",
    rotationSchedule: "Monthly",
  },
  {
    id: "2",
    ministryName: "Youth Ministry",
    members: ["David Martinez", "Lisa Thompson", "Youth Pastor Mark"],
    description: "Cover youth events, camps, and individual young people in prayer",
    rotationSchedule: "Bi-weekly",
  },
  {
    id: "3",
    ministryName: "Outreach Ministry",
    members: ["Elder Mary", "Outreach Team", "Community Volunteers"],
    description: "Pray for community events, evangelism efforts, and local partnerships",
    rotationSchedule: "Weekly",
  },
  {
    id: "4",
    ministryName: "Children's Ministry",
    members: ["Teacher Anna", "Helper Bob", "Parent Volunteers"],
    description: "Pray for children's safety, spiritual growth, and family ministries",
    rotationSchedule: "Monthly",
  },
  {
    id: "5",
    ministryName: "Pastoral Care",
    members: ["Pastor James", "Counselor Tom", "Deacon Team"],
    description: "Pray for those in crisis, hospital visits, and pastoral counseling",
    rotationSchedule: "As needed",
  },
]

// Mock User List
export const NewUsers = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com" },
  { id: "2", name: "Michael Chen", email: "michael.c@email.com" },
  { id: "3", name: "David Martinez", email: "david.m@email.com" },
  { id: "4", name: "Lisa Thompson", email: "lisa.t@email.com" },
  { id: "5", name: "Pastor James", email: "pastor.james@fellowship.com" },
  { id: "6", name: "Youth Pastor Mark", email: "mark.y@fellowship.com" },
  { id: "7", name: "Elder Mary", email: "mary.e@fellowship.com" },
  { id: "8", name: "Counselor Tom", email: "tom.c@fellowship.com" },
  { id: "9", name: "Mentor Susan", email: "susan.m@fellowship.com" },
  { id: "10", name: "Deacon John", email: "john.d@fellowship.com" },
]

// Helper functions
export const getPrayerRequestById = (id: string): PrayerRequest | undefined => {
  return mockPrayerRequests.find((request) => request.id === id)
}

export const getPrayerMeetingById = (id: string): PrayerMeeting | undefined => {
  return mockPrayerMeetings.find((meeting) => meeting.id === id)
}

export const getAssignmentsByRequestId = (requestId: string): PrayerAssignment[] => {
  return mockPrayerAssignments.filter((assignment) => assignment.requestId === requestId)
}

export const getAssignmentsByMember = (member: string): PrayerAssignment[] => {
  return mockPrayerAssignments.filter((assignment) => assignment.assignedMember === member)
}


// qa system mock data
export interface Topic {
  id: string
  title: string
  description: string
  status: "open" | "closed"
  answerSetting: "allow_all" | "require_review" | "not_allowed"
  questionsCount: number
  answersCount: number
  pinnedAnswersCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  topicId: string
  text: string
  author?: string
  fellowship?: string
  status: "pending" | "approved" | "answered"
  votes: number
  isDisplayed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Answer {
  id: string
  questionId: string
  text: string
  author?: string
  status: "pending" | "approved" | "rejected"
  isPinned: boolean
  isChurchOfficial: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Stats {
  totalQuestions: number
  totalAnswers: number
  displayedQuestions: number
  pendingQuestions: number
  answeredQuestions: number
}

// Mock Topics Data
export const mockTopics: Topic[] = [
  {
    id: "1",
    title: "Sunday Service Q&A",
    description: "Questions and answers from today's Sunday service message",
    status: "open",
    answerSetting: "require_review",
    questionsCount: 12,
    answersCount: 8,
    pinnedAnswersCount: 3,
    createdAt: new Date("2024-01-15T09:00:00Z"),
    updatedAt: new Date("2024-01-15T11:30:00Z"),
  },
  {
    id: "2",
    title: "Bible Study Discussion",
    description: "Questions from our weekly Bible study on Romans 8",
    status: "open",
    answerSetting: "allow_all",
    questionsCount: 7,
    answersCount: 15,
    pinnedAnswersCount: 2,
    createdAt: new Date("2024-01-10T19:00:00Z"),
    updatedAt: new Date("2024-01-10T21:00:00Z"),
  },
  {
    id: "3",
    title: "Youth Ministry Q&A",
    description: "Questions from our youth about faith and life",
    status: "closed",
    answerSetting: "require_review",
    questionsCount: 5,
    answersCount: 5,
    pinnedAnswersCount: 5,
    createdAt: new Date("2024-01-08T18:00:00Z"),
    updatedAt: new Date("2024-01-08T20:00:00Z"),
  },
]

// Mock Questions Data
export const mockQuestions: Question[] = [
  {
    id: "1",
    topicId: "1",
    text: 'How can we practically apply the concept of "walking in the Spirit" in our daily lives?',
    author: "Sarah M.",
    fellowship: "Young Adults",
    status: "approved",
    votes: 8,
    isDisplayed: false,
    createdAt: new Date("2024-01-15T09:15:00Z"),
    updatedAt: new Date("2024-01-15T09:15:00Z"),
  },
  {
    id: "2",
    topicId: "1",
    text: 'What does it mean to be "more than conquerors" in Romans 8:37?',
    author: "Michael T.",
    fellowship: "Men's Ministry",
    status: "answered",
    votes: 12,
    isDisplayed: true,
    createdAt: new Date("2024-01-15T09:30:00Z"),
    updatedAt: new Date("2024-01-15T10:45:00Z"),
  },
  {
    id: "3",
    topicId: "1",
    text: "How do we know if we're truly led by the Spirit versus our own desires?",
    author: "Jennifer L.",
    fellowship: "Women's Ministry",
    status: "approved",
    votes: 15,
    isDisplayed: false,
    createdAt: new Date("2024-01-15T09:45:00Z"),
    updatedAt: new Date("2024-01-15T09:45:00Z"),
  },
  {
    id: "4",
    topicId: "1",
    text: "Can you explain the difference between condemnation and conviction?",
    status: "pending",
    votes: 3,
    isDisplayed: false,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: "5",
    topicId: "2",
    text: 'In Romans 8:28, does "all things work together for good" mean bad things won\'t happen to Christians?',
    author: "David K.",
    fellowship: "Bible Study Group",
    status: "answered",
    votes: 9,
    isDisplayed: false,
    createdAt: new Date("2024-01-10T19:15:00Z"),
    updatedAt: new Date("2024-01-10T20:30:00Z"),
  },
]

// Mock Answers Data
export const mockAnswers: Answer[] = [
  {
    id: "1",
    questionId: "2",
    text: "Being \"more than conquerors\" means that through Christ's love, we don't just barely survive life's challenges - we triumph over them. It's not about avoiding difficulties, but about having victory through them because nothing can separate us from God's love.",
    author: "Pastor Johnson",
    status: "approved",
    isPinned: true,
    isChurchOfficial: true,
    createdAt: new Date("2024-01-15T10:45:00Z"),
    updatedAt: new Date("2024-01-15T10:45:00Z"),
  },
  {
    id: "2",
    questionId: "2",
    text: "I think it means we have the ultimate victory because Christ has already won the battle against sin and death. We're on the winning team!",
    author: "Lisa R.",
    status: "approved",
    isPinned: false,
    isChurchOfficial: false,
    createdAt: new Date("2024-01-15T11:00:00Z"),
    updatedAt: new Date("2024-01-15T11:00:00Z"),
  },
  {
    id: "3",
    questionId: "5",
    text: "Romans 8:28 doesn't promise that bad things won't happen, but that God can work even through difficult circumstances for our ultimate good and His glory. It's about God's sovereignty and His ability to bring purpose from pain.",
    author: "Pastor Johnson",
    status: "approved",
    isPinned: true,
    isChurchOfficial: true,
    createdAt: new Date("2024-01-10T20:30:00Z"),
    updatedAt: new Date("2024-01-10T20:30:00Z"),
  },
]

// Mock Stats Data
export const mockStats: Stats = {
  totalQuestions: 24,
  totalAnswers: 28,
  displayedQuestions: 1,
  pendingQuestions: 3,
  answeredQuestions: 8,
}

// Utility functions for mock data
export const getTopicById = (id: string): Topic | undefined => {
  return mockTopics.find((topic) => topic.id === id)
}

export const getQuestionsByTopicId = (topicId: string): Question[] => {
  return mockQuestions.filter((question) => question.topicId === topicId)
}

export const getAnswersByQuestionId = (questionId: string): Answer[] => {
  return mockAnswers.filter((answer) => answer.questionId === questionId)
}

export const getQuestionById = (id: string): Question | undefined => {
  return mockQuestions.find((question) => question.id === id)
}

export const MOCK_FELLOWSHIP_ID = "fellowship_123"

export const mockTenures: Tenure[] = [
  {
    id: "tenure_1",
    title: "2024 Leadership Tenure",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-11-15T10:00:00Z",
    updatedAt: "2023-11-15T10:00:00Z",
  },
  {
    id: "tenure_2",
    title: "2023 Leadership Tenure",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "past",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2022-11-15T10:00:00Z",
    updatedAt: "2022-11-15T10:00:00Z",
  },
  {
    id: "tenure_3",
    title: "2025 Leadership Tenure",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "upcoming",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-15T10:00:00Z",
  },
]

export const mockDepartments: Department[] = [
  {
    id: "dept_1",
    name: "Music Ministry",
    description: "Worship and music coordination",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "dept_2",
    name: "Children Ministry",
    description: "Children and youth programs",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "dept_3",
    name: "Media Ministry",
    description: "Audio, video, and digital content",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "dept_4",
    name: "Outreach Ministry",
    description: "Community outreach and evangelism",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
]

export const mockPositions: Position[] = [
  // Standalone positions
  {
    id: "pos_1",
    name: "President",
    description: "Overall leadership and vision",
    departmentId: null,
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "pos_2",
    name: "Secretary",
    description: "Record keeping and documentation",
    departmentId: null,
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "pos_3",
    name: "Treasurer",
    description: "Financial management and oversight",
    departmentId: null,
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  // Department-linked positions
  {
    id: "pos_4",
    name: "Music Ministry Leader",
    description: "Lead worship and music programs",
    departmentId: "dept_1",
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "pos_5",
    name: "Children Ministry Leader",
    description: "Oversee children and youth activities",
    departmentId: "dept_2",
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "pos_6",
    name: "Media Ministry Leader",
    description: "Manage audio/video and digital content",
    departmentId: "dept_3",
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "pos_7",
    name: "Outreach Ministry Leader",
    description: "Lead community outreach efforts",
    departmentId: "dept_4",
    isActive: true,
    fellowshipId: MOCK_FELLOWSHIP_ID,
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
]

export const mockPersons: Person[] = [
  {
    id: "person_1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0101",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Passionate about church leadership and community building. Has served in various leadership roles for over 8 years.",
    photoUrl: "/professional-man-headshot.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_2",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0102",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Experienced in financial management and church administration. CPA with 12 years of nonprofit experience.",
    photoUrl: "/professional-woman-headshot.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_3",
    name: "Michael Davis",
    email: "michael.davis@email.com",
    phone: "+1-555-0103",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Music director with 10+ years of worship leading experience. Skilled in piano, guitar, and vocal coaching.",
    photoUrl: "/professional-headshot-man-musician.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_4",
    name: "Emily Wilson",
    email: "emily.wilson@email.com",
    phone: "+1-555-0104",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Children ministry coordinator and early childhood educator. Passionate about nurturing young hearts for Christ.",
    photoUrl: "/professional-headshot-woman-teacher.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_5",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1-555-0105",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Media specialist with expertise in audio/video production. Professional broadcast engineer with creative vision.",
    photoUrl: "/professional-headshot-man-tech.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_6",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1-555-0106",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Community outreach coordinator with heart for evangelism. Former missionary with global ministry experience.",
    photoUrl: "/professional-headshot-woman-community.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_7",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+1-555-0107",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Assistant worship leader and sound technician. Brings technical expertise to enhance worship experience.",
    photoUrl: "/professional-man-headshot.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_8",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@email.com",
    phone: "+1-555-0108",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Children's Sunday school teacher and youth mentor. Dedicated to discipleship and spiritual growth.",
    photoUrl: "/professional-woman-headshot.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_9",
    name: "Christopher Lee",
    email: "christopher.lee@email.com",
    phone: "+1-555-0109",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Video production specialist and live streaming coordinator. Helps extend our reach through digital ministry.",
    photoUrl: "/professional-headshot-man-tech.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_10",
    name: "Amanda Garcia",
    email: "amanda.garcia@email.com",
    phone: "+1-555-0110",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Community volunteer coordinator and event organizer. Passionate about connecting with local neighborhoods.",
    photoUrl: "/professional-headshot-woman-community.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_11",
    name: "James Thompson",
    email: "james.thompson@email.com",
    phone: "+1-555-0111",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "Administrative assistant and meeting coordinator. Ensures smooth operations and effective communication.",
    photoUrl: "/professional-man-headshot.png",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "person_12",
    name: "Rachel White",
    email: "rachel.white@email.com",
    phone: "+1-555-0112",
    fellowshipId: MOCK_FELLOWSHIP_ID,
    bio: "New member interested in serving. Recently completed leadership training program.",
    photoUrl: "/professional-woman-headshot.png",
    createdAt: "2024-11-01T10:00:00Z",
    updatedAt: "2024-11-01T10:00:00Z",
  },
]

export const mockAppointments: Appointment[] = [
  // Current tenure appointments (2024)
  {
    id: "appt_1",
    tenureId: "tenure_1",
    positionId: "pos_1",
    personId: "person_1",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_abc123",
    inviteToken: "token_abc123",
    appointedBy: "admin_1",
    appointedAt: "2023-12-01T10:00:00Z",
    respondedAt: "2023-12-02T14:30:00Z",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-02T14:30:00Z",
  },
  {
    id: "appt_2",
    tenureId: "tenure_1",
    positionId: "pos_2",
    personId: "person_11",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_sec789",
    inviteToken: "token_sec789",
    appointedBy: "admin_1",
    appointedAt: "2023-12-01T10:00:00Z",
    respondedAt: "2023-12-02T11:20:00Z",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-02T11:20:00Z",
  },
  {
    id: "appt_3",
    tenureId: "tenure_1",
    positionId: "pos_3",
    personId: "person_2",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_def456",
    inviteToken: "token_def456",
    appointedBy: "admin_1",
    appointedAt: "2023-12-01T10:00:00Z",
    respondedAt: "2023-12-03T09:15:00Z",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-03T09:15:00Z",
  },
  {
    id: "appt_4",
    tenureId: "tenure_1",
    positionId: "pos_4",
    personId: "person_3",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_ghi789",
    inviteToken: "token_ghi789",
    appointedBy: "admin_1",
    appointedAt: "2023-12-01T10:00:00Z",
    respondedAt: "2023-12-01T16:45:00Z",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-01T16:45:00Z",
  },
  {
    id: "appt_5",
    tenureId: "tenure_1",
    positionId: "pos_5",
    personId: "person_4",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_jkl012",
    inviteToken: "token_jkl012",
    appointedBy: "admin_1",
    appointedAt: "2023-12-05T10:00:00Z",
    respondedAt: "2023-12-06T14:20:00Z",
    createdAt: "2023-12-05T10:00:00Z",
    updatedAt: "2023-12-06T14:20:00Z",
  },
  {
    id: "appt_6",
    tenureId: "tenure_1",
    positionId: "pos_6",
    personId: "person_5",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_mno345",
    inviteToken: "token_mno345",
    appointedBy: "admin_1",
    appointedAt: "2023-12-05T10:00:00Z",
    respondedAt: "2023-12-05T18:30:00Z",
    createdAt: "2023-12-05T10:00:00Z",
    updatedAt: "2023-12-05T18:30:00Z",
  },
  {
    id: "appt_7",
    tenureId: "tenure_1",
    positionId: "pos_7",
    personId: "person_6",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_pqr678",
    inviteToken: "token_pqr678",
    appointedBy: "admin_1",
    appointedAt: "2023-12-05T10:00:00Z",
    respondedAt: "2023-12-07T10:15:00Z",
    createdAt: "2023-12-05T10:00:00Z",
    updatedAt: "2023-12-07T10:15:00Z",
  },
  // Pending appointments for 2025 tenure
  {
    id: "appt_8",
    tenureId: "tenure_3",
    positionId: "pos_1",
    personId: "person_1",
    status: "pending",
    inviteLink: "/fellowship_123/leadership/invite/token_2025_pres",
    inviteToken: "token_2025_pres",
    appointedBy: "admin_1",
    appointedAt: "2024-11-15T10:00:00Z",
    respondedAt: null,
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-15T10:00:00Z",
  },
  {
    id: "appt_9",
    tenureId: "tenure_3",
    positionId: "pos_4",
    personId: "person_12",
    status: "pending",
    inviteLink: "/fellowship_123/leadership/invite/token_2025_music",
    inviteToken: "token_2025_music",
    appointedBy: "admin_1",
    appointedAt: "2024-11-20T10:00:00Z",
    respondedAt: null,
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-11-20T10:00:00Z",
  },
  // Declined appointment example
  {
    id: "appt_10",
    tenureId: "tenure_1",
    positionId: "pos_2",
    personId: "person_7",
    status: "declined",
    inviteLink: "/fellowship_123/leadership/invite/token_declined_sec",
    inviteToken: "token_declined_sec",
    appointedBy: "admin_1",
    appointedAt: "2023-11-20T10:00:00Z",
    respondedAt: "2023-11-22T15:45:00Z",
    createdAt: "2023-11-20T10:00:00Z",
    updatedAt: "2023-11-22T15:45:00Z",
  },
  // Past tenure appointments for history
  {
    id: "appt_11",
    tenureId: "tenure_2",
    positionId: "pos_1",
    personId: "person_2",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_2023_pres",
    inviteToken: "token_2023_pres",
    appointedBy: "admin_1",
    appointedAt: "2022-12-01T10:00:00Z",
    respondedAt: "2022-12-02T14:30:00Z",
    createdAt: "2022-12-01T10:00:00Z",
    updatedAt: "2022-12-02T14:30:00Z",
  },
  {
    id: "appt_12",
    tenureId: "tenure_2",
    positionId: "pos_4",
    personId: "person_3",
    status: "accepted",
    inviteLink: "/fellowship_123/leadership/invite/token_2023_music",
    inviteToken: "token_2023_music",
    appointedBy: "admin_1",
    appointedAt: "2022-12-01T10:00:00Z",
    respondedAt: "2022-12-01T16:45:00Z",
    createdAt: "2022-12-01T10:00:00Z",
    updatedAt: "2022-12-01T16:45:00Z",
  },
]

export const mockDepartmentMembers: DepartmentMember[] = [
  // Music Ministry Members
  { departmentId: "dept_1", personId: "person_3", role: "leader", joinedAt: "2023-01-01T10:00:00Z" },
  { departmentId: "dept_1", personId: "person_7", role: "member", joinedAt: "2023-06-15T10:00:00Z" },
  { departmentId: "dept_1", personId: "person_12", role: "member", joinedAt: "2024-09-01T10:00:00Z" },

  // Children Ministry Members
  { departmentId: "dept_2", personId: "person_4", role: "leader", joinedAt: "2023-01-01T10:00:00Z" },
  { departmentId: "dept_2", personId: "person_8", role: "member", joinedAt: "2023-03-20T10:00:00Z" },

  // Media Ministry Members
  { departmentId: "dept_3", personId: "person_5", role: "leader", joinedAt: "2023-01-01T10:00:00Z" },
  { departmentId: "dept_3", personId: "person_9", role: "member", joinedAt: "2023-08-10T10:00:00Z" },

  // Outreach Ministry Members
  { departmentId: "dept_4", personId: "person_6", role: "leader", joinedAt: "2023-01-01T10:00:00Z" },
  { departmentId: "dept_4", personId: "person_10", role: "member", joinedAt: "2023-05-12T10:00:00Z" },
]


export const mockPermissions: Permission[] = [
  {
    id: "perm_1",
    role: "super_admin",
    actions: [
      "create_tenure",
      "edit_tenure",
      "delete_tenure",
      "manage_positions",
      "manage_appointments",
      "manage_permissions",
    ],
    fellowshipId: MOCK_FELLOWSHIP_ID,
    userId: "admin_1",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "perm_2",
    role: "tenure_manager",
    actions: ["create_tenure", "edit_tenure", "manage_appointments"],
    fellowshipId: MOCK_FELLOWSHIP_ID,
    userId: "admin_2",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "perm_3",
    role: "department_head",
    actions: ["view_appointments", "manage_department_positions"],
    fellowshipId: MOCK_FELLOWSHIP_ID,
    userId: "admin_3",
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
]
// Mock data for Sunday Analytics
export interface AttendanceRecord {
  date: string
  total: number
  adults: number
  youth: number
  children: number
  online: number
  newVisitors: number
  serviceType: "Morning" | "Evening" | "Special Service"
}

export interface MonthlyStats {
  month: string
  totalAttendance: number
  newVisitors: number
  growthRate: number
  averageWeekly: number
}

// Generate mock attendance data for the last 6 months
export const generateMockAttendanceData = (): AttendanceRecord[] => {
  const data: AttendanceRecord[] = []
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 6)

  // Generate data for each Sunday
  for (let i = 0; i < 26; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i * 7)

    // Skip if not Sunday
    if (currentDate.getDay() !== 0) continue

    const baseAttendance = 200 + Math.random() * 100
    const adults = Math.floor(baseAttendance * 0.6 + Math.random() * 20)
    const youth = Math.floor(baseAttendance * 0.25 + Math.random() * 15)
    const children = Math.floor(baseAttendance * 0.15 + Math.random() * 10)
    const online = Math.floor(Math.random() * 60 + 20)
    const total = adults + youth + children + online
    const newVisitors = Math.floor(Math.random() * 20 + 5)

    const serviceType = i % 8 === 0 ? "Special Service" : i % 4 === 0 ? "Evening" : "Morning"

    data.push({
      // FIX for TS2322 (Line 2051): Use non-null assertion for safety, though split[0] is generally safe here.
      date: currentDate.toISOString().split("T")[0]!, 
      total,
      adults,
      youth,
      children,
      online,
      newVisitors,
      serviceType,
    })
  }

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const initializeDefaultData = () => {
  if (typeof window !== "undefined") {

  }
}

export const mockAttendanceData = generateMockAttendanceData()

export const mockMonthlyStats: MonthlyStats[] = [
  {
    month: "2025-03",
    totalAttendance: 1024,
    newVisitors: 45,
    growthRate: 5.2,
    averageWeekly: 256,
  },
  {
    month: "2025-04",
    totalAttendance: 1156,
    newVisitors: 52,
    growthRate: 12.9,
    averageWeekly: 289,
  },
  {
    month: "2025-05",
    totalAttendance: 1089,
    newVisitors: 38,
    growthRate: -5.8,
    averageWeekly: 272,
  },
  {
    month: "2025-06",
    totalAttendance: 1203,
    newVisitors: 61,
    growthRate: 10.5,
    averageWeekly: 301,
  },
  {
    month: "2025-07",
    totalAttendance: 1167,
    newVisitors: 44,
    growthRate: -3.0,
    averageWeekly: 292,
  },
  {
    month: "2025-08",
    totalAttendance: 1245,
    newVisitors: 58,
    growthRate: 6.7,
    averageWeekly: 311,
  },
]

// Helper functions
export const getLatestSundayStats = () => {
  if (mockAttendanceData.length === 0) {
    return {
      date: new Date().toISOString().split("T")[0],
      total: 0,
      adults: 0,
      youth: 0,
      children: 0,
      online: 0,
      newVisitors: 0,
      serviceType: "Morning" as const,
    }
  }
  const latest = mockAttendanceData[mockAttendanceData.length - 1]
  return latest
}

export const getAverageAttendance = () => {
  if (mockAttendanceData.length === 0) return 0
  const total = mockAttendanceData.reduce((sum, record) => sum + record.total, 0)
  return Math.round(total / mockAttendanceData.length)
}

export const getHighestAttendance = () => {
  if (mockAttendanceData.length === 0) {
    return {
      date: new Date().toISOString().split("T")[0],
      total: 0,
      adults: 0,
      youth: 0,
      children: 0,
      online: 0,
      newVisitors: 0,
      serviceType: "Morning" as const,
    }
  }
  
  return mockAttendanceData.reduce(
    (max, record) => (record.total > max.total ? record : max),
    mockAttendanceData[0]!
  )
}

export const getLowestAttendance = () => {
  if (mockAttendanceData.length === 0) {
    return {
      date: new Date().toISOString().split("T")[0],
      total: 0,
      adults: 0,
      youth: 0,
      children: 0,
      online: 0,
      newVisitors: 0,
      serviceType: "Morning" as const,
    }
  }
 
  return mockAttendanceData.reduce(
    (min, record) => (record.total < min.total ? record : min),
    mockAttendanceData[0]!
  )
}

export const getGrowthTrend = (weeks = 4) => {
  if (mockAttendanceData.length < weeks) return 0
  const recent = mockAttendanceData.slice(-weeks)
  const older = mockAttendanceData.slice(-(weeks * 2), -weeks)

  if (older.length === 0) return 0

  const recentAvg = recent.reduce((sum, record) => sum + record.total, 0) / recent.length
  const olderAvg = older.reduce((sum, record) => sum + record.total, 0) / older.length

  return ((recentAvg - olderAvg) / olderAvg) * 100
}

export const getAttendanceByCategory = () => {
  if (mockAttendanceData.length === 0) return { adults: 0, youth: 0, children: 0, online: 0 }

  const totals = mockAttendanceData.reduce(
    (acc, record) => ({
      adults: acc.adults + record.adults,
      youth: acc.youth + record.youth,
      children: acc.children + record.children,
      online: acc.online + record.online,
    }),
    { adults: 0, youth: 0, children: 0, online: 0 },
  )

  return totals
}

export const getRetentionRate = () => {
  // Mock retention calculation
  return Math.round(75 + Math.random() * 20) // 75-95% retention rate
}

export const getEngagementScore = () => {
  // Mock engagement score based on attendance consistency
  return Math.round(80 + Math.random() * 15) // 80-95% engagement
}
 
export interface UserEmailRequest {
  id: string
  userName: string
  fellowshipId: string
  fellowshipName: string
  desiredUsername: string
  status: "pending" | "created" | "rejected" | "revoked"
  reason: string
  createdAt: Date
  updatedAt: Date
  rejectionReason?: string
}

export interface EmailAccount {
  id: string
  userId: string
  fellowshipId: string
  email: string
  status: "pending" | "created" | "rejected" | "revoked"
  loginDetails?: {
    username: string
    password: string
    serverUrl: string
  }
}

export interface EmailNotification {
  id: string
  type: "received" | "sent" | "request" | "approval" | "denial"
  subject: string
  from: string
  to: string
  date: Date
  status: "read" | "unread"
  fellowshipId?: string
}

export interface FellowshipEmail {
  id: string
  fellowshipId: string
  email: string
  status: "active" | "inactive"
  isOfficial: boolean
}

export interface SentEmail {
  id: string
  to: string
  cc?: string
  subject: string
  message: string
  sentAt: Date
  fellowshipId: string
  sentBy: string
}

// Mock data
export const mockUserEmailRequests: UserEmailRequest[] = [
  {
    id: "1",
    userName: "John Smith",
    fellowshipId: "fellowship-1",
    fellowshipName: "Grace Community Fellowship",
    desiredUsername: "john.smith",
    status: "pending",
    reason: "Need official email for youth ministry coordination",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    userName: "Sarah Johnson",
    fellowshipId: "fellowship-2",
    fellowshipName: "Hope Baptist Fellowship",
    desiredUsername: "sarah.johnson",
    status: "created",
    reason: "Official communication with community partners",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    userName: "Michael Brown",
    fellowshipId: "fellowship-1",
    fellowshipName: "Grace Community Fellowship",
    desiredUsername: "mike.brown",
    status: "rejected",
    reason: "Personal use only",
    rejectionReason: "Email requests must be for official ministry purposes",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-09"),
  },
  {
    id: "4",
    userName: "Emily Davis",
    fellowshipId: "fellowship-3",
    fellowshipName: "Faith Community Church",
    desiredUsername: "emily.davis",
    status: "revoked",
    reason: "Worship team coordination",
    rejectionReason: "Account misuse - personal communications",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-20"),
  },
]

export const mockEmailAccounts: EmailAccount[] = [
  {
    id: "1",
    userId: "user-2",
    fellowshipId: "fellowship-2",
    email: "sarah.johnson@mail.antioch.com",
    status: "created",
    loginDetails: {
      username: "sarah.johnson",
      password: "temp123!",
      serverUrl: "mail.antioch.com",
    },
  },
  {
    id: "2",
    userId: "user-4",
    fellowshipId: "fellowship-3",
    email: "emily.davis@mail.antioch.com",
    status: "revoked",
  },
]

export const mockNotifications: EmailNotification[] = [
  {
    id: "1",
    type: "received",
    subject: "Welcome to the Community Outreach Program",
    from: "outreach@mail.antioch.com",
    to: "fellowship-1@mail.antioch.com",
    date: new Date("2024-01-20T10:30:00"),
    status: "unread",
    fellowshipId: "fellowship-1",
  },
  {
    id: "2",
    type: "request",
    subject: "New Email Request from John Smith",
    from: "system@antioch.com",
    to: "admin@fellowship-1",
    date: new Date("2024-01-15T14:20:00"),
    status: "read",
    fellowshipId: "fellowship-1",
  },
  {
    id: "3",
    type: "sent",
    subject: "Youth Ministry Meeting Reminder",
    from: "fellowship-1@mail.antioch.com",
    to: "youth-group@mail.antioch.com",
    date: new Date("2024-01-18T16:45:00"),
    status: "read",
    fellowshipId: "fellowship-1",
  },
]

export const mockFellowshipEmails: FellowshipEmail[] = [
  {
    id: "1",
    fellowshipId: "fellowship-1",
    email: "fellowship-1@mail.antioch.com",
    status: "active",
    isOfficial: true,
  },
  {
    id: "2",
    fellowshipId: "fellowship-2",
    email: "fellowship-2@mail.antioch.com",
    status: "active",
    isOfficial: true,
  },
]

export const mockSentEmails: SentEmail[] = [
  {
    id: "1",
    to: "community@mail.antioch.com",
    cc: "leadership@mail.antioch.com",
    subject: "Monthly Fellowship Update",
    message: "Dear community members, we are excited to share our monthly updates...",
    sentAt: new Date("2024-01-19T09:15:00"),
    fellowshipId: "fellowship-1",
    sentBy: "Pastor Johnson",
  },
  {
    id: "2",
    to: "volunteers@mail.antioch.com",
    subject: "Volunteer Appreciation Event",
    message: "Thank you for your continued service. Join us for our appreciation event...",
    sentAt: new Date("2024-01-17T11:30:00"),
    fellowshipId: "fellowship-1",
    sentBy: "Sarah Wilson",
  },
]

// Helper functions
export const getRequestsByFellowship = (fellowshipId: string) =>
  mockUserEmailRequests.filter((req) => req.fellowshipId === fellowshipId)

export const getNotificationsByFellowship = (fellowshipId: string) =>
  mockNotifications.filter((notif) => notif.fellowshipId === fellowshipId)

export const getSentEmailsByFellowship = (fellowshipId: string) =>
  mockSentEmails.filter((email) => email.fellowshipId === fellowshipId)

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "status-pending"
    case "created":
      return "status-created"
    case "rejected":
      return "status-rejected"
    case "revoked":
      return "status-revoked"
    default:
      return "status-pending"
  }
}
