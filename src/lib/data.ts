import { v4 as uuidv4 } from "uuid";
import type { QuestionGroup, Topic, Question, Response } from "./types";
import { generateMockResponses, generateMockTopics } from "./mock-data";

const STORAGE_KEY = "quickpoll_questionnaires";
const TOPICS_KEY = "quickpoll_topics";

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
};

// Initialize with some sample data if empty
const initializeData = (): QuestionGroup[] => {
  if (typeof window === "undefined") {
    const sampleWithResponses = { ...sampleQuestionnaire };
    try {
      sampleWithResponses.responses = generateMockResponses(sampleQuestionnaire) ?? [];
      sampleWithResponses.topics = generateMockTopics() ?? [];
    } catch (error) {
      console.error("Error generating mock data:", error);
      sampleWithResponses.responses = [];
      sampleWithResponses.topics = [];
    }
    return [sampleWithResponses];
  }

  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (existingData) {
      try {
        const parsedData = JSON.parse(existingData);
        return Array.isArray(parsedData)
          ? parsedData.map((q: any) => ({
              ...q,
              questions: Array.isArray(q.questions) ? q.questions : [],
              responses: Array.isArray(q.responses) ? q.responses : [],
              topics: Array.isArray(q.topics) ? q.topics : [],
              settings: q.settings || {},
            }))
          : [createSampleQuestionnaire()];
      } catch (parseError) {
        console.error("Error parsing localStorage data:", parseError);
        return [createSampleQuestionnaire()];
      }
    }

    return [createSampleQuestionnaire()];
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return [createSampleQuestionnaire()];
  }
};

// Create a sample questionnaire with all required properties
const createSampleQuestionnaire = (): QuestionGroup => {
  const sampleWithResponses = { ...sampleQuestionnaire };
  try {
    sampleWithResponses.responses = generateMockResponses(sampleQuestionnaire) ?? [];
    sampleWithResponses.topics = generateMockTopics() ?? [];

    if (
      Array.isArray(sampleWithResponses.topics) &&
      sampleWithResponses.topics.length > 0 &&
      Array.isArray(sampleWithResponses.questions) &&
      sampleWithResponses.questions.length > 0
    ) {
      sampleWithResponses.questions = sampleWithResponses.questions.map((q, index) => ({
        ...q,
        topicId: sampleWithResponses.topics?.[index % sampleWithResponses.topics.length]?.id,
      }));
    }
  } catch (error) {
    console.error("Error creating sample questionnaire:", error);
    sampleWithResponses.responses = [];
    sampleWithResponses.topics = [];
  }
  return sampleWithResponses;
};

// Initialize topics
const initializeTopics = (): Topic[] => {
  if (typeof window === "undefined") {
    try {
      return generateMockTopics() ?? [];
    } catch (error) {
      console.error("Error generating mock topics:", error);
      return [];
    }
  }

  try {
    const existingTopics = localStorage.getItem(TOPICS_KEY);
    if (existingTopics) {
      try {
        const parsedTopics = JSON.parse(existingTopics);
        return Array.isArray(parsedTopics) ? parsedTopics : [];
      } catch (parseError) {
        console.error("Error parsing topics from localStorage:", parseError);
        return [];
      }
    }

    try {
      const topics = generateMockTopics() ?? [];
      localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
      return topics;
    } catch (error) {
      console.error("Error generating and saving mock topics:", error);
      return [];
    }
  } catch (error) {
    console.error("Error accessing localStorage for topics:", error);
    return [];
  }
};

// Get all question groups
export const getAllQuestionGroups = (): QuestionGroup[] => {
  try {
    return initializeData();
  } catch (error) {
    console.error("Error getting all question groups:", error);
    return [];
  }
};

// Get a questionnaire by ID
export const getQuestionnaireById = (id: string): QuestionGroup | null => {
  if (!id) {
    console.error("Invalid ID provided to getQuestionnaireById");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaire = questionnaires.find((q) => q?.id === id);

    if (!questionnaire) {
      return null;
    }

    const safeQuestionnaire: QuestionGroup = {
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
    };

    return safeQuestionnaire;
  } catch (error) {
    console.error("Error getting questionnaire by ID:", error);
    return null;
  }
};

// Get a questionnaire by answerer URL
export const getQuestionnaireByAnswerUrl = (url: string): QuestionGroup | null => {
  if (!url) {
    console.error("Invalid URL provided to getQuestionnaireByAnswerUrl");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaire = questionnaires.find((q) => q?.answererUrl === url);

    if (!questionnaire) {
      return null;
    }

    const safeQuestionnaire: QuestionGroup = {
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
    };

    return safeQuestionnaire;
  } catch (error) {
    console.error("Error getting questionnaire by answer URL:", error);
    return null;
  }
};

