"use client"

import { Minus, Plus } from "lucide-react"

type Props = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

export default function CounterInput({
  value,
  onIncrement,
  onDecrement
}: Props) {
  return (
    <div
      className="
        w-[100px]
        h-[44px]
        bg-white
        rounded-full
        border
        border-[#EAEAEA]
        flex
        items-center
        justify-between
        px-3
      "
    >
      <button
        type="button"
        onClick={onDecrement}
        className="
          text-[#CFCFCF]
          hover:text-black
          transition
        "
      >
        <Minus size={16} />
      </button>

      <span className="text-[16px] font-medium">
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        className="
          text-[#CFCFCF]
          hover:text-black
          transition
        "
      >
        <Plus size={16} />
      </button>
    </div>
  )
}