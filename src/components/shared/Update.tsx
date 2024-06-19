import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Button } from "../ui"
import { Card } from "../ui/card"
import FeedbackForm from "./FeedbackForm"
import { Link } from "react-router-dom"
import { useConfirm } from "./AlertDialogProvider"
import {
  useDeleteFeedback,
  useGetMemberById,
  useGetUpdateFeedback,
  useUpdateIsViewed,
} from "@/lib/react-query/queries"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { cn, toRelativeTimeString } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"

const Update = ({ update, setHasFeedback }) => {
  const confirm = useConfirm()
  const { data: creator } = useGetMemberById(update.creatorId)
  const { data: feedback } = useGetUpdateFeedback(update.$id)
  const { mutateAsync: deleteFeedback } = useDeleteFeedback()
  const { mutateAsync: updateIsViewed } = useUpdateIsViewed()
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteFeedback = async (feedbackId: string) => {
    const declineConfirmed = await confirm({
      title: `Are you sure you want to delete the feeback for ${update.title}?`,
      cancelButton: "Cancel",
      actionButton: "Delete",
    })

    if (!declineConfirmed) return

    try {
      await deleteFeedback({ feedbackId, updateId: update.$id })
      toast.success("Feedback deleted successfully.")
    } catch (error) {
      toast.error("Could not delete feedback. Please try again.")
      console.error(error)
    }
  }

  useEffect(() => {
    const setIsViewed = async () => {
      try {
        await updateIsViewed({
          updateId: update.$id,
          title: update.title,
          isViewed: true,
        })
      } catch (error) {
        toast.error("An error occured when trying to remove the 'new' badge.")
        console.error(error)
      }
    }

    if (isOpen && !update.isViewed) {
      setIsViewed()
    }
  }, [isOpen, update.isViewed])

  useEffect(() => {
    if (setHasFeedback && feedback && feedback.length > 0) {
      setHasFeedback(true)
    }
  }, [setHasFeedback, feedback])

  return (
    <Card className="p-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-between p-6 cursor-pointer",
              !isOpen && "hover:bg-slate-600/5"
            )}
          >
            <div className="flex gap-5 items-center">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-medium leading-none">{update.title}</p>
                  {!update.isViewed && <Badge variant="outline">New</Badge>}
                </div>
                <p className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  {creator?.firstName} {creator?.lastName} <span>•</span>{" "}
                  {toRelativeTimeString(new Date(update.$createdAt))}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-6 pb-6">
            <dl className="divide-y divide-accent">
              {update.description && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {update.description}
                  </dd>
                </div>
              )}
              {!update.link && !update.fileUrl ? null : (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex items-center text-sm font-medium leading-6 text-primary">
                    Link
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 truncate">
                    <Button asChild variant="link" className="p-0 font-normal">
                      <Link to={update.link || update.fileUrl} target="_blank">
                        {update.link || update.fileUrl}
                      </Link>
                    </Button>
                  </dd>
                </div>
              )}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center text-sm font-medium leading-6 text-primary">
                  Your feedback
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {feedback && feedback.length > 0 ? (
                    <div className="flex justify-between items-center gap-8">
                      <div className="flex flex-col gap-4">
                        {feedback[0].label && (
                          <>
                            <p className="">{feedback[0].label}</p>
                            {feedback[0].text && <Separator />}
                          </>
                        )}

                        {feedback[0].text && <p>{feedback[0].text}</p>}
                      </div>
                      <div className="flex gap-3">
                        <FeedbackForm action="update" feedback={feedback[0]} />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteFeedback(feedback[0].$id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <FeedbackForm action="create" update={update} />
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default Update
