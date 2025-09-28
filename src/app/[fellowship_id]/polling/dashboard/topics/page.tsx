import { v4 as uuidv4 } from "uuid"
import type { QuestionGroup, Topic, Question, Response } from "@/lib/polling-mock"
import { generateMockResponses, generateMockTopics } from "@/lib/polling-mock"

const STORAGE_KEY = "quickpoll_questionnaires"
const TOPICS_KEY = "quickpoll_topics"

// Sample questionnaire used for initialization
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
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "q2",
      type: "text",
      prompt: "What improvements would you suggest for our service?",
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "q3",
      type: "multiple-choice",
      prompt: "Would you recommend our service to others?",
      options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"],
      status: "active",
      moderationStatus: "approved",
      createdAt: new Date().toISOString(),
    },
  ],
  responses: [],
  settings: {
    allowAnonymous: true,
    moderationEnabled: true,
    allowQuestionSubmission: true,
  },
  topics: [],
}

// Initialize with some sample data
const initializeData = (): QuestionGroup[] => {
  if (typeof window === "undefined") {
    const sampleWithResponses = { ...sampleQuestionnaire }
    try {
      sampleWithResponses.responses = generateMockResponses(sampleQuestionnaire) || []
      sampleWithResponses.topics = generateMockTopics() || []
    } catch (error) {
      console.error("Error generating mock data:", error)
      sampleWithResponses.responses = []
      sampleWithResponses.topics = []
    }
    return [sampleWithResponses]
  }

  try {
    const existingData = localStorage.getItem(STORAGE_KEY)
    if (existingData) {
      try {
        const parsedData = JSON.parse(existingData) as QuestionGroup[]
        return parsedData.map((q) => ({
          ...q,
          questions: Array.isArray(q?.questions) ? q.questions : [],
          responses: Array.isArray(q?.responses) ? q.responses : [],
          topics: Array.isArray(q?.topics) ? q.topics : [],
          settings: q?.settings || {},
        }))
      } catch (parseError) {
        console.error("Error parsing localStorage data:", parseError)
        return [createSampleQuestionnaire()]
      }
    }

    return [createSampleQuestionnaire()]
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return [createSampleQuestionnaire()]
  }
}

const createSampleQuestionnaire = (): QuestionGroup => {
  const sampleWithResponses = { ...sampleQuestionnaire }
  try {
    sampleWithResponses.responses = generateMockResponses(sampleQuestionnaire) || []
    sampleWithResponses.topics = generateMockTopics() || []

    if (sampleWithResponses.topics?.length && sampleWithResponses.questions?.length) {
      sampleWithResponses.questions = sampleWithResponses.questions.map((q, index) => ({
        ...q,
        topicId: sampleWithResponses.topics?.[index % sampleWithResponses.topics.length]?.id,
      }))
    }
  } catch (error) {
    console.error("Error creating sample questionnaire:", error)
    sampleWithResponses.responses = []
    sampleWithResponses.topics = []
  }
  return sampleWithResponses
}

const initializeTopics = (): Topic[] => {
  if (typeof window === "undefined") {
    try {
      return generateMockTopics() || []
    } catch (error) {
      console.error("Error generating mock topics:", error)
      return []
    }
  }

  try {
    const existingTopics = localStorage.getItem(TOPICS_KEY)
    if (existingTopics) {
      try {
        return (JSON.parse(existingTopics) as Topic[]) || []
      } catch (parseError) {
        console.error("Error parsing topics from localStorage:", parseError)
        return []
      }
    }

    const topics = generateMockTopics() || []
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics))
    return topics
  } catch (error) {
    console.error("Error accessing localStorage for topics:", error)
    return []
  }
}

// QUESTION GROUPS
export const getAllQuestionGroups = (): QuestionGroup[] => {
  try {
    return initializeData()
  } catch (error) {
    console.error("Error getting all question groups:", error)
    return []
  }
}

export const getQuestionnaireById = (id: string): QuestionGroup | null => {
  if (!id) return null

  try {
    const questionnaires = getAllQuestionGroups()
    const questionnaire = questionnaires.find((q) => q?.id === id) || null
    if (!questionnaire) return null

    return {
      id: questionnaire.id ?? "unknown",
      title: questionnaire.title ?? "Untitled Questionnaire",
      description: questionnaire.description ?? "",
      adminUrl: questionnaire.adminUrl ?? "",
      answererUrl: questionnaire.answererUrl ?? "",
      projectionUrl: questionnaire.projectionUrl ?? "",
      createdAt: questionnaire.createdAt ?? new Date().toISOString(),
      updatedAt: questionnaire.updatedAt ?? new Date().toISOString(),
      questions: Array.isArray(questionnaire.questions) ? questionnaire.questions : [],
      responses: Array.isArray(questionnaire.responses) ? questionnaire.responses : [],
      topics: Array.isArray(questionnaire.topics) ? questionnaire.topics : [],
      settings: questionnaire.settings || {
        allowAnonymous: true,
        moderationEnabled: false,
        allowQuestionSubmission: false,
      },
    }
  } catch (error) {
    console.error("Error getting questionnaire by ID:", error)
    return null
  }
}

