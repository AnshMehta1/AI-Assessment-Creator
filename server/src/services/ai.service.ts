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
You are an expert school assessment generator.

Generate a COMPLETE structured question paper in VALID JSON format.

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

STRICT RULES:
- Generate sections like Section A, Section B, etc.
- Questions should be educational and properly formatted
- Difficulty must ONLY be:
  easy
  medium
  hard

- EVERY question MUST contain:
  - question
  - answer
  - difficulty
  - marks

- MCQ questions MUST ALSO contain:
  - options (array of 4 strings)

- Non-MCQ questions should NOT contain options

- Return ONLY VALID JSON
- DO NOT wrap in markdown
- DO NOT use backticks
- DO NOT explain anything
- DO NOT add extra text

EXPECTED JSON FORMAT:
{
  "title": "Computer Network Quiz",
  "instructions": "Answer all questions.",
  "sections": [
    {
      "title": "Section A",
      "instruction": "Answer all questions.",
      "questions": [
        {
          "question": "What is TCP?",
          "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
          ],
          "answer": "Option A",
          "difficulty": "easy",
          "marks": 1
        },
        {
          "question": "Explain OSI model.",
          "answer": "The OSI model consists of 7 layers...",
          "difficulty": "medium",
          "marks": 5
        }
      ]
    }
  ]
}
`

  try {

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

    const parsed =
      JSON.parse(cleaned)

    if (
      !parsed.sections ||
      !Array.isArray(
        parsed.sections
      )
    ) {

      throw new Error(
        "Invalid paper structure"
      )
    }

    const normalizedSections =
      parsed.sections.map(
        (section: any) => ({

          title:
            String(
              section.title || ""
            ),

          instruction:
            String(
              section.instruction || ""
            ),

          questions:
            Array.isArray(
              section.questions
            )
              ? section.questions.map(
                  (
                    question: any
                  ) => ({

                    question:
                      String(
                        question.question || ""
                      ),

                    options:
                      Array.isArray(
                        question.options
                      )
                        ? question.options.map(
                            (
                              option: any
                            ) =>
                              String(
                                option
                              )
                          )
                        : undefined,

                    answer:
                      String(
                        question.answer ||
                        "No answer provided"
                      ),

                    difficulty:
                      String(
                        question.difficulty ||
                        "easy"
                      ).toLowerCase(),

                    marks:
                      Number(
                        question.marks || 1
                      ),
                  })
                )
              : [],
        })
      )

    return {

      title:
        String(
          parsed.title ||
          input.title
        ),

      instructions:
        String(
          parsed.instructions ||
          input.instructions ||
          ""
        ),

      sections:
        normalizedSections,
    }

  } catch (error) {

    console.error(
      "AI Generation Failed:",
      error
    )

    throw new Error(
      "Failed to generate assessment"
    )
  }
}