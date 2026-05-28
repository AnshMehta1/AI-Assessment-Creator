import { create } from "zustand"
import { Assignment } from "./create-assignment.store"

type AssignmentStore = {
  assignments: Assignment[]

  loading: boolean

  setAssignments: (
    assignments: Assignment[]
  ) => void

  addAssignment: (
    assignment: Assignment
  ) => void

  removeAssignment: (
    id: string
  ) => void

  setLoading: (
    loading: boolean
  ) => void
}

export const useAssignmentStore =
  create<AssignmentStore>(set => ({
    assignments: [],

    loading: false,

    setAssignments: assignments =>
      set({ assignments }),

    addAssignment: assignment =>
      set(state => ({
        assignments: [
          assignment,
          ...state.assignments
        ]
      })),

    removeAssignment: id =>
      set(state => ({
        assignments:
          state.assignments.filter(
            item => item._id !== id
          )
      })),

    setLoading: loading =>
      set({ loading }),
  }))