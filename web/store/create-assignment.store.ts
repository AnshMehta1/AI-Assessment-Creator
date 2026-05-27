import { create } from "zustand"

export type Question = {
  id: string
  type: string
  count: number
  marks: number
}

type AssignmentFormStore = {
  title: string
  dueDate: string
  instructions: string
  file: File | null

  questions: Question[]

  setTitle: (value: string) => void
  setDueDate: (value: string) => void
  setInstructions: (
    value: string
  ) => void

  setFile: (
    file: File | null
  ) => void

  setQuestions: (
    questions: Question[]
  ) => void
}

export const useCreateAssignmentStore =
  create<AssignmentFormStore>(
    set => ({
      title: "",

      dueDate: "",

      instructions: "",

      file: null,

      questions: [
        {
          id: crypto.randomUUID(),
          type:
            "Multiple Choice Questions",
          count: 4,
          marks: 1,
        },

        {
          id: crypto.randomUUID(),
          type: "Short Questions",
          count: 3,
          marks: 2,
        },
      ],

      setTitle: title =>
        set({ title }),

      setDueDate: dueDate =>
        set({ dueDate }),

      setInstructions:
        instructions =>
          set({ instructions }),

      setFile: file =>
        set({ file }),

      setQuestions: questions =>
        set({ questions }),
    })
  )