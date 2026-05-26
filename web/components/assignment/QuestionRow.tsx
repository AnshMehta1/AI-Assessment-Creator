import {
  ChevronDown,
  X
} from "lucide-react"

import CounterInput from "./CounterInput"

type Props = {
  title: string
  questions: number
  marks: number
}

export default function QuestionRow({
  title,
  questions,
  marks
}: Props) {
  return (
    <div className="flex items-center justify-between gap-6">
      
      <div className="flex items-center gap-3 flex-1">
        
        <div
          className="
            h-[44px]
            flex-1
            bg-white
            rounded-full
            px-4
            flex
            items-center
            justify-between
          "
        >
          <span className="text-[16px] font-medium text-[#303030]">
            {title}
          </span>

          <ChevronDown size={16} />
        </div>

        <button>
          <X size={16} />
        </button>
      </div>

      <CounterInput value={questions} />

      <CounterInput value={marks} />
    </div>
  )
}