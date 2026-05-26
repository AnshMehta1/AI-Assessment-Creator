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
  const assignment =
    await Assignment.create(req.body)

  res.json(assignment)
})

export default router