// Get a questionnaire by projection URL
export const getQuestionnaireByProjectionUrl = (url: string): QuestionGroup | null => {
  if (!url) {
    console.error("Invalid URL provided to getQuestionnaireByProjectionUrl");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaire = questionnaires.find((q) => q?.projectionUrl === url);

    if (!questionnaire) {
      return null;
    }

    const safeQuestionnaire: QuestionGroup = {
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
    };

    if (safeQuestionnaire.responses.length === 0) {
      try {
        safeQuestionnaire.responses = generateMockResponses(safeQuestionnaire) ?? [];
      } catch (error) {
        console.error("Error generating mock responses:", error);
        safeQuestionnaire.responses = [];
      }
    }

    return safeQuestionnaire;
  } catch (error) {
    console.error("Error getting questionnaire by projection URL:", error);
    return null;
  }
};

// Save a question group
export const saveQuestionGroup = (questionGroup: QuestionGroup): QuestionGroup => {
  if (typeof window === "undefined") return questionGroup;

  try {
    const questionnaires = getAllQuestionGroups();
    const existingIndex = questionnaires.findIndex((q) => q?.id === questionGroup.id);

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
    };

    if (existingIndex >= 0) {
      questionnaires[existingIndex] = safeQuestionGroup;
    } else {
      questionnaires.push(safeQuestionGroup);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires));
    return safeQuestionGroup;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return questionGroup;
  }
};

// Submit answers to a questionnaire
export const submitAnswers = async (
  questionnaireId: string,
  answers: Record<string, string>,
  respondentInfo?: { name?: string; email?: string },
): Promise<Response | null> => {
  if (typeof window === "undefined") return null;
  if (!questionnaireId || !answers) {
    console.error("Invalid parameters provided to submitAnswers");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaireIndex = questionnaires.findIndex((q) => q?.id === questionnaireId);

    if (questionnaireIndex >= 0) {
      const targetQuestionnaire = questionnaires[questionnaireIndex];
      if (targetQuestionnaire) { // Explicitly check if it exists
        const response: Response = {
          id: uuidv4(),
          answers: answers ?? {},
          submittedAt: new Date().toISOString(),
          respondentInfo: respondentInfo ?? {},
        };

        if (!Array.isArray(targetQuestionnaire.responses)) {
          targetQuestionnaire.responses = [];
        }

        targetQuestionnaire.responses.push(response);
        targetQuestionnaire.updatedAt = new Date().toISOString();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires));
        return response;
      }
    }

    throw new Error("Questionnaire not found");
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw error;
  }
};

// Get all topics
export const getAllTopics = (): Topic[] => {
  try {
    return initializeTopics();
  } catch (error) {
    console.error("Error getting all topics:", error);
    return [];
  }
};

// Save a topic
export const saveTopic = (topic: Topic): Topic => {
  if (typeof window === "undefined") return topic;
  if (!topic) {
    console.error("Invalid topic provided to saveTopic");
    return { id: uuidv4(), name: "Untitled Topic", createdAt: new Date().toISOString() };
  }

  try {
    const topics = getAllTopics();
    const existingIndex = topics.findIndex((t) => t?.id === topic.id);

    const safeTopic: Topic = {
      ...topic,
      id: topic.id ?? uuidv4(),
      name: topic.name ?? "Untitled Topic",
      createdAt: topic.createdAt ?? new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      topics[existingIndex] = safeTopic;
    } else {
      topics.push(safeTopic);
    }

    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
    return safeTopic;
  } catch (error) {
    console.error("Error saving topic to localStorage:", error);
    return topic;
  }
};

// Delete a topic
export const deleteTopic = (topicId: string): boolean => {
  if (typeof window === "undefined") return false;
  if (!topicId) {
    console.error("Invalid topic ID provided to deleteTopic");
    return false;
  }

  try {
    const topics = getAllTopics();
    const filteredTopics = topics.filter((t) => t?.id !== topicId);

    if (filteredTopics.length !== topics.length) {
      localStorage.setItem(TOPICS_KEY, JSON.stringify(filteredTopics));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting topic from localStorage:", error);
    return false;
  }
};

// Add a question to a questionnaire
export const addQuestion = (questionnaireId: string, question: Question): Question | null => {
  if (typeof window === "undefined") return null;
  if (!questionnaireId || !question) {
    console.error("Invalid parameters provided to addQuestion");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaireIndex = questionnaires.findIndex((q) => q?.id === questionnaireId);

    if (questionnaireIndex >= 0) {
      const targetQuestionnaire = questionnaires[questionnaireIndex];
      if (targetQuestionnaire) { // Explicitly check if it exists
        if (!Array.isArray(targetQuestionnaire.questions)) {
          targetQuestionnaire.questions = [];
        }

        const safeQuestion: Question = {
          ...question,
          id: question.id ?? uuidv4(),
          type: question.type ?? "text",
          prompt: question.prompt ?? "Untitled Question",
          createdAt: question.createdAt ?? new Date().toISOString(),
          status: question.status ?? "active",
          moderationStatus: question.moderationStatus ?? "approved",
        };

        targetQuestionnaire.questions.push(safeQuestion);
        targetQuestionnaire.updatedAt = new Date().toISOString();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires));
        return safeQuestion;
      }
    }

    throw new Error("Questionnaire not found");
  } catch (error) {
    console.error("Error adding question:", error);
    return null;
  }
};

// Update a question
export const updateQuestion = (
  questionnaireId: string,
  questionId: string,
  updates: Partial<Question>,
): Question | null => {
  if (typeof window === "undefined") return null;
  if (!questionnaireId || !questionId || !updates) {
    console.error("Invalid parameters provided to updateQuestion");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaireIndex = questionnaires.findIndex((q) => q?.id === questionnaireId);

    if (questionnaireIndex >= 0) {
      const targetQuestionnaire = questionnaires[questionnaireIndex];
      if (targetQuestionnaire) { // Explicitly check if it exists
        if (!Array.isArray(targetQuestionnaire.questions)) {
          targetQuestionnaire.questions = [];
          return null;
        }

        const questionIndex = targetQuestionnaire.questions.findIndex((q) => q?.id === questionId);

        if (questionIndex >= 0) {
          const currentQuestion = targetQuestionnaire.questions[questionIndex];

          const updatedQuestion: Question = {
            ...currentQuestion,
            ...updates,
            id: currentQuestion?.id ?? uuidv4(),
            type: currentQuestion?.type ?? "text",
            prompt: currentQuestion?.prompt ?? "Untitled Question",
            createdAt: currentQuestion?.createdAt ?? new Date().toISOString(),
            status: currentQuestion?.status ?? "active",
            moderationStatus: currentQuestion?.moderationStatus ?? "approved",
          };

          targetQuestionnaire.questions[questionIndex] = updatedQuestion;
          targetQuestionnaire.updatedAt = new Date().toISOString();

          localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires));
          return targetQuestionnaire.questions[questionIndex];
        }
      }
    }

    throw new Error("Question or questionnaire not found");
  } catch (error) {
    console.error("Error updating question:", error);
    return null;
  }
};

// Delete a question
export const deleteQuestion = (questionnaireId: string, questionId: string): boolean => {
  if (typeof window === "undefined") return false;
  if (!questionnaireId || !questionId) {
    console.error("Invalid parameters provided to deleteQuestion");
    return false;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaireIndex = questionnaires.findIndex((q) => q?.id === questionnaireId);

    if (questionnaireIndex >= 0) {
      const targetQuestionnaire = questionnaires[questionnaireIndex];
      if (targetQuestionnaire) { // Explicitly check if it exists
        if (!Array.isArray(targetQuestionnaire.questions)) {
          return false;
        }

        const originalLength = targetQuestionnaire.questions.length;
        targetQuestionnaire.questions = targetQuestionnaire.questions.filter(
          (q) => q?.id !== questionId,
        );

        if (targetQuestionnaire.questions.length !== originalLength) {
          targetQuestionnaire.updatedAt = new Date().toISOString();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires));
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error deleting question:", error);
    return false;
  }
};

// Submit a question from a user
export const submitUserQuestion = (
  questionnaireId: string,
  question: Omit<Question, "id" | "createdAt" | "status" | "moderationStatus">,
): Question | null => {
  if (typeof window === "undefined") return null;
  if (!questionnaireId || !question) {
    console.error("Invalid parameters provided to submitUserQuestion");
    return null;
  }

  try {
    const questionnaires = getAllQuestionGroups();
    const questionnaireIndex = questionnaires.findIndex((q) => q?.id === questionnaireId);

    if (questionnaireIndex >= 0) {
      const targetQuestionnaire = questionnaires[questionnaireIndex];
      if (targetQuestionnaire) { // Explicitly check if it exists
        if (!Array.isArray(targetQuestionnaire.questions)) {
          targetQuestionnaire.questions = [];
        }

        const newQuestion: Question = {
          ...question,
          id: uuidv4(),
          type: question.type ?? "text",
          prompt: question.prompt ?? "Untitled Question",
          createdAt: new Date().toISOString(),
          status: "disabled",
          moderationStatus: "pending",
        };

        targetQuestionnaire.questions.push(newQuestion);
        targetQuestionnaire.updatedAt = new Date().toISOString();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(questionnaires));
        return newQuestion;
      }
    }

    throw new Error("Questionnaire not found");
  } catch (error) {
    console.error("Error submitting user question:", error);
    return null;
  }
};