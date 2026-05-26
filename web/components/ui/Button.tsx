import { ButtonHTMLAttributes } from "react"

type Props =
  ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(
  props: Props
) {
  return (
    <button
      {...props}
      className="
        bg-black
        text-white
        rounded-xl
        px-6
        py-3
        font-medium
        hover:opacity-90
        transition
      "
    />
  )
}