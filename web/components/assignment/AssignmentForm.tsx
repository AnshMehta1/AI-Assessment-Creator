import {
  Calendar,
  Plus,
  ArrowLeft,
  ArrowRight
} from "lucide-react"

import UploadBox from "./UploadBox"
import QuestionRow from "./QuestionRow"
import CounterInput from "./CounterInput"

export default function AssignmentForm() {
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
          bg-white/50
          rounded-[32px]
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

        {/* Upload */}
        <UploadBox />

        {/* Due Date */}
        <div className="space-y-2">
          
          <label className="font-bold text-[16px]">
            Due Date
          </label>

          <div
            className="
              h-[44px]
              border
              border-[#DADADA]
              rounded-full
              px-4
              flex
              items-center
              justify-between
            "
          >
            <span className="text-[#A9A9A9]">
              DD-MM-YYYY
            </span>

            <Calendar size={20} />
          </div>
        </div>

        {/* Questions */}
        <div className="flex gap-16">
          
          <div className="flex-1 space-y-4">
            
            <h3 className="font-bold text-[16px]">
              Question Type
            </h3>

            <QuestionRow
              title="Multiple Choice Questions"
              questions={4}
              marks={1}
            />

            <QuestionRow
              title="Short Questions"
              questions={3}
              marks={2}
            />

            <QuestionRow
              title="Diagram/Graph-Based Questions"
              questions={5}
              marks={5}
            />

            <QuestionRow
              title="Numerical Problems"
              questions={5}
              marks={5}
            />

            <button className="flex items-center gap-2 mt-2">
              
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

          {/* Right Stats */}
          <div className="flex gap-4 pt-10">
            
            <div className="space-y-4">
              <h4 className="font-medium">
                No. of Questions
              </h4>

              <CounterInput value={4} />
              <CounterInput value={3} />
              <CounterInput value={5} />
              <CounterInput value={5} />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">
                Marks
              </h4>

              <CounterInput value={1} />
              <CounterInput value={2} />
              <CounterInput value={5} />
              <CounterInput value={5} />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          
          <label className="font-bold text-[16px]">
            Additional Information (For better output)
          </label>

          <div
            className="
              h-[102px]
              border
              border-dashed
              border-[#DADADA]
              rounded-2xl
              p-4
              bg-white/25
            "
          >
            <p className="text-sm text-black/50">
              e.g Generate a question paper for 3 hour exam duration...
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          
          <button
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