import {
  CircleSlash,
  Pickaxe,
  RotateCw,
  ThumbsUp,
  TriangleAlert,
} from "lucide-react"
import { Button } from "../ui"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Models } from "appwrite"
import {
  useGetMilestoneById,
  useGetMilestoneUpdates,
  useUpdateMilestone,
} from "@/lib/react-query/queries"
import { toast } from "sonner"
import Update from "./Update"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"

const getMilestoneStatus = (feedback: string) => {
  switch (feedback) {
    case "approved":
      return (
        <span className="flex items-center  px-1.5 py-1 text-green-500 font-medium text-sm bg-green-400/20 border border-green-400/20 rounded-md">
          Approved <ThumbsUp className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
    case "in progress":
      return (
        <span className="flex items-center  px-1.5 py-1 text-yellow-500 font-medium text-sm bg-amber-400/20 border border-amber-400/20 rounded-md">
          In progress <Pickaxe className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
    case "approval requested":
      return (
        <span className="flex items-center  px-1.5 py-1 text-cyan-400 font-medium text-sm bg-muted border border-cyan-400/30 rounded-md">
          Approval requested <TriangleAlert className="w-4 h-4 ml-1.5" />
        </span>
      )
    case "approval rejected":
      return (
        <span className="flex items-center  px-1.5 py-1 text-red-500 font-medium text-sm bg-red-400/20 border border-red-400/20 rounded-md">
          Approval rejected <CircleSlash className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
    default:
      return (
        <span className="flex items-center  px-1.5 py-1 text-gray-400 font-medium text-sm bg-muted border border-gray-400/20 rounded-md">
          Not started
        </span>
      )
  }
}

const Milestone = ({ milestoneId }: { milestoneId: string }) => {
  const { data: milestone, isPending: isPendingMilestone } =
    useGetMilestoneById(milestoneId)
  const { data: updates, isPending: isPendingUpdates } =
    useGetMilestoneUpdates(milestoneId)
  const isPending = isPendingMilestone || isPendingUpdates
  const { mutateAsync: updateMilestone } = useUpdateMilestone()
  const [loadingApproval, setLoadingApproval] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)

  const handleApprove = async () => {
    if (!milestone) return

    if (milestone.status === "approved") {
      try {
        setLoadingApproval(true)
        await updateMilestone({
          milestoneId: milestone.$id,
          title: milestone.title,
          status: "in progress",
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingApproval(false)
      }

      return
    }

    try {
      setLoadingApproval(true)
      await updateMilestone({
        milestoneId: milestone.$id,
        title: milestone.title,
        status: "approved",
      })
      toast.success("Milestone approved.")
    } catch (error) {
      toast.error("Could not approve milestone. Please try again.")
      console.error(error)
    } finally {
      setLoadingApproval(false)
    }
  }

  const handleReject = async () => {
    if (!milestone) return

    try {
      setLoadingReject(true)
      await updateMilestone({
        milestoneId: milestone.$id,
        title: milestone.title,
        status: "approval rejected",
      })
    } catch (error) {
      toast.error("Could not reject milestone. Please try again.")
      console.error(error)
    } finally {
      setLoadingReject(false)
    }
  }

  return (
    <div className="relative">
      {!milestone || isPending ? (
        <Card>
          <div className="flex justify-between">
            <Skeleton className="w-56 h-12" />
            <Skeleton className="w-56 h-12" />
          </div>
          <div className="mt-8">
            <Card>
              <Skeleton className="w-full h-32" />
            </Card>
          </div>
        </Card>
      ) : (
        <>
          <Card className="relative p-2 z-10">
            <CardHeader>
              <div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center mb-4">
                <div className="flex items-center">
                  <h5 className="h5">{milestone.title}</h5>
                  <div className="ml-4">
                    {getMilestoneStatus(milestone.status)}
                  </div>
                </div>

                <div className="flex gap-4">
                  {milestone.status === "approval requested" && (
                    <Button
                      variant="outline"
                      disabled={loadingReject}
                      onClick={handleReject}
                      className="text-red-500"
                    >
                      {loadingReject ? (
                        <div className="flex items-center gap-2">
                          <RotateCw className="h-4 w-4 animate-spin" />
                          Rejecting...
                        </div>
                      ) : (
                        "Reject milestone"
                      )}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    disabled={
                      loadingApproval || (updates && updates?.length === 0)
                    }
                    onClick={handleApprove}
                  >
                    {loadingApproval ? (
                      <div className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        {milestone.status === "approved"
                          ? "Withdrawing..."
                          : "Approving..."}
                      </div>
                    ) : (
                      <>
                        {milestone.status === "approved"
                          ? "Withdraw approval"
                          : "Approve milestone"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {updates && updates.length === 0 ? (
                <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
                  <h4 className="h4 text-[1.325rem] mt-3 text-center">
                    There are no updates added yet
                  </h4>
                  <p className="mt-2 text-muted-foreground text-center">
                    When updates are added by the team they will be listed here
                    for you to review.
                  </p>
                </Card>
              ) : (
                <div className="space-y-8">
                  {updates &&
                    updates.length > 0 &&
                    updates?.map((update: Models.Document) => (
                      <Update key={update.$id} update={update} />
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

export default Milestone
