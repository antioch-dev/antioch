"use server"

import { v4 as uuidv4 } from "uuid"
import { saveQuestionGroup } from "./data"
import type { QuestionGroup } from "@/lib/polling-mock"

export async function createQuestionGroup(data: any): Promise<QuestionGroup> {
  // Create unique IDs for the questionnaire
  const id = uuidv4()
  const adminUrl = uuidv4()
  const answererUrl = uuidv4()
  const projectionUrl = uuidv4()

  // Create the question group with timestamps
  const questionGroup: QuestionGroup = {
    id,
    adminUrl,
    answererUrl,
    projectionUrl,
    title: data.title,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    questions: data.questions || [],
    topics: data.topics || [],
    responses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      allowAnonymous: true,
      moderationEnabled: true,
      allowQuestionSubmission: true,
    },
  }

  // Save the question group
  saveQuestionGroup(questionGroup)

  return questionGroup
}
