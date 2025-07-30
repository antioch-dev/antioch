import type { Database } from "./supabase"

type Task = Database["public"]["Tables"]["tasks"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Fellowship = Database["public"]["Tables"]["fellowships"]["Row"]

export const mockUsers: Profile = {
  id: "mock-user-id",
  email: "demo@taskflow.com",
  full_name: "Demo User",
  avatar_url: "https://api.dicebear.com/7.x/initials/svg?seed=DemoUser", 
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}


export const mockFellowships: Fellowship[] = [ 
  {
    id: "fellowship1",
    name: "Grace Fellowship",
    pastor: "Pastor John Doe",
    status: "active", 
    permissions: {
      canCreateEvents: true,
      canManageMembers: true,
      canViewAnalytics: true,
      canEditInfo: true,
    },
    created_at: new Date().toISOString(), 
    updated_at: new Date().toISOString(),
  },
  {
    id: "fellowship2",
    name: "Faith Community",
    pastor: "Pastor Mary Smith",
    status: "active",
    permissions: {
      canCreateEvents: true,
      canManageMembers: false,
      canViewAnalytics: true,
      canEditInfo: true,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fellowship3",
    name: "Hope Group",
    pastor: "Pastor David Lee",
    status: "inactive",
    permissions: {
      canCreateEvents: false,
      canManageMembers: false,
      canViewAnalytics: false,
      canEditInfo: false,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ... rest of your mock-data.ts file (mockProfiles, mockTasks, etc.)
// No changes needed for mockTasks here, as its definition seems correct.
// Extended Profile type for mock data to include fields used in the account page
export type ExtendedProfile = Profile & {
  username: string
  phone?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  accountStatus: "active" | "inactive" | "suspended"
  // Explicitly define user roles to match DashboardLayoutProps
  role: "user" | "admin" | "pastor" | "leader" | "member"
  lastLogin: string
}


export const mockProfiles: ExtendedProfile[] = [
  {
    ...mockUsers, // Spreading the existing mockUser
    username: "demouser",
    phone: "265-111-222-333",
    isEmailVerified: true,
    isPhoneVerified: false,
    accountStatus: "active",
    role: "user", 
    lastLogin: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "user-alpha",
    email: "alpha.dev@taskflow.com",
    full_name: "Alpha Developer",
    avatar_url: "https://api.dicebear.com/7.x/initials/svg?seed=AlphaDev",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    username: "alphadev",
    phone: "265-555-666-777",
    isEmailVerified: true,
    isPhoneVerified: true,
    accountStatus: "active",
    role: "admin", 
    lastLogin: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "user-beta",
    email: "beta.tester@taskflow.com",
    full_name: "Beta Tester",
    avatar_url: null, // No avatar for this user
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    username: "betatester",
    phone: undefined, // No phone number for this user
    isEmailVerified: false,
    isPhoneVerified: false,
    accountStatus: "inactive",
    role: "user", // Ensure this matches one of the DashboardLayoutProps roles
    lastLogin: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
]


export function getUserById(id: string): ExtendedProfile | undefined {
  return mockProfiles.find((profile) => profile.id === id)
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
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), 
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), 
  },
  {
    id: "2",
    title: "Design user interface",
    description:
      "Create mockups and design system for the application including color schemes, typography, and component library",
    status: "in_progress",
    priority: "high",
    due_date: new Date(Date.now() + 172800000).toISOString(), 
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