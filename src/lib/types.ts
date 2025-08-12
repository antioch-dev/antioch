// Define types for the application
export type QuestionType = "text" | "multiple-choice"

export interface Question {
  id: string
  type: QuestionType
  prompt: string
  options?: string[]
  topicId?: string
  status?: "active" | "disabled"
  moderationStatus?: "approved" | "pending" | "rejected"
  createdAt: string
}

export interface Answer {
  questionId: string
  response: string
}

export interface Response {
  id: string
  answers: Record<string, string>
  submittedAt: string
  respondentInfo?: {
    name?: string
    email?: string
  }
}

export interface Topic {
  id: string
  name: string
  description?: string
  color?: string
  createdAt: string
}

export interface QuestionGroup {
  id: string
  title: string
  description?: string
  startDate?: string
  endDate?: string
  questions: Question[]
  topics?: Topic[]
  responses: Response[]
  adminUrl: string
  answererUrl: string
  projectionUrl: string
  createdAt: string
  updatedAt: string
  settings?: {
    allowAnonymous?: boolean
    moderationEnabled?: boolean
    allowQuestionSubmission?: boolean
  }
}
