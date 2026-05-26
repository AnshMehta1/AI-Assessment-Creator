import mongoose from "mongoose"

const questionSchema =
  new mongoose.Schema({
    type: String,
    count: Number,
    marks: Number,
  })

const assignmentSchema =
  new mongoose.Schema(
    {
      title: String,

      dueDate: String,

      assignedOn: String,

      questions: [questionSchema],
    },
    {
      timestamps: true,
    }
  )

export default mongoose.model(
  "Assignment",
  assignmentSchema
)