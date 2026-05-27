import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  )

const model =
  genAI.getGenerativeModel({
    model:
      "gemini-2.5-flash",
  })

type GenerateInput = {
  title: string

  instructions?: string

  questions: {
    type: string
    count: number
    marks: number
  }[]

  material?: string
}

export async function generateAssessment(
  input: GenerateInput
) {

  const prompt = `
You are an expert assessment generator.

Generate a structured assignment in VALID JSON.

TITLE:
${input.title}

INSTRUCTIONS:
${input.instructions || "None"}

QUESTION REQUIREMENTS:
${JSON.stringify(
  input.questions,
  null,
  2
)}

REFERENCE MATERIAL:
${input.material || "None"}

RULES:
- Generate sections like Section A, Section B
- Each question must contain:
  - question
  - difficulty
  - marks
- Return ONLY VALID JSON
- No markdown
- No explanations
- No backticks

EXPECTED FORMAT:
{
  "sections": [
    {
      "title": "Section A",
      "instruction": "...",
      "questions": [
        {
          "question": "...",
          "difficulty": "easy",
          "marks": 5
        }
      ]
    }
  ]
}
`

  const result =
    await model.generateContent(
      prompt
    )

  const response =
    result.response.text()

  const cleaned =
    response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

  console.log(
    "Gemini Response:",
    cleaned
  )

  try {

    return JSON.parse(cleaned)

  } catch {

    throw new Error(
      "Failed to parse Gemini JSON"
    )
  }
}