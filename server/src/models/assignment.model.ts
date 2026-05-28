import mongoose from "mongoose"

const generatedQuestionSchema =
  new mongoose.Schema({
    question: {
      type: String,
    },
    options: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    marks: {
      type: Number,
    },
  })

const generatedSectionSchema =
  new mongoose.Schema({
    title: {
      type: String,
    },
    instruction: {
      type: String,
    },
    questions: [
      generatedQuestionSchema
    ],
  })

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
      fileUrl: {
        type: String,
      },
      questions: [
        questionSchema
      ],
      status: {
        type: String,
        enum: [
          "pending",
          "processing",
          "completed",
          "failed",
        ],
        default: "pending",
      },
      generatedPaper: {
        title: {
          type: String,
        },
        instructions: {
          type: String,
        },
        sections: [
          generatedSectionSchema
        ],
      },
      generationLogs: [
        {
          type: String,
        }
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