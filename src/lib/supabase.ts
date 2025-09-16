export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: "not_started" | "in_progress" | "completed" | "blocked"
          priority: "low" | "medium" | "high" | "urgent"
          due_date: string | null
          assignee_id: string | null
          created_by: string
          team_id: string
          category: "general" | "assignment" | "recurring" | "long_term"
          tags: string[] | null
          is_recurring: boolean
          recurrence_pattern: RecurrencePattern | null // Corrected
          parent_task_id: string | null
          position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: "not_started" | "in_progress" | "completed" | "blocked"
          priority?: "low" | "medium" | "high" | "urgent"
          due_date?: string | null
          assignee_id?: string | null
          created_by: string
          team_id: string
          category?: "general" | "assignment" | "recurring" | "long_term"
          tags?: string[] | null
          is_recurring?: boolean
          recurrence_pattern?: RecurrencePattern | null // Corrected
          parent_task_id?: string | null
          position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: "not_started" | "in_progress" | "completed" | "blocked"
          priority?: "low" | "medium" | "high" | "urgent"
          due_date?: string | null
          assignee_id?: string | null
          created_by?: string
          team_id?: string
          category?: "general" | "assignment" | "recurring" | "long_term"
          tags?: string[] | null
          is_recurring?: boolean
          recurrence_pattern?: RecurrencePattern | null // Corrected
          parent_task_id?: string | null
          position?: number
          created_at?: string
          updated_at?: string
        }
      }

      fellowships: {
        Row: {
          id: string
          name: string
          pastor: string
          status: "active" | "inactive"
          permissions: {
            canCreateEvents: boolean
            canManageMembers: boolean
            canViewAnalytics: boolean
            canEditInfo: boolean
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          pastor: string
          status?: "active" | "inactive"
          permissions?: {
            canCreateEvents: boolean
            canManageMembers: boolean
            canViewAnalytics: boolean
            canEditInfo: boolean
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          pastor?: string
          status?: "active" | "inactive"
          permissions?: {
            canCreateEvents: boolean
            canManageMembers: boolean
            canViewAnalytics: boolean
            canEditInfo: boolean
          }
          created_at?: string
          updated_at?: string
        }
      }

      checkins: {
        Row: {
          id: string
          user_id: string
          content: string
          type: "daily" | "weekly"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          type?: "daily" | "weekly"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          type?: "daily" | "weekly"
          created_at?: string
        }
      }
      checkouts: {
        Row: {
          id: string
          user_id: string
          content: string
          task_ids: string[] | null
          type: "daily" | "weekly"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          task_ids?: string[] | null
          type?: "daily" | "weekly"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          task_ids?: string[] | null
          type?: "daily" | "weekly"
          created_at?: string
        }
      }
    }
  }
}

// Defining a more specific type for recurrence patterns
export type RecurrencePattern = {
  frequency: "daily" | "weekly" | "biweekly" | "monthly" | "yearly"
  interval: number
  daysOfWeek?: number[] // For weekly/biweekly
  dayOfMonth?: number // For monthly
  monthOfYear?: number // For yearly
}

// Mock client - no external dependencies
export const supabase = {
  auth: {
    signUp: () => Promise.resolve({ data: null, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
}
