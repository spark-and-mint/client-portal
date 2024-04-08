import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Milestone } from "lucide-react"
import { Badge } from "../ui/badge"

const Done = () => <Badge variant="green">Done</Badge>

const InProgress = () => <Badge variant="amber">In progress</Badge>

const NotStarted = () => <Badge variant="secondary">Not started</Badge>

const ViewMilestones = () => {
  const tasks = [
    {
      taskName: "Understand existing product",
      status: <Done />,
      hours: "2.5",
    },

    {
      taskName: "Design audit & improvement plan",
      status: <InProgress />,
      hours: "4",
    },
    {
      taskName: "Define new design system",
      status: <NotStarted />,
      hours: "3",
    },

    {
      taskName: "Product strategy presentation",
      status: <NotStarted />,
      hours: "4.5",
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Milestone className="h-4 w-4 mr-2" />
          View milestones
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Project milestones</DialogTitle>
        </DialogHeader>
        <div className="mt-4 divide-y divide-stroke-1">
          {tasks.map((item, index) => (
            <div key={index} className="py-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="mr-4">{item.taskName}</div>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewMilestones
