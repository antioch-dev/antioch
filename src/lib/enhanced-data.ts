import { v4 as uuidv4 } from "uuid"
import type { QuestionGroup, Question, Topic, Response } from "@/lib/polling-mock"

// Storage keys
const STORAGE_KEY = "quickpoll_questionnaires"
const TOPICS_STORAGE_KEY = "quickpoll_topics"

// Sample topics
const sampleTopics: Topic[] = [
  {
    id: "topic-1",
    name: "Product Feedback",
    description: "Questions about our products and services",
    color: "#0ea5e9", // sky-500
    createdAt: new Date().toISOString(),
  },
  {
    id: "topic-2",
    name: "Customer Service",
    description: "Questions about customer support and service",
    color: "#8b5cf6", // violet-500
    createdAt: new Date().toISOString(),
  },
  {
    id: "topic-3",
    name: "Website Experience",
    description: "Questions about website usability and experience",
    color: "#10b981", // emerald-500
    createdAt: new Date().toISOString(),
  },
]

// Sample data for server-side rendering and initial state
const sampleQuestionnaire: QuestionGroup = {
  id: "sample-1",
  title: "Customer Satisfaction Survey",
  description: "Help us improve our services by answering a few questions.",
  adminUrl: "admin-url-1",
  answererUrl: "answer-url-1",
  projectionUrl: "projection-url-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      prompt: "How satisfied are you with our service?",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
      topicId: "topic-1",
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "q2",
      type: "text",
      prompt: "What improvements would you suggest for our service?",
      topicId: "topic-1",
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "q3",
      type: "multiple-choice",
      prompt: "Would you recommend our service to others?",
      options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"],
      topicId: "topic-2",
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "q4",
      type: "multiple-choice",
      prompt: "How easy was it to navigate our website?",
      options: ["Very Easy", "Easy", "Neutral", "Difficult", "Very Difficult"],
      topicId: "topic-3",
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "q5",
      type: "text",
      prompt: "What features would you like to see added to our website?",
      topicId: "topic-3",
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
  ],
  topics: sampleTopics,
  responses: [], // Will be populated with mock data
  settings: {
    allowAnonymous: true,
    moderationEnabled: true,
    allowQuestionSubmission: true,
  },
}

// Initialize with some sample data if empty
const initializeData = (): QuestionGroup[] => {
  if (typeof window === "undefined") {
    // Return sample data for server-side rendering
    return [sampleQuestionnaire]
  }

  try {
    const existingData = localStorage.getItem(STORAGE_KEY)
    if (existingData) {
      const parsedData = JSON.parse(existingData) as QuestionGroup[]
      return parsedData
    }

    // Create sample questionnaire with responses
    const initialData: QuestionGroup[] = [sampleQuestionnaire]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    return initialData
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return [sampleQuestionnaire]
  }
}

// Initialize topics
const initializeTopics = (): Topic[] => {
  if (typeof window === "undefined") {
    // Return sample topics for server-side rendering
    return sampleTopics
  }

  try {
    const existingTopics = localStorage.getItem(TOPICS_STORAGE_KEY)
    if (existingTopics) {
      const parsedTopics = JSON.parse(existingTopics) as Topic[]
      return parsedTopics
    }

    // Create sample topics
    localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(sampleTopics))
    return sampleTopics
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return sampleTopics
  }
}

// Get all question groups
export const getAllQuestionGroups = (): QuestionGroup[] => {
  return initializeData()
}

// Get all topics
export const getAllTopics = (): Topic[] => {
  return initializeTopics()
}

// Get a questionnaire by ID
export const getQuestionnaireById = (id: string): QuestionGroup | null => {
  const questionnaires = getAllQuestionGroups()
  return questionnaires.find((q: QuestionGroup) => q.id === id) || null
}

// Get a questionnaire by answerer URL
export const getQuestionnaireByAnswerUrl = (url: string): QuestionGroup | null => {
  const questionnaires = getAllQuestionGroups()
  return questionnaires.find((q: QuestionGroup) => q.answererUrl === url) || null
}

// Get a questionnaire by projection URL
export const getQuestionnaireByProjectionUrl = (url: string): QuestionGroup | null => {
  const questionnaires = getAllQuestionGroups()
  return questionnaires.find((q: QuestionGroup) => q.projectionUrl === url) || null
}

