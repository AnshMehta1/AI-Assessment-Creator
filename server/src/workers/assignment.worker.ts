import { Worker } from "bullmq"

import mongoose from "mongoose"

import IORedis from "ioredis"

import Assignment from "../models/assignment.model"

import { generateAssessment } from "../services/ai.service"

import { extractTextFromFile } from "../services/extract-text.service"

process.on(
  "unhandledRejection",
  console.error
)

process.on(
  "uncaughtException",
  console.error
)

const connection =
  new IORedis(
    process.env.REDIS_URL!,
    {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    }
  )

async function startWorker() {

  try {

    await mongoose.connect(
      process.env.MONGO_URI!
    )

    console.log(
      "Worker MongoDB Connected"
    )

    const worker =
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
              assignment.fileUrl
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
                    assignment.fileUrl
                  )

              } catch (error) {

                console.error(
                  "Text extraction failed:",
                  error
                )
              }
            }

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
          connection:
            connection.duplicate() as any,
        }
      )

    worker.on(
      "completed",

      job => {

        console.log(
          `Job ${job.id} completed`
        )
      }
    )

    worker.on(
      "failed",

      (
        job,
        error
      ) => {

        console.error(
          `Job ${job?.id} failed:`,
          error
        )
      }
    )

  } catch (error) {

    console.error(
      "Worker startup failed:",
      error
    )
  }
}

startWorker()

function delay(ms: number) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  )
}