import { Worker } from "bullmq"

import Assignment from "../models/assignment.model"

new Worker(
  "assignment-generation",

  async job => {

    console.log(
      "Worker received job:",
      job.id
    )

    const {
      assignmentId
    } = job.data

    await Assignment.findByIdAndUpdate(
      assignmentId,

      {
        status:
          "processing",

        generationLogs: [
          "Assignment created",
          "Processing uploaded files...",
        ],
      }
    )

    await delay(2000)

    await Assignment.findByIdAndUpdate(
      assignmentId,

      {
        generationLogs: [
          "Assignment created",
          "Processing uploaded files...",
          "Generating AI questions...",
        ],
      }
    )

    await delay(3000)

    const generatedPaper = {
      sections: [
        {
          title:
            "Section A",

          instruction:
            "Attempt all questions",

          questions: [
            {
              question:
                "Explain TCP congestion control.",

              difficulty:
                "Medium",

              marks: 5,
            },

            {
              question:
                "What is Sliding Window Protocol?",

              difficulty:
                "Easy",

              marks: 3,
            },
          ],
        },

        {
          title:
            "Section B",

          instruction:
            "Attempt any two questions",

          questions: [
            {
              question:
                "Compare TCP and UDP.",

              difficulty:
                "Medium",

              marks: 5,
            },

            {
              question:
                "Explain the OSI model.",

              difficulty:
                "Hard",

              marks: 8,
            },
          ],
        },
      ],
    }

    await Assignment.findByIdAndUpdate(
      assignmentId,

      {
        generatedPaper,

        status:
          "completed",

        generationLogs: [
          "Assignment created",
          "Processing uploaded files...",
          "Generating AI questions...",
          "Formatting assessment...",
          "Generation completed!",
        ],
      }
    )

    console.log(
      "Assignment generation completed:",
      assignmentId
    )
  },

  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
)

function delay(ms: number) {

  return new Promise(
    resolve =>
      setTimeout(resolve, ms)
  )
}