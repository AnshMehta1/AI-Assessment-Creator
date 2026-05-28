"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"

function GenerateContent() {

  const searchParams =
    useSearchParams()

  const router =
    useRouter()

  const assignmentId =
    searchParams.get("id")

  const [logs, setLogs] =
    useState<string[]>([])

  useEffect(() => {

    if (!assignmentId) {
      return
    }

    const interval =
      setInterval(
        async () => {

          try {

            const res =
              await api.get(
                `/assignments/${assignmentId}`
              )

            const assignment =
              res.data

            setLogs([
              ...(assignment.generationLogs || []),
            ])

            if (
              assignment.status ===
              "completed"
            ) {

              clearInterval(
                interval
              )

              setTimeout(() => {

                router.push(
                  `/assignment/${assignmentId}`
                )

              }, 1500)
            }

          } catch (error) {

            console.error(
              error
            )
          }
        },

        2000
      )

    return () =>
      clearInterval(
        interval
      )

  }, [
    assignmentId,
    router,
  ])

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#F5F5F5]
        px-6
      "
    >

      <div
        className="
          w-full
          max-w-[720px]
          rounded-[36px]
          bg-white
          p-10
          shadow-sm
        "
      >

        <h1
          className="
            text-[36px]
            font-bold
            tracking-[-0.04em]
            text-[#181818]
          "
        >
          Generating Assignment...
        </h1>

        <div
          className="
            mt-8
            space-y-4
          "
        >

          {logs.map(
            (log, index) => (

              <div
                key={index}

                className="
                  flex
                  h-[56px]
                  items-center
                  rounded-2xl
                  bg-[#F6F6F6]
                  px-5
                  text-[15px]
                  text-[#181818]
                "
              >
                ✓ {log}
              </div>
            )
          )}
        </div>
      </div>
    </main>
  )
}

export default function GeneratePage() {

  return (

    <Suspense
      fallback={

        <main
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#F5F5F5]
          "
        >

          <div
            className="
              text-[18px]
              font-medium
              text-[#181818]
            "
          >
            Loading...
          </div>
        </main>
      }
    >

      <GenerateContent />

    </Suspense>
  )
}