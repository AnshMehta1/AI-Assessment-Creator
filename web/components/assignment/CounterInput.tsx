"use client"

import { Minus, Plus } from "lucide-react"

type Props = {
  value: number
}

export default function CounterInput({
  value
}: Props) {
  return (
    <div
      className="
        w-[100px]
        h-[44px]
        bg-white
        rounded-full
        flex
        items-center
        justify-between
        px-3
      "
    >
      <button>
        <Minus
          size={16}
          className="text-gray-300"
        />
      </button>

      <span className="text-[16px] font-medium">
        {value}
      </span>

      <button>
        <Plus
          size={16}
          className="text-gray-300"
        />
      </button>
    </div>
  )
}