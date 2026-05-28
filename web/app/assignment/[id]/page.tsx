"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { api } from "@/lib/api"
import type { Assignment, GeneratedQuestion } from "@/store/create-assignment.store"

export default function AssignmentPage() {

  const params = useParams()
  const router = useRouter()

  const [assignment, setAssignment] =
    useState<Assignment | null>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchAssignment =
      async () => {

        try {

          const res =
            await api.get(
              `/assignments/${params.id}`
            )

          setAssignment(res.data)

        } catch (error) {

          console.error(error)

        } finally {

          setLoading(false)
        }
      }

    fetchAssignment()

  }, [params.id])

  const downloadPDF =
    async () => {

      const input =
        document.getElementById(
          "paper"
        )

      if (!input) return

      const canvas =
        await html2canvas(input, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#5E5E5E",
        })

      const imgData =
        canvas.toDataURL("image/png")

      const pdf =
        new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        })

      const pdfWidth =
        pdf.internal.pageSize.getWidth()

      const pdfHeight =
        (canvas.height * pdfWidth) /
        canvas.width

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      )

      pdf.save(
        `${assignment?.title}.pdf`
      )
    }

  if (loading) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    )
  }

  if (
    !assignment ||
    !assignment.generatedPaper
  ) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
      >
        No paper found
      </div>
    )
  }

  const paper =
    assignment.generatedPaper

  const allQuestions =
    paper.sections.flatMap(
      section =>
        section.questions
    )
  
  const totalMarks =
    allQuestions.reduce(
      (sum, question) =>
        sum + question.marks,
      0
    )

  const rawEstimatedTime =
    allQuestions.reduce(
      (total, question) => {

        const difficulty =
          question.difficulty?.toLowerCase()

        if (
          difficulty === "easy"
        ) {
          return total + 2
        }

        if (
          difficulty === "medium"
        ) {
          return total + 5
        }

        if (
          difficulty === "hard"
        ) {
          return total + 10
        }

        return total + 3
      },

      0
    )

  const estimatedTime =
    Math.round(
      rawEstimatedTime / 5
    ) * 5

  return (
    <main
      className="
        min-h-screen
        bg-[#EAEAEA]
        py-10
      "
    >

      <div
        className="
          mx-auto
          flex
          w-[1100px]
          flex-col
          gap-3
          rounded-[32px]
          bg-[#5E5E5E]
          p-5
        "
      >

        {/* TOP HEADER */}
        <div
          className="
            flex
            flex-col
            gap-6
            rounded-[32px]
            bg-[#181818CC]
            px-8
            py-6
          "
        >

          <p
            className="
              text-[20px]
              font-bold
              leading-[140%]
              tracking-[-0.04em]
              text-white
            "
          >
            Certainly! Here is the
            customized Question Paper.
          </p>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* BACK BUTTON */}
            <button
              onClick={() =>
                router.push("/")
              }

              className="
                flex
                h-[44px]
                items-center
                justify-center
                rounded-full
                bg-white
                px-5
                text-[16px]
                font-medium
                tracking-[-0.04em]
                text-[#303030]
                shadow-sm
                transition-all
                duration-200
                hover:scale-[1.02]
              "
            >
              ← Assignments
            </button>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={downloadPDF}

              className="
                flex
                h-[44px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-6
                text-[16px]
                font-medium
                tracking-[-0.04em]
                text-[#303030]
                shadow-sm
                transition-all
                duration-200
                hover:scale-[1.02]
              "
            >

              <Download
                size={16}
              />

              Download as PDF
            </button>
          </div>
        </div>

        {/* PAPER */}
        <div
          id="paper"

          className="
            flex
            flex-col
            items-center
            gap-6
            rounded-[32px]
            bg-white
            px-8
            py-8
          "
        >

          {/* SCHOOL HEADER */}
          <div
            className="
              w-full
              text-center
            "
          >

            <h1
              className="
                text-[32px]
                font-bold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Delhi Public School,
              Sector-4, Bokaro
            </h1>

            <p
              className="
                text-[20px]
                font-semibold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Subject:
              {" "}
              {assignment.title}
            </p>

            <p
              className="
                text-[20px]
                font-semibold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Class: 5th
            </p>
          </div>

          {/* META */}
          <div
            className="
              flex
              w-full
              justify-between
            "
          >

            <p
              className="
                text-[18px]
                font-semibold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Time Allowed:
              {" "}
              {estimatedTime} minutes
            </p>

            <p
              className="
                text-[18px]
                font-semibold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Maximum Marks:
              {" "}
              {totalMarks}
            </p>
          </div>

          {/* GENERAL */}
          <div
            className="
              w-full
            "
          >

            <p
              className="
                text-[18px]
                font-semibold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              All questions are compulsory
              unless stated otherwise.
            </p>
          </div>

          {/* STUDENT INFO */}
          <div
            className="
              flex
              w-full
              flex-col
            "
          >

            <p
              className="
                text-[18px]
                font-semibold
                leading-[160%]
              "
            >
              Name:
              ____________________
            </p>

            <p
              className="
                text-[18px]
                font-semibold
                leading-[160%]
              "
            >
              Roll Number:
              ____________________
            </p>

            <p
              className="
                text-[18px]
                font-semibold
                leading-[160%]
              "
            >
              Class: 5th
              {" "}
              Section:
              {" "}
              __________
            </p>
          </div>

          {/* SECTIONS */}
          {paper.sections.map(
            (
              section,
              sectionIndex
            ) => (

              <div
                key={sectionIndex}

                className="
                  mt-6
                  flex
                  w-full
                  flex-col
                  gap-6
                "
              >

                {/* SECTION TITLE */}
                <div
                  className="
                    flex
                    justify-center
                  "
                >

                  <h2
                    className="
                      text-[24px]
                      font-semibold
                      leading-[160%]
                      tracking-[-0.04em]
                      text-[#303030]
                    "
                  >
                    {section.title}
                  </h2>
                </div>

                {/* INSTRUCTION */}
                <div>

                  <p
                    className="
                      text-[18px]
                      font-semibold
                      italic
                      leading-[160%]
                      tracking-[-0.04em]
                      text-[#303030]
                    "
                  >
                    {
                      section.instruction
                    }
                  </p>
                </div>

                {/* QUESTIONS */}
                <div
                  className="
                    flex
                    flex-col
                    gap-8
                  "
                >

                  {section.questions.map(
                    (
                      question:
                        GeneratedQuestion,
                      questionIndex
                    ) => (

                      <div
                        key={questionIndex}
                      >

                        <p
                          className="
                            text-[16px]
                            leading-[240%]
                            tracking-[-0.04em]
                            text-[#303030]
                          "
                        >

                          <span
                            className="
                              font-semibold
                            "
                          >
                            {
                              questionIndex + 1
                            }.
                          </span>

                          {" "}

                          [
                          {
                            question.difficulty
                          }
                          ]

                          {" "}

                          {
                            question.question
                          }

                          {" "}

                          [
                          {
                            question.marks
                          }
                          {" "}
                          Marks ]
                        </p>

                        {/* OPTIONS */}
                        {question.options &&
                          question.options.length > 0 && (

                          <div
                            className="
                              mt-3
                              ml-6
                              flex
                              flex-col
                              gap-2
                            "
                          >

                            {question.options.map(
                              (
                                option,
                                optionIndex
                              ) => (

                                <div
                                  key={optionIndex}

                                  className="
                                    flex
                                    gap-3
                                  "
                                >

                                  <span
                                    className="
                                      text-[15px]
                                      leading-[240%]
                                    "
                                  >
                                    {
                                      String.fromCharCode(
                                        65 +
                                        optionIndex
                                      )
                                    }.
                                  </span>

                                  <p
                                    className="
                                      text-[15px]
                                      leading-[240%]
                                      tracking-[-0.04em]
                                      text-[#303030]
                                    "
                                  >
                                    {option}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}

          {/* END */}
          <div
            className="
              mt-4
              w-full
            "
          >

            <p
              className="
                text-[24px]
                font-bold
                text-[#303030]
              "
            >
              End of Question Paper
            </p>
          </div>

          {/* ANSWER KEY */}
          <div
            className="
              mt-8
              flex
              w-full
              flex-col
              gap-4
            "
          >

            <h2
              className="
                text-[24px]
                font-bold
                text-[#303030]
              "
            >
              Answer Key:
            </h2>

            {allQuestions.map(
              (
                question:
                  GeneratedQuestion,
                index
              ) => (

                <div
                  key={index}
                >

                  <p
                    className="
                      text-[16px]
                      leading-[240%]
                      tracking-[-0.04em]
                      text-[#303030]
                    "
                  >

                    <span
                      className="
                        font-semibold
                      "
                    >
                      {index + 1}.
                    </span>

                    {" "}

                    {
                      question.answer
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  )
}