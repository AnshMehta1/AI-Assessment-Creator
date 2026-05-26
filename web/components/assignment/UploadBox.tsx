"use client"

import { UploadCloud } from "lucide-react"
import { useRef } from "react"

type Props = {
  file: File | null
  setFile: (file: File | null) => void
}

export default function UploadBox({
  file,
  setFile
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className="space-y-3">
      
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="
          border-[1.75px]
          border-dashed
          border-black/20
          rounded-3xl
          bg-white
          px-8
          py-10
          flex
          flex-col
          items-center
          text-center
          gap-4
        "
      >
        <UploadCloud size={28} />

        <div>
          <p className="font-medium text-[16px]">
            Choose a file or drag & drop it here
          </p>

          <p className="text-sm text-gray-400 mt-1">
            JPEG, PNG, PDF upto 10MB
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            bg-[#F6F6F6]
            rounded-full
            px-6
            py-2
            text-sm
            font-medium
          "
        >
          Browse Files
        </button>

        {file && (
          <p className="text-sm text-black/70">
            {file.name}
          </p>
        )}
      </div>

      <p className="text-center text-[16px] text-black/60">
        Upload images of your preferred document/image
      </p>
    </div>
  )
}