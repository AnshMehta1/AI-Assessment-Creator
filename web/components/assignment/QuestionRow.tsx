import {
  ChevronDown,
  X
} from "lucide-react"

type Props = {
  title: string
  onRemove: () => void
}

export default function QuestionRow({
  title,
  onRemove
}: Props) {
  return (
    <div className="flex items-center gap-3">
      
      {/* Dropdown */}
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
          border
          border-[#EAEAEA]
        "
      >
        <span
          className="
            text-[16px]
            font-medium
            text-[#303030]
            truncate
          "
        >
          {title}
        </span>

        <ChevronDown
          size={16}
          className="shrink-0"
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