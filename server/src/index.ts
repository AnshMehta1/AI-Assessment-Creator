import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import { createServer } from "http"
import { initSocket } from "./socket"
import { connectDB } from "./config/db"
import assignmentRoutes from "./routes/assignment.routes"

dotenv.config()

connectDB()

const app = express()

const httpServer =
  createServer(app)

const io =
  initSocket(httpServer)

app.use(cors())
app.use(express.json())

app.use(
  "/uploads",

  express.static(
    path.join(
      __dirname,
      "../uploads"
    )
  )
)

app.use(
  "/api/assignments",
  assignmentRoutes
)

io.on("connection", socket => {

  console.log(
    "Socket connected:",
    socket.id
  )

  socket.on(
    "disconnect",

    () => {
      console.log(
        "Socket disconnected:",
        socket.id
      )
    }
  )
})

app.get("/", (_, res) => {
  res.send("Backend Running")
})

const PORT =
  process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  )
})