export const saveQuestionGroup = (questionGroup: QuestionGroup): QuestionGroup => {
  if (typeof window === "undefined") return questionGroup

  try {
    const questionnaires = getAllQuestionGroups()
    const existingIndex = questionnaires.findIndex((q) => q?.id === questionGroup.id)

    const safeQuestionGroup: QuestionGroup = {
      ...questionGroup,
      id: questionGroup.id ?? uuidv4(),
      title: questionGroup.title ?? "Untitled Questionnaire",
      description: questionGroup.description ?? "",
      adminUrl: questionGroup.adminUrl ?? uuidv4(),
      answererUrl: questionGroup.answererUrl ?? uuidv4(),
      projectionUrl: questionGroup.projectionUrl ?? uuidv4(),
      createdAt: questionGroup.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: Array.isArray(questionGroup.questions) ? questionGroup.questions : [],
      responses: Array.isArray(questionGroup.responses) ? questionGroup.responses : [],
      topics: Array.isArray(questionGroup.topics) ? questionGroup.topics : [],
      settings: questionGroup.settings || {
        allowAnonymous: true,
        moderationEnabled: false,
        allowQuestionSubmission: false,
      },
    }

    if (existingIndex >= 0) {
      questionnaires[existingIndex] = safeQuestionGroup
    } else {
      questionnaires.push(safeQuestionGroup)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
    return safeQuestionGroup
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return questionGroup
  }
}

// RESPONSES
export const submitAnswers = async (
  questionnaireId: string,
  answers: Record<string, string>,
  respondentInfo?: { name?: string; email?: string },
): Promise<Response | null> => {
  if (typeof window === "undefined") return null
  if (!questionnaireId) return null

  try {
    const questionnaires = getAllQuestionGroups()
    const questionnaireIndex = questionnaires.findIndex((q) => q?.id === questionnaireId)

    if (questionnaireIndex >= 0) {
      const questionnaire = questionnaires[questionnaireIndex]
      if (!questionnaire) return null

      const response: Response = {
        id: uuidv4(),
        answers,
        submittedAt: new Date().toISOString(),
        respondentInfo: respondentInfo || {},
        name: respondentInfo?.name || "Anonymous",
        value: 0,
      }

      questionnaire.responses = questionnaire.responses || []
      questionnaire.responses.push(response)
      questionnaire.updatedAt = new Date().toISOString()

      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
      return response
    }

    return null
  } catch (error) {
    console.error("Error submitting answers:", error)
    return null
  }
}

// QUESTIONS
export const addQuestion = (questionnaireId: string, question: Partial<Question>): Question | null => {
  if (typeof window === "undefined") return null
  if (!questionnaireId) return null

  try {
    const questionnaires = getAllQuestionGroups()
    const qg = questionnaires.find((q) => q?.id === questionnaireId)
    if (!qg) return null

    qg.questions = qg.questions || []

    const safeQuestion: Question = {
      id: question.id ?? uuidv4(),
      type: question.type ?? "text",
      prompt: question.prompt ?? "Untitled Question",
      options: question.options ?? [],
      topicId: question.topicId,
      status: question.status ?? "active",
      moderationStatus: question.moderationStatus ?? "approved",
      createdAt: question.createdAt ?? new Date().toISOString(),
    }

    qg.questions.push(safeQuestion)
    qg.updatedAt = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
    return safeQuestion
  } catch (error) {
    console.error("Error adding question:", error)
    return null
  }
}

export const updateQuestion = (
  questionnaireId: string,
  questionId: string,
  updates: Partial<Question>,
): Question | null => {
  if (typeof window === "undefined") return null

  try {
    const questionnaires = getAllQuestionGroups()
    const qg = questionnaires.find((q) => q?.id === questionnaireId)
    if (!qg || !Array.isArray(qg.questions)) return null

    const questionIndex = qg.questions.findIndex((q) => q?.id === questionId)
    if (questionIndex >= 0) {
      const existingQuestion = qg.questions[questionIndex]
      if (!existingQuestion) return null

      qg.questions[questionIndex] = {
        ...existingQuestion,
        ...updates,
        id: existingQuestion.id, // ensure required properties are not overwritten
        createdAt: existingQuestion.createdAt,
      }

      qg.updatedAt = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
      return qg.questions[questionIndex]
    }

    return null
  } catch (error) {
    console.error("Error updating question:", error)
    return null
  }
}

export const deleteQuestion = (questionnaireId: string, questionId: string): boolean => {
  if (typeof window === "undefined") return false

  try {
    const questionnaires = getAllQuestionGroups()
    const qg = questionnaires.find((q) => q?.id === questionnaireId)
    if (!qg || !Array.isArray(qg.questions)) return false

    const initialLength = qg.questions.length
    qg.questions = qg.questions.filter((q) => q?.id !== questionId)
    qg.updatedAt = new Date().toISOString()

    if (qg.questions.length < initialLength) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires))
      return true
    }
    return false
  } catch (error) {
    console.error("Error deleting question:", error)
    return false
  }
}

// TOPICS
export const getAllTopics = (): Topic[] => {
  try {
    return initializeTopics()
  } catch (error) {
    console.error("Error getting all topics:", error)
    return []
  }
}

export const saveTopic = (topic: Partial<Topic>): Topic | null => {
  if (typeof window === "undefined") return null

  try {
    const topics = getAllTopics()
    const existingIndex = topics.findIndex((t) => t.id === topic.id)

    const safeTopic: Topic = {
      id: topic.id ?? uuidv4(),
      name: topic.name ?? "Untitled Topic",
      description: topic.description ?? "",
      createdAt: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      topics[existingIndex] = safeTopic
    } else {
      topics.push(safeTopic)
    }

    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics))
    return safeTopic
  } catch (error) {
    console.error("Error saving topic:", error)
    return null
  }
}

export const deleteTopic = (topicId: string): boolean => {
  if (typeof window === "undefined") return false

  try {
    const topics = getAllTopics()
    const initialLength = topics.length
    const updatedTopics = topics.filter((t) => t.id !== topicId)

    if (updatedTopics.length < initialLength) {
      localStorage.setItem(TOPICS_KEY, JSON.stringify(updatedTopics))
      return true
    }
    return false
  } catch (error) {
    console.error("Error deleting topic:", error)
    return false
  }
}
