import express from "express"

import Assignment from "../models/assignment.model"
import { upload } from "../middleware/upload"
import { assignmentQueue } from "../queues/assignment.queue"

const router = express.Router()

router.get(
  "/",

  async (_, res) => {
    try {

      const assignments =
        await Assignment.find()
          .sort({
            createdAt: -1,
          })

      res.json(assignments)

    } catch (error) {

      console.error(error)

      res.status(500).json({
        message:
          "Failed to fetch assignments",
      })
    }
  }
)

router.post(
  "/",

  upload.single("file"),

  async (req, res) => {

    try {

      const questions =
        JSON.parse(
          req.body.questions
        )

      const assignment =
        await Assignment.create({
          title:
            req.body.title,

          dueDate:
            req.body.dueDate,

          instructions:
            req.body.instructions,

          questions,

          fileUrl:
            req.file
              ? req.file.path
              : null,

          assignedOn:
            new Date().toLocaleDateString(
              "en-GB"
            ),

          status:
            "pending",

          generationLogs: [
            "Assignment created",
          ],
        })

      await assignmentQueue.add(
        "generate-paper",

        {
          assignmentId:
            assignment._id,
        }
      )

      res.status(201).json({
        success: true,

        assignment,
      })

    } catch (error) {

      console.error(error)

      res.status(500).json({
        message:
          "Failed to create assignment",
      })
    }
  }
)

router.get(
  "/:id",

  async (req, res) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        )

      if (!assignment) {
        return res
          .status(404)
          .json({
            message:
              "Assignment not found",
          })
      }

      res.json(assignment)

    } catch (error) {

      console.error(error)

      res.status(500).json({
        message:
          "Failed to fetch assignment",
      })
    }
  }
)

router.delete(
  "/:id",

  async (req, res) => {

    try {

      await Assignment.findByIdAndDelete(
        req.params.id
      )

      res.json({
        success: true,
      })

    } catch (error) {

      console.error(error)

      res.status(500).json({
        message:
          "Failed to delete assignment",
      })
    }
  }
)

export default router