// Save a question group
export const saveQuestionGroup = (questionGroup: QuestionGroup): QuestionGroup => {
  if (typeof window === "undefined") return questionGroup

  try {
    const questionnaires = getAllQuestionGroups()
    const existingIndex = questionnaires.findIndex((q: QuestionGroup) => q.id === questionGroup.id)

    if (existingIndex >= 0) {
      questionnaires[existingIndex] = {
        ...questionGroup,
        updatedAt: new Date().toISOString(),
      }
    } else {
      questionnaires.push(questionGroup)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
    return questionGroup
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return questionGroup
  }
}

// Submit answers to a questionnaire
export const submitAnswers = async (questionnaireId: string, answers: Record<string, string>): Promise<Response | null> => {
  if (typeof window === "undefined") return null

  try {
    const questionnaires = getAllQuestionGroups()
    const questionnaireIndex = questionnaires.findIndex((q: QuestionGroup) => q.id === questionnaireId)

    if (questionnaireIndex >= 0) {
      const response: Response = {
        id: uuidv4(),
        answers,
        submittedAt: new Date().toISOString(),
        name: undefined,
        value: 0
      }

      const questionnaire = questionnaires[questionnaireIndex]
      if (!questionnaire?.responses) {
        questionnaire!.responses = []
      }

      questionnaire!.responses.push(response)
      questionnaire!.updatedAt = new Date().toISOString()

      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
      return response
    }

    throw new Error("Questionnaire not found")
  } catch (error) {
    console.error("Error submitting answers:", error)
    throw error
  }
}

// Save a topic
export const saveTopic = (topic: Topic): Topic => {
  if (typeof window === "undefined") return topic

  try {
    const topics = getAllTopics()
    const existingIndex = topics.findIndex((t: Topic) => t.id === topic.id)

    if (existingIndex >= 0) {
      topics[existingIndex] = topic
    } else {
      topics.push(topic)
    }

    localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(topics))
    return topic
  } catch (error) {
    console.error("Error saving topic to localStorage:", error)
    return topic
  }
}

// Delete a topic
export const deleteTopic = (topicId: string): void => {
  if (typeof window === "undefined") return

  try {
    const topics = getAllTopics()
    const filteredTopics = topics.filter((t: Topic) => t.id !== topicId)
    localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(filteredTopics))
  } catch (error) {
    console.error("Error deleting topic from localStorage:", error)
    throw error
  }
}

// Update a question
export const updateQuestion = (
  questionnaireId: string,
  questionId: string,
  updates: Partial<Question>
): void => {
  if (typeof window === "undefined") return

  try {
    const questionnaires = getAllQuestionGroups()
    const questionnaireIndex = questionnaires.findIndex(
      (q: QuestionGroup) => q.id === questionnaireId
    )

    if (questionnaireIndex >= 0) {
      const questionnaire = questionnaires[questionnaireIndex]

      if (!questionnaire) return

      const questionIndex = questionnaire.questions.findIndex(
        (q) => q.id === questionId
      )

      if (questionIndex >= 0) {
        const existing = questionnaire.questions[questionIndex]

        // ✅ Explicitly construct a safe Question
        const updated: Question = {
          ...existing, // keep required properties safe
          ...updates,  // apply partial updates
          id: existing!.id, // ensure id never becomes undefined
          prompt: updates.prompt ?? existing!.prompt,
          type: updates.type ?? existing!.type,
          status: updates.status ?? existing!.status,
          moderationStatus: updates.moderationStatus ?? existing!.moderationStatus,
          createdAt: existing!.createdAt, // preserve createdAt
        }

        questionnaire.questions[questionIndex] = updated
        questionnaire.updatedAt = new Date().toISOString()

        localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
      }
    }
  } catch (error) {
    console.error("Error updating question:", error)
    throw error
  }
}


// Delete a question
export const deleteQuestion = (questionnaireId: string, questionId: string): void => {
  if (typeof window === "undefined") return

  try {
    const questionnaires = getAllQuestionGroups()
    const questionnaireIndex = questionnaires.findIndex((q: QuestionGroup) => q.id === questionnaireId)

    if (questionnaireIndex >= 0) {
      const questionnaire = questionnaires[questionnaireIndex]
      questionnaire!.questions = questionnaire!.questions.filter(
        (q: Question) => q.id !== questionId,
      )

      questionnaire!.updatedAt = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
    }
  } catch (error) {
    console.error("Error deleting question:", error)
    throw error
  }
}

// Submit a user-generated question
export const submitUserQuestion = async (questionnaireId: string, questionData: Partial<Question>): Promise<Question | null> => {
  if (typeof window === "undefined") return null

  try {
    const questionnaires = getAllQuestionGroups()
    const questionnaireIndex = questionnaires.findIndex((q: QuestionGroup) => q.id === questionnaireId)

    if (questionnaireIndex >= 0) {
      const questionnaire = questionnaires[questionnaireIndex]
      const newQuestion: Question = {
        id: uuidv4(),
        type: questionData.type || "text",
        prompt: questionData.prompt || "",
        options: questionData.options || [],
        topicId: questionData.topicId,
        status: "disabled", // New questions are disabled by default
        moderationStatus: "pending", // New questions need moderation
        createdAt: new Date().toISOString(),
      }

      questionnaire!.questions.push(newQuestion)
      questionnaire!.updatedAt = new Date().toISOString()

      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
      return newQuestion
    }

    throw new Error("Questionnaire not found")
  } catch (error) {
    console.error("Error submitting user question:", error)
    throw error
  }
}