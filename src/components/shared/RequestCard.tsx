import { Trash2 } from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui"
import { useConfirm } from "./AlertDialogProvider"
import { toast } from "sonner"
import { useDeleteRequest } from "@/lib/react-query/queries"

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
        <Button variant="outline" size="icon" onClick={handleDelete}>
          <Trash2 strokeWidth={1.3} className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  )
}

export default RequestCard
