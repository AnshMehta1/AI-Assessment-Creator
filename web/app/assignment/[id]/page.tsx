"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Download } from "lucide-react"
import { api } from "@/lib/api"
import type { Assignment } from "@/store/create-assignment.store"

export default function AssignmentPage() {

  const params =
    useParams()

  const [assignment, setAssignment] =
    useState<Assignment | null>(
      null
    )

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

          setAssignment(
            res.data
          )

        } catch (error) {

          console.error(error)

        } finally {

          setLoading(false)
        }
      }

    fetchAssignment()

  }, [params.id])

  if (loading) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F5F5F5]
        "
      >
        Loading...
      </div>
    )
  }

  if (!assignment) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F5F5F5]
        "
      >
        Assignment not found
      </div>
    )
  }

  if (!assignment.generatedPaper) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F5F5F5]
        "
      >
        No generated paper found
      </div>
    )
  }

  const paper =
    assignment.generatedPaper

  return (
    <main
      className="
        min-h-screen
        bg-[#F5F5F5]
        px-6
        py-8
      "
    >

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1100px]
          flex-col
          gap-3
          rounded-[32px]
          bg-[#5E5E5E]
          p-5
        "
      >

        {/* TOP BANNER */}
        <div
          className="
            flex
            flex-col
            items-start
            gap-6
            rounded-[32px]
            bg-[rgba(24,24,24,0.8)]
            px-8
            py-6
          "
        >

          <p
            className="
              max-w-[950px]
              text-[20px]
              font-bold
              leading-[140%]
              tracking-[-0.04em]
              text-white
            "
          >
            Certainly!
            Here is the customized
            Question Paper.
          </p>

          <button
            onClick={() =>
              window.print()
            }

            className="
              flex
              h-[44px]
              items-center
              justify-center
              gap-2
              rounded-full
              bg-white
              px-6
              text-[#303030]
              transition-all
              duration-200
              hover:scale-[1.02]
            "
          >

            <Download size={18} />

            <span
              className="
                text-[16px]
                font-medium
                tracking-[-0.04em]
              "
            >
              Download as PDF
            </span>
          </button>
        </div>

        {/* PAPER */}
        <div
          className="
            flex
            flex-col
            items-center
            rounded-[32px]
            bg-white
            px-[32px]
            py-[32px]
          "
        >

          {/* HEADER */}
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
                text-[24px]
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
                text-[24px]
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
              mt-[24px]
              flex
              w-full
              items-center
              justify-between
            "
          >

            <p
              className="
                text-[18px]
                font-semibold
              "
            >
              Time Allowed:
              45 minutes
            </p>

            <p
              className="
                text-[18px]
                font-semibold
              "
            >
              Maximum Marks: 20
            </p>
          </div>

          {/* INSTRUCTIONS */}
          <div
            className="
              mt-[24px]
              w-full
            "
          >

            <p
              className="
                text-[18px]
                font-semibold
              "
            >
              All questions are
              compulsory unless
              stated otherwise.
            </p>
          </div>

          {/* STUDENT INFO */}
          <div
            className="
              mt-[24px]
              flex
              w-full
              flex-col
              gap-1
            "
          >

            <p
              className="
                text-[18px]
                font-semibold
              "
            >
              Name:
              ____________________
            </p>

            <p
              className="
                text-[18px]
                font-semibold
              "
            >
              Roll Number:
              ____________________
            </p>

            <p
              className="
                text-[18px]
                font-semibold
              "
            >
              Class:
              5th
              Section:
              ____________
            </p>
          </div>

          {/* SECTIONS */}
          <div
            className="
              mt-[48px]
              flex
              w-full
              flex-col
              gap-[48px]
            "
          >

            {paper.sections.map(
              (
                section,
                sectionIndex
              ) => (

                <div
                  key={sectionIndex}
                  className="
                    w-full
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

                  {/* SECTION INSTRUCTION */}
                  <div
                    className="
                      mt-[32px]
                    "
                  >
                    <p
                      className="
                        text-[14px]
                        italic
                        text-[#6B6B6B]
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
                      mt-[24px]
                      flex
                      flex-col
                      gap-[16px]
                    "
                  >

                    {section.questions.map(
                      (
                        question,
                        questionIndex
                      ) => (

                        <div
                          key={questionIndex}

                          className="
                            text-[16px]
                            leading-[240%]
                            tracking-[-0.04em]
                            text-[#303030]
                          "
                        >

                          {/* QUESTION */}
                          <p>

                            {questionIndex + 1}.
                            {" "}

                            <span
                              className="
                                font-medium
                              "
                            >
                              [
                              {String(
                                question.difficulty
                              )}
                              ]
                            </span>

                            {" "}

                            {String(
                              question.question
                            )}

                            {" "}

                            [
                            {String(
                              question.marks
                            )}
                            {" "}
                            Marks
                            ]

                          </p>

                          {/* MCQ OPTIONS */}
                          {Array.isArray(
                            question.options
                          ) && (
                            <div
                              className="
                                ml-[28px]
                                mt-[10px]
                                flex
                                flex-col
                                gap-[6px]
                              "
                            >

                              {question.options.map(
                                (
                                  option,
                                  optionIndex
                                ) => (

                                  <p
                                    key={optionIndex}
                                    className="
                                      text-[15px]
                                      text-[#4B4B4B]
                                    "
                                  >
                                    {String(option)}
                                  </p>
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
          </div>

          {/* END */}
          <div
            className="
              mt-[32px]
              w-full
            "
          >

            <p
              className="
                text-[18px]
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
              mt-[48px]
              w-full
            "
          >

            <h2
              className="
                text-[24px]
                font-bold
                leading-[160%]
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Answer Key:
            </h2>

            <div
              className="
                mt-[24px]
                flex
                flex-col
                gap-[12px]
              "
            >

              {paper.sections
                .flatMap(
                  section =>
                    section.questions
                )
                .map(
                  (
                    question,
                    index
                  ) => (

                    <div
                      key={index}

                      className="
                        text-[16px]
                        leading-[200%]
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

                      {typeof question.answer === "string"
                        ? question.answer
                        : "Answer unavailable"}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}