import express from "express"

import Assignment from "../models/assignment.model"

const router = express.Router()

router.get("/", async (_, res) => {
  const assignments =
    await Assignment.find().sort({
      createdAt: -1,
    })

  res.json(assignments)
})

router.post("/", async (req, res) => {
  try {
    const assignment =
      await Assignment.create({
        ...req.body,

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
})

export default router