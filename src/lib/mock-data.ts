export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "pastor" | "leader" | "member";
  fellowshipId?: string;
  joinDate: string;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  username: string;
  accountStatus: "active" | "suspended" | "pending_verification";
  lastLogin: string;
  permissions: {
    canManageFellowships: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
    canManagePermissions: boolean;
  };
  bio?: string;
}

export interface Fellowship {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  memberCount: number;
  pastor: string;
  established: string;
  status: "active" | "inactive" | "banned" | "pending";
  image?: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  adminIds: string[];
  applicationStatus: "approved" | "pending" | "rejected";
  applicationDate: string;
  permissions: {
    canCreateEvents: boolean;
    canManageMembers: boolean;
    canViewAnalytics: boolean;
    canEditInfo: boolean;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  fellowshipId: string;
  attendees: number;
  maxAttendees?: number;
  type: "service" | "bible-study" | "fellowship" | "outreach" | "prayer";
}

export interface FellowshipApplication {
  id: string;
  applicantName: string;
  fellowshipId: string;
  fellowshipName: string;
  pastorName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  notes?: string;
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



import type { Database } from "./supabase"

type Task = Database["public"]["Tables"]["tasks"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]


export const mockProfiles = {
  id: "mock-user-id",
  email: "demo@taskflow.com",
  full_name: "Demo User",
  avatar_url: "https://api.dicebear.com/7.x/initials/svg?seed=DemoUser",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export type ExtendedProfile = Profile & {
  username: string
  phone?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  accountStatus: "active" | "inactive" | "suspended"

  role: "user" | "admin" | "pastor" | "leader" | "member"
  lastLogin: string
}


export const mockTaskflowProfiles: ExtendedProfile[] = [
  {
    ...mockProfiles, 
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
    role: "user", 
    lastLogin: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
]


export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
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