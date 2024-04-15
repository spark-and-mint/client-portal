import { CircleSlash, MoreHorizontal, Pickaxe, ThumbsUp } from "lucide-react"
import { Button } from "../ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Models } from "appwrite"
import {
  useDeleteMilestone,
  useGetMilestoneById,
} from "@/lib/react-query/queries"
import { toast } from "sonner"
import { useConfirm } from "./AlertDialogProvider"
import Update from "./Update"
import { Skeleton } from "../ui/skeleton"

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
    default:
      return (
        <span className="flex items-center  px-1.5 py-1 text-cyan-500 font-medium text-sm bg-muted border border-cyan-400/20 rounded-md">
          Not started <CircleSlash className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
  }
}

const Milestone = ({ milestoneId }: { milestoneId: string }) => {
  const { data: milestone, isPending } = useGetMilestoneById(milestoneId)
  const { mutateAsync: deleteMilestone } = useDeleteMilestone()
  const confirm = useConfirm()
  const approvalRequested = false

  const handleDelete = async (milestoneId: string) => {
    const declineConfirmed = await confirm({
      title: `Are you sure you want to delete the "${milestone?.title}" milestone and all its updates?`,
      cancelButton: "Cancel",
      actionButton: "Delete",
    })

    if (!declineConfirmed) return

    try {
      await deleteMilestone({ milestoneId })
      toast.success("Milestone deleted successfully.")
    } catch (error) {
      toast.error("Could not delete milestone. Please try again.")
      console.error(error)
    }
  }

  return (
    <div className="relative">
      {!milestone || isPending ? (
        <Skeleton className="w-full h-[16rem]" />
      ) : (
        <>
          {approvalRequested && (
            <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-xl"></span>
          )}
          <Card className="relative p-2 z-10">
            <CardHeader>
              <div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center mb-4">
                <div className="flex items-center">
                  <h5 className="h5">{milestone.title}</h5>
                  <div className="ml-4">
                    {getMilestoneStatus(
                      milestone.title === "Research"
                        ? "in progress"
                        : milestone.status
                    )}
                  </div>
                  {approvalRequested && (
                    <div className="ml-4">
                      <span className="flex items-center px-1.5 py-1 bg-gradient-to-br from-cyan-800/80 to-blue-800/80 text-white font-medium text-sm bg-muted border border-cyan-600 rounded-md">
                        Approval requested
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    disabled={milestone.updates.length === 0}
                  >
                    Approve milestone
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit milestone</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(milestone.$id)}
                      >
                        <span className="font-medium text-[#e40808]">
                          Delete
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {milestone.updates.length === 0 ? (
                <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
                  <h4 className="h4 text-[1.325rem] mt-3 text-center">
                    There are no updates added yet
                  </h4>
                  <p className="mt-2 text-muted-foreground text-center">
                    When updates are added by the team, they will be listed
                    here.
                  </p>
                </Card>
              ) : (
                <div className="space-y-8">
                  {milestone.updates?.map((update: Models.Document) => (
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
