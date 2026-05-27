import express from "express"

import Assignment from "../models/assignment.model"
import { upload } from "../middleware/upload"

const router = express.Router()

router.get("/", async (_, res) => {
  const assignments =
    await Assignment.find().sort({
      createdAt: -1,
    })

  res.json(assignments)
})

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
        })

      res.status(201).json(
        assignment
      )

    } catch (error) {

      console.error(error)

      res.status(500).json({
        message:
          "Failed to create assignment",
      })
    }
  }
)

router.delete(
  "/:id",

  async (req, res) => {
    await Assignment.findByIdAndDelete(
      req.params.id
    )

    res.json({
      success: true
    })
  }
)

export default router