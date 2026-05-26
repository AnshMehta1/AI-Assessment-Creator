import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDB } from "./config/db"
import assignmentRoutes from "./routes/assignment.routes"

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use(
  "/api/assignments",
  assignmentRoutes
)

app.get("/", (_, res) => {
  res.send("Backend Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  )
})