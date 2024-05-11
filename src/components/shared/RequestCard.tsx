import { Dot, Trash2 } from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui"
import { useConfirm } from "./AlertDialogProvider"
import { toast } from "sonner"
import { useDeleteRequest } from "@/lib/react-query/queries"
import { Badge } from "../ui/badge"

const RequestCard = ({ request }) => {
  const confirm = useConfirm()
  const { mutateAsync: deleteRequest } = useDeleteRequest()

  const handleDelete = async () => {
    const declineConfirmed = await confirm({
      title: `Are you sure you want to delete this request?`,
      cancelButton: "Cancel",
      actionButton: "Delete",
    })

    if (!declineConfirmed) return

    try {
      await deleteRequest({ requestId: request.$id })
      toast.success("Request deleted successfully.")
    } catch (error) {
      toast.error("Could not delete request. Please try again.")
      console.error(error)
    }
  }

  return (
    <Card className="flex items-center justify-between px-7">
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <h6 className="h6 text-lg mb-1 group-hover:text-white transition-colors duration-100">
            {request.goal}
          </h6>
          <p className="pr-2 sm:pr-0">{request.skill}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.9rem] border border-border rounded-lg">
          <Dot className="w-6 h-6 text-amber-400 scale-150" />
          In review
        </span>
      </div>
    </Card>
  )
}

export default RequestCard
