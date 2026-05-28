import fs from "fs"
import path from "path"
import pdf from "pdf-parse"
import mammoth from "mammoth"

export async function extractTextFromFile(
  filePath: string
) {

  const ext =
    path.extname(filePath)
      .toLowerCase()

  if (ext === ".pdf") {

    const dataBuffer =
      fs.readFileSync(
        filePath
      )

    const data =
      await pdf(
        dataBuffer
      )

    return data.text
  }

  if (
    ext === ".docx"
  ) {

    const result =
      await mammoth.extractRawText({
        path: filePath,
      })

    return result.value
  }

  if (ext === ".txt") {

    return fs.readFileSync(
      filePath,
      "utf-8"
    )
  }

  return ""
}