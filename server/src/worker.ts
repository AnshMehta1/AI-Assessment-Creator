import dotenv from "dotenv"

import { connectDB } from "./config/db"

dotenv.config()

connectDB()

import "./workers/assignment.worker"

console.log(
  "Assignment worker started..."
)