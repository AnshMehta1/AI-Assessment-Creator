"use client"

import {
  ChevronDown,
  X
} from "lucide-react"

type Props = {
  title: string
  options: string[]
  onChange: (
    value: string
  ) => void
  onRemove: () => void
}

export default function QuestionRow({
  title,
  options,
  onChange,
  onRemove
}: Props) {
  return (
    <div className="flex items-center gap-3">
      
      {/* Select */}
      <div className="relative flex-1">
        
        <select
          value={title}
          onChange={e =>
            onChange(e.target.value)
          }
          className="
            w-full
            h-[44px]
            bg-white
            rounded-full
            px-4
            pr-10
            border
            border-[#EAEAEA]
            appearance-none
            outline-none
            text-[16px]
            font-medium
            text-[#303030]
          "
        >
          {options.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            pointer-events-none
            text-black/60
          "
        />
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="
          shrink-0
          text-black/70
          hover:text-black
          transition
        "
      >
        <X size={16} />
      </button>
    </div>
  )
}