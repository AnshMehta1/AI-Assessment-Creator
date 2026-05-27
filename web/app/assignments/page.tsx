"use client"

import { Filter, MoreVertical, Plus, Search } from "lucide-react"
import { useEffect, useState} from "react"
import { api } from "@/lib/api"
import { useAssignmentStore } from "@/store/assignment.store"

export default function AssignmentsPage() {
  const {
    assignments,
    loading,
    setAssignments,
    setLoading,
    removeAssignment,
  } = useAssignmentStore()

  const [openMenu, setOpenMenu] =
    useState<string | null>(null)

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments =
    async () => {
      try {
        setLoading(true)

        const res =
          await api.get("/assignments")

        setAssignments(res.data)
      } catch (error) {
        console.error(
          "Error fetching assignments:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

  const deleteAssignment =
    async (id: string) => {
      try {
        await api.delete(
          `/assignments/${id}`
        )

        removeAssignment(id)
      } catch (error) {
        console.error(
          "Delete failed:",
          error
        )
      }
    }

  const isEmpty =
    assignments.length === 0

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-8 pb-40">
      
      <div className="mx-auto max-w-[1100px] space-y-5">
        
        {/* Header */}
        <div className="flex items-center gap-3 px-2">
          
          <div
            className="
              h-3
              w-3
              rounded-full
              border-[4px]
              border-[#4BC26D66]
              bg-[#4BC26D]
            "
          />

          <div>
            <h1
              className="
                text-[32px]
                font-[800]
                leading-none
                tracking-[-0.04em]
                text-[#303030]
              "
            >
              Assignments
            </h1>

            <p
              className="
                mt-1
                text-[14px]
                font-medium
                tracking-[-0.04em]
                text-[#5E5E5E8C]
              "
            >
              Manage and create assignments for your classes.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div
          className="
            flex
            flex-col
            gap-4
            rounded-[24px]
            bg-white
            p-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          
          {/* Filter */}
          <button
            className="
              flex
              items-center
              gap-2
              text-[14px]
              font-bold
              tracking-[-0.04em]
              text-[#A9A9A9]
            "
          >
            <Filter size={18} />
            Filter By
          </button>

          {/* Search */}
          <div
            className="
              flex
              h-[48px]
              w-full
              items-center
              gap-3
              rounded-full
              border
              border-black/15
              bg-white
              px-4
              md:w-[380px]
            "
          >
            <Search
              size={18}
              className="text-[#A9A9A9]"
            />

            <input
              type="text"
              placeholder="Search Assignment"
              className="
                flex-1
                bg-transparent
                text-[14px]
                font-bold
                tracking-[-0.04em]
                outline-none
                placeholder:text-[#A9A9A9]
              "
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            className="
              flex
              min-h-[400px]
              items-center
              justify-center
              rounded-[28px]
              bg-white
              text-[18px]
              font-medium
              text-black/50
            "
          >
            Loading assignments...
          </div>
        )}

        {/* Empty State */}
        {!loading && isEmpty && (
          <div
            className="
              flex
              min-h-[620px]
              items-center
              justify-center
              rounded-[28px]
              bg-white
              px-6
            "
          >
            
            <div
              className="
                flex
                max-w-[486px]
                flex-col
                items-center
                gap-8
                text-center
              "
            >
              
              {/* Illustration */}
              <div
                className="
                  relative
                  flex
                  h-[300px]
                  w-[300px]
                  items-center
                  justify-center
                "
              >
                
                {/* Background Circle */}
                <div
                  className="
                    absolute
                    h-[240px]
                    w-[240px]
                    rounded-full
                    bg-gradient-to-b
                    from-[#F2F2F2]
                    to-[#EFEFEF]
                  "
                />

                {/* Paper */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-[155px]
                    w-[125px]
                    flex-col
                    gap-3
                    rounded-2xl
                    bg-white
                    px-4
                    py-5
                    shadow-[0px_20px_30px_rgba(146,146,146,0.19)]
                  "
                >
                  
                  <div className="h-[10px] w-[50px] rounded-full bg-[#011625]" />

                  <div className="h-[10px] rounded-full bg-[#D5D5D5]" />
                  <div className="h-[10px] rounded-full bg-[#D5D5D5]" />
                  <div className="h-[10px] rounded-full bg-[#D5D5D5]" />
                  <div className="h-[10px] rounded-full bg-[#D5D5D5]" />
                </div>

                {/* Magnifier */}
                <div
                  className="
                    absolute
                    right-[30px]
                    top-[100px]
                    z-20
                    flex
                    h-[125px]
                    w-[125px]
                    items-center
                    justify-center
                    rounded-full
                    border-[16px]
                    border-[#E1DCEB]
                    bg-[linear-gradient(158deg,#FFFFFF_13%,#FFADAD_122%)]
                  "
                >
                  
                  {/* Red X */}
                  <div
                    className="
                      relative
                      flex
                      h-[50px]
                      w-[50px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#FF4040]
                    "
                  >
                    <div
                      className="
                        absolute
                        h-[3px]
                        w-[24px]
                        rotate-45
                        rounded-full
                        bg-white
                      "
                    />

                    <div
                      className="
                        absolute
                        h-[3px]
                        w-[24px]
                        -rotate-45
                        rounded-full
                        bg-white
                      "
                    />
                  </div>
                </div>

                {/* Handle */}
                <div
                  className="
                    absolute
                    bottom-[55px]
                    right-[45px]
                    h-[60px]
                    w-[20px]
                    rotate-[-40deg]
                    rounded-full
                    bg-[#E1DCEB]
                  "
                />

                {/* Cloud */}
                <div
                  className="
                    absolute
                    right-0
                    top-[45px]
                    h-[40px]
                    w-[70px]
                    rounded-full
                    bg-white
                    shadow-[6px_4px_13px_rgba(27,119,139,0.09)]
                  "
                />

                {/* Doodles */}
                <div
                  className="
                    absolute
                    left-[20px]
                    top-[55px]
                    h-[70px]
                    w-[70px]
                    rounded-full
                    border-2
                    border-[#011625]
                    border-r-transparent
                    border-b-transparent
                    opacity-60
                  "
                />

                <div
                  className="
                    absolute
                    bottom-[70px]
                    left-[50px]
                    h-3
                    w-3
                    rounded-full
                    bg-[#417BA4]
                  "
                />

                <div
                  className="
                    absolute
                    right-[40px]
                    top-[130px]
                    h-2
                    w-2
                    rounded-full
                    bg-[#417BA4]
                  "
                />
              </div>

              {/* Text */}
              <div className="space-y-2">
                
                <h2
                  className="
                    text-[20px]
                    font-bold
                    leading-[140%]
                    tracking-[-0.04em]
                    text-[#303030]
                  "
                >
                  No assignments yet
                </h2>

                <p
                  className="
                    max-w-[486px]
                    text-[16px]
                    leading-[140%]
                    tracking-[-0.04em]
                    text-[#5E5E5ECC]
                  "
                >
                  Create your first assignment to start collecting and grading student submissions.
                </p>
              </div>

              {/* CTA */}
              <button
                className="
                  flex
                  h-[46px]
                  items-center
                  gap-2
                  rounded-full
                  bg-[#181818]
                  px-6
                  text-white
                  shadow-lg
                  transition
                  hover:scale-[1.02]
                "
              >
                
                <Plus size={18} />

                <span
                  className="
                    text-[16px]
                    font-medium
                    tracking-[-0.04em]
                  "
                >
                  Create Your First Assignment
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Assignments Grid */}
        {!loading &&
          !isEmpty && (
            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >
              {assignments.map(item => (
                <div
                  key={item._id}
                  className="
                    relative
                    min-h-[180px]
                    rounded-[28px]
                    bg-white
                    p-7
                    transition-all
                    duration-200
                    hover:-translate-y-[2px]
                    hover:shadow-[0px_12px_48px_rgba(0,0,0,0.06)]
                  "
                >
                  
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    
                    <h2
                      className="
                        max-w-[70%]
                        text-[24px]
                        font-[800]
                        leading-[115%]
                        tracking-[-0.04em]
                        text-[#303030]
                      "
                    >
                      {item.title}
                    </h2>

                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === item._id
                            ? null
                            : item._id
                        )
                      }
                      className="
                        rounded-full
                        p-1
                        transition
                        hover:bg-[#F6F6F6]
                      "
                    >
                      <MoreVertical
                        size={20}
                        className="text-[#A9A9A9]"
                      />
                    </button>
                  </div>

                  {/* Bottom */}
                  <div
                    className="
                      absolute
                      bottom-7
                      left-7
                      right-7
                      flex
                      items-center
                      justify-between
                    "
                  >
                    
                    <p
                      className="
                        text-[16px]
                        font-[800]
                        tracking-[-0.04em]
                        text-[#303030]
                      "
                    >
                      Assigned on :
                      <span className="ml-1 font-medium text-black/55">
                        {item.assignedOn}
                      </span>
                    </p>

                    <p
                      className="
                        text-[16px]
                        font-[800]
                        tracking-[-0.04em]
                        text-[#303030]
                      "
                    >
                      Due :
                      <span className="ml-1 font-medium text-black/55">
                        {item.dueDate}
                      </span>
                    </p>
                  </div>

                  {/* Dropdown */}
                  {openMenu === item._id && (
                    <div
                      className="
                        absolute
                        right-8
                        top-16
                        z-50
                        w-[160px]
                        rounded-[22px]
                        bg-white
                        p-2
                        shadow-[0px_24px_64px_rgba(0,0,0,0.14)]
                      "
                    >
                      
                      <button
                        className="
                          flex
                          h-[44px]
                          w-full
                          items-center
                          rounded-xl
                          px-4
                          text-left
                          text-[15px]
                          font-medium
                          text-[#303030]
                          transition
                          hover:bg-[#F6F6F6]
                        "
                      >
                        View Assignment
                      </button>

                      <button
                        onClick={() =>
                          deleteAssignment(
                            item._id
                          )
                        }
                        className="
                          mt-1
                          flex
                          h-[44px]
                          w-full
                          items-center
                          rounded-xl
                          bg-[#F6F6F6]
                          px-4
                          text-left
                          text-[15px]
                          font-medium
                          text-[#D64545]
                        "
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}