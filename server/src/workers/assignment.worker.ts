import { Worker } from "bullmq"

import Assignment from "../models/assignment.model"
import { generateAssessment } from "../services/ai.service"
import { extractTextFromFile } from "../services/extract-text.service"

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

    try {

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

      await delay(1500)

      const assignment =
        await Assignment.findById(
          assignmentId
        )

      if (!assignment) {

        throw new Error(
          "Assignment not found"
        )
      }

      let extractedMaterial = ""

      if (
        assignment.filePath
      ) {

        await Assignment.findByIdAndUpdate(
          assignmentId,

          {
            generationLogs: [
              "Assignment created",
              "Processing uploaded files...",
              "Extracting study material...",
            ],
          }
        )

        try {

          extractedMaterial =
            await extractTextFromFile(
              assignment.filePath
            )

          console.log(
            "Extracted Material:",
            extractedMaterial.slice(
              0,
              1000
            )
          )

        } catch (error) {

          console.error(
            "Text extraction failed:",
            error
          )
        }
      }

      await delay(1000)

      await Assignment.findByIdAndUpdate(
        assignmentId,

        {
          generationLogs: [
            "Assignment created",
            "Processing uploaded files...",
            "Extracting study material...",
            "Generating AI questions...",
          ],
        }
      )

      const generatedPaper =
        await generateAssessment({
          title:
            assignment.title,

          instructions:
            assignment.instructions || undefined,

          questions:
            JSON.parse(
              JSON.stringify(
                assignment.questions
              )
            ),

          material:
            extractedMaterial.slice(
              0,
              15000
            ),
        })

      await delay(1500)

      await Assignment.findByIdAndUpdate(
        assignmentId,

        {
          generationLogs: [
            "Assignment created",
            "Processing uploaded files...",
            "Extracting study material...",
            "Generating AI questions...",
            "Formatting assessment...",
          ],
        }
      )

      await delay(1000)

      await Assignment.findByIdAndUpdate(
        assignmentId,

        {
          generatedPaper,

          status:
            "completed",

          generationLogs: [
            "Assignment created",
            "Processing uploaded files...",
            "Extracting study material...",
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

    } catch (error) {

      console.error(
        "AI Generation Failed:",
        error
      )

      await Assignment.findByIdAndUpdate(
        assignmentId,

        {
          status:
            "failed",

          generationLogs: [
            "Assignment created",
            "Generation failed",
          ],
        }
      )
    }
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