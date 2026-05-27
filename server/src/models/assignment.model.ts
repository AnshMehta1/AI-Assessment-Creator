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
      title: {
        type: String,
        required: true,
      },
      dueDate: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
      },
      assignedOn: {
        type: String,
      },
      questions: [
        questionSchema
      ],
    },
    {
      timestamps: true,
    }
  )

export default mongoose.model(
  "Assignment",
  assignmentSchema
)