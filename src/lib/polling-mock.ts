import type { ReactNode } from "react"


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
  name: ReactNode
  value: number 
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

export function generateMockResponses(questionnaire: { questions: Question[] }): Response[] {
  if (!questionnaire?.questions || !Array.isArray(questionnaire.questions)) {
    console.error("Invalid questionnaire provided to generateMockResponses")
    return []
  }

  try {
    const responses: Response[] = [];
    const responseCount = Math.floor(Math.random() * 50) + 50; // 50-100 responses

    // Filter out questions without IDs first
    const validQuestions = questionnaire.questions.filter(question => !!question.id);

    for (let i = 0; i < responseCount; i++) {
      const answers: Record<string, string> = {};

      validQuestions.forEach((question) => {
        // Now question.id is guaranteed to be string
        if (Math.random() > 0.1) {
          if (question.type === "multiple-choice" && question.options?.length) {
            const randomIndex = Math.floor(Math.random() * question.options.length);
            const option = question.options[randomIndex];

            if (option !== undefined) {
              answers[question.id] = option;
            }
          } else if (question.type === "text") {
             answers[question.id] = generateRandomTextResponse()!;
          }
        }
      });

      responses.push({
        id: `mock-response-${i}`,
        answers,
        submittedAt: getRandomDate(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          new Date()
        ).toISOString(),
        name: undefined,
        value: 1
      })
    }

    return responses
  } catch (error) {
    console.error("Error generating mock responses:", error)
    return []
  }
}// Generate mock topics
export function generateMockTopics(): Topic[] {
  try {
    const topics: Topic[] = [
      {
        id: "topic-1",
        name: "Product Feedback",
        description: "Questions about our products and features",
        color: "#0ea5e9", // sky-500
        createdAt: new Date().toISOString(),
      },
      {
        id: "topic-2",
        name: "Customer Service",
        description: "Questions about customer support and service",
        color: "#22c55e", // green-500
        createdAt: new Date().toISOString(),
      },
      {
        id: "topic-3",
        name: "Website Experience",
        description: "Questions about website usability and experience",
        color: "#f59e0b", // amber-500
        createdAt: new Date().toISOString(),
      },
      {
        id: "topic-4",
        name: "General",
        description: "General questions and feedback",
        color: "#8b5cf6", // violet-500
        createdAt: new Date().toISOString(),
      },
    ]

    return topics
  } catch (error) {
    console.error("Error generating mock topics:", error)
    return []
  }
}


function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Generate a random text response
function  generateRandomTextResponse() {
  const responses = [
    "This is a great service, I'm very satisfied with it.",
    "I think there's room for improvement in the customer support area.",
    "Overall good experience, but could be better.",
    "The product quality is excellent, but delivery times could be improved.",
    "I've been using this service for a while and I'm very happy with it.",
    "The interface is intuitive and easy to use.",
    "I would recommend this to my friends and colleagues.",
    "The pricing is fair for the quality of service provided.",
    "I had some issues initially, but they were quickly resolved.",
    "The team was very responsive to my inquiries.",
    "I appreciate the attention to detail in the service.",
    "The product exceeded my expectations.",
    "I found the onboarding process to be very smooth.",
    "There were some technical issues that need to be addressed.",
    "The customer service team was very helpful.",
    "I like the variety of options available.",
    "The website could use some improvements in navigation.",
    "The mobile app works great and is very convenient.",
    "I've had a consistent experience across multiple interactions.",
    "The service has saved me a lot of time and effort.",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
