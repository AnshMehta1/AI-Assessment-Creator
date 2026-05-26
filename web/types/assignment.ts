export type Assignment = {
  _id: string
  title: string
  dueDate: string
  assignedOn: string

  questions: {
    type: string
    count: number
    marks: number
  }[]
}