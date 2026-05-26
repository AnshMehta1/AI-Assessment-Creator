import { UploadCloud } from "lucide-react"

export default function UploadBox() {
  return (
    <div className="space-y-3">
      
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
        <div
          className="
            w-10
            h-10
            rounded-lg
            bg-white
            flex
            items-center
            justify-center
          "
        >
          <UploadCloud size={24} />
        </div>

        <div>
          <p className="font-medium text-[16px]">
            Choose a file or drag & drop it here
          </p>

          <p className="text-sm text-gray-400 mt-1">
            JPEG, PNG, upto 10MB
          </p>
        </div>

        <button
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
      </div>

      <p className="text-center text-[16px] text-black/60">
        Upload images of your preferred document/image
      </p>
    </div>
  )
}