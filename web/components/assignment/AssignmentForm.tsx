"use client"

import { Calendar, Plus, ArrowLeft, ArrowRight } from "lucide-react"
import UploadBox from "./UploadBox"
import QuestionRow from "./QuestionRow"
import CounterInput from "./CounterInput"
import { useCreateAssignmentStore } from "@/store/create-assignment.store"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True/False Questions"
]

export default function AssignmentForm() {

  const {
    file,
    setFile,

    title,
    setTitle,

    dueDate,
    setDueDate,

    instructions,
    setInstructions,

    questions,
    setQuestions,
  } = useCreateAssignmentStore()

  const router = useRouter()

  const addQuestionType = () => {
    setQuestions([
      ...questions,

      {
        id: crypto.randomUUID(),
        type: "New Question Type",
        count: 1,
        marks: 1
      }
    ])
  }

  const removeQuestion = (
    id: string
  ) => {
    setQuestions(
      questions.filter(
        q => q.id !== id
      )
    )
  }

  const updateQuestionType = (
    id: string,
    value: string
  ) => {
    setQuestions(
      questions.map(q => {
        if (q.id !== id) return q

        return {
          ...q,
          type: value
        }
      })
    )
  }

  const updateCount = (
    id: string,
    direction:
      | "increment"
      | "decrement"
  ) => {
    setQuestions(
      questions.map(q => {
        if (q.id !== id) return q

        return {
          ...q,

          count:
            direction === "increment"
              ? q.count + 1
              : Math.max(
                0,
                q.count - 1
              )
        }
      })
    )
  }

  const updateMarks = (
    id: string,
    direction:
      | "increment"
      | "decrement"
  ) => {
    setQuestions(
      questions.map(q => {
        if (q.id !== id) return q

        return {
          ...q,

          marks:
            direction === "increment"
              ? q.marks + 1
              : Math.max(
                0,
                q.marks - 1
              )
        }
      })
    )
  }

  const createAssignment =
    async () => {
      if (!title.trim()) {
        alert("Please enter assignment title")
        return
      }

      if (!dueDate) {
        alert("Please select due date")
        return
      }

      try {

        const formData =
          new FormData()

        formData.append(
          "title",
          title
        )

        formData.append(
          "dueDate",
          dueDate
        )

        formData.append(
          "instructions",
          instructions
        )

        formData.append(
          "questions",

          JSON.stringify(
            questions
          )
        )

        if (file) {
          formData.append(
            "file",
            file
          )
        }

        const res =
          await api.post(
            "/assignments",

            formData,

            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          )

        router.push(
          `/generate?id=${res.data.assignment._id}`
        )
      } catch (error) {
        console.error("Failed to create assignment", error)
      }
    }

  const totalQuestions =
    questions.reduce(
      (acc, q) => acc + q.count,
      0
    )

  const totalMarks =
    questions.reduce(
      (acc, q) =>
        acc + q.count * q.marks,
      0
    )

  return (
    <div className="max-w-[1103px] mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div
          className="
            w-3
            h-3
            rounded-full
            bg-[#4BC26D]
            border-4
            border-[#4BC26D66]
          "
        />

        <div>
          <h1 className="text-[20px] font-bold tracking-[-0.04em]">
            Create Assignment
          </h1>

          <p className="text-[14px] text-black/50">
            Set up a new assignment for your students
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex">
        <div className="h-[5px] bg-[#5E5E5E] flex-1 rounded-full" />
        <div className="h-[5px] bg-[#DADADA] flex-1 rounded-full" />
      </div>

      {/* Main Card */}
      <div
        className="
          glass-card
          dashboard-card
          soft-shadow
          p-8
          flex
          flex-col
          gap-8
        "
      >

        {/* Section Header */}
        <div>
          <h2 className="text-[20px] font-bold tracking-[-0.04em]">
            Assignment Details
          </h2>

          <p className="text-[14px] text-black/60">
            Basic information about your assignment
          </p>
        </div>

        {/* Assignment Title */}
        <div className="space-y-2">

          <label className="font-bold text-[16px]">
            Assignment Title
          </label>

          <input
            value={title}
            onChange={e =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Enter assignment title"
            className="
              w-full
              h-[52px]
              rounded-full
              border
              border-[#DADADA]
              bg-white
              px-5
              outline-none
            "
          />
        </div>

        {/* Upload */}
        <UploadBox
          file={file}
          setFile={setFile}
        />

        {/* Due Date */}
        <div className="space-y-2">

          <label className="font-bold text-[16px]">
            Due Date
          </label>

          <div className="relative">

            <input
              type="date"

              value={dueDate}

              onChange={e =>
                setDueDate(
                  e.target.value
                )
              }

              className="
                w-full
                h-[44px]
                border
                border-[#DADADA]
                rounded-full
                px-4
                pr-12
                bg-white
                outline-none
                text-[14px]
                text-[#303030]
              "
            />

            <Calendar
              size={18}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-black/60
                pointer-events-none
              "
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">

          {/* Header Row */}
          <div
            className="
              grid
              grid-cols-[1fr_120px_120px]
              gap-6
              items-center
              px-2
            "
          >
            <h3 className="font-bold text-[16px]">
              Question Type
            </h3>

            <h3 className="font-medium text-[16px] text-center">
              No. of Questions
            </h3>

            <h3 className="font-medium text-[16px] text-center">
              Marks
            </h3>
          </div>

          {/* Dynamic Rows */}
          {questions.map(question => (
            <div
              key={question.id}
              className="
                grid
                grid-cols-[1fr_120px_120px]
                gap-6
                items-center
              "
            >

              {/* Question Type */}
              <QuestionRow
                title={question.type}

                options={QUESTION_TYPES}

                onChange={value =>
                  updateQuestionType(
                    question.id,
                    value
                  )
                }

                onRemove={() =>
                  removeQuestion(
                    question.id
                  )
                }
              />

              {/* Count */}
              <div className="flex justify-center">
                <CounterInput
                  value={question.count}

                  onIncrement={() =>
                    updateCount(
                      question.id,
                      "increment"
                    )
                  }

                  onDecrement={() =>
                    updateCount(
                      question.id,
                      "decrement"
                    )
                  }
                />
              </div>

              {/* Marks */}
              <div className="flex justify-center">
                <CounterInput
                  value={question.marks}

                  onIncrement={() =>
                    updateMarks(
                      question.id,
                      "increment"
                    )
                  }

                  onDecrement={() =>
                    updateMarks(
                      question.id,
                      "decrement"
                    )
                  }
                />
              </div>
            </div>
          ))}

          {/* Add Question */}
          <button
            type="button"

            onClick={addQuestionType}

            className="
              flex
              items-center
              gap-2
              mt-2
            "
          >

            <div
              className="
                w-9
                h-9
                rounded-full
                bg-[#2B2B2B]
                flex
                items-center
                justify-center
              "
            >
              <Plus
                size={18}
                className="text-white"
              />
            </div>

            <span className="font-bold text-sm">
              Add Question Type
            </span>
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end">

          <div className="text-right space-y-1">

            <p className="text-sm">
              Total Questions:
              {" "}
              {totalQuestions}
            </p>

            <p className="text-sm">
              Total Marks:
              {" "}
              {totalMarks}
            </p>

          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">

          <label className="font-bold text-[16px]">
            Additional Information (For better output)
          </label>

          <textarea

            value={instructions}

            onChange={e =>
              setInstructions(
                e.target.value
              )
            }

            className="
              w-full
              h-[102px]
              border
              border-dashed
              border-[#DADADA]
              rounded-2xl
              p-4
              bg-white/25
              resize-none
              outline-none
            "

            placeholder="
              e.g Generate a question paper for 3 hour exam duration...
            "
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              window.location.href = "/"
            }

            className="
              h-[46px]
              px-6
              rounded-full
              bg-white
              flex
              items-center
              gap-2
            "
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <button
            onClick={
              createAssignment
            }

            className="
              h-[46px]
              px-6
              rounded-full
              bg-[#181818]
              text-white
              flex
              items-center
              gap-2
            "
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}