import { create } from "zustand"

export type Question = {
  id: string
  type: string
  count: number
  marks: number
}

export type GeneratedQuestion = {
  question: string
  options?: string[]
  answer: string
  difficulty: string
  marks: number
}

export type Section = {
  title: string
  instruction: string
  questions:
    GeneratedQuestion[]
}

export type GeneratedPaper = {
  title?: string
  instructions?: string
  sections:
    Section[]
}

export type Assignment = {
  _id: string
  title: string
  dueDate: string
  instructions?: string
  assignedOn?: string
  fileUrl?: string
  status?: string
  generationLogs?: string[]
  questions: Question[]
  generatedPaper?:
    GeneratedPaper
}

type AssignmentFormStore = {
  title: string
  dueDate: string
  instructions: string
  file: File | null

  questions: Question[]

  setTitle: (
    value: string
  ) => void

  setDueDate: (
    value: string
  ) => void

  setInstructions: (
    value: string
  ) => void

  setFile: (
    file: File | null
  ) => void

  setQuestions: (
    questions: Question[]
  ) => void

  resetForm: () => void
}

const createDefaultQuestions =
  (): Question[] => [
    {
      id:
        crypto.randomUUID(),
      type:
        "Multiple Choice Questions",
      count: 4,
      marks: 1,
    },
    {
      id:
        crypto.randomUUID(),
      type:
        "Short Questions",
      count: 3,
      marks: 2,
    },
  ]

export const useCreateAssignmentStore =
  create<AssignmentFormStore>(
    set => ({
      title: "",
      dueDate: "",
      instructions: "",
      file: null,

      questions:
        createDefaultQuestions(),

      setTitle: title =>
        set({ title }),

      setDueDate: dueDate =>
        set({ dueDate }),

      setInstructions:
        instructions =>
          set({
            instructions
          }),

      setFile: file =>
        set({ file }),

      setQuestions: questions =>
        set({ questions }),

      resetForm: () =>
        set({
          title: "",
          dueDate: "",
          instructions: "",
          file: null,
          questions:
            createDefaultQuestions(),
        }),
    })
  )