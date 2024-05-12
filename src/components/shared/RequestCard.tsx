import { Dot } from "lucide-react"
import { Card } from "../ui/card"

const RequestCard = ({ request }) => {
  const getStatus = (status: string) => {
    switch (status) {
      case "in review":
        return (
          <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.9rem] border border-border rounded-lg">
            <Dot className="w-6 h-6 text-amber-400 scale-150" />
            In review
          </span>
        )
      case "reviewed":
        return (
          <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.9rem] border border-border rounded-lg">
            <Dot className="w-6 h-6 text-purple-500 scale-150" />
            Reviewed
          </span>
        )
      case "accepted":
        return (
          <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.9rem] border border-border rounded-lg">
            <Dot className="w-6 h-6 text-green-500 scale-150" />
            Accepted
          </span>
        )
      case "rejected":
        return (
          <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.9rem] border border-border rounded-lg">
            <Dot className="w-6 h-6 text-red-500 scale-150" />
            Rejected
          </span>
        )
    }
  }

  return (
    <Card className="flex flex-col items-start gap-4 sm:flex-row sm:gap-8 sm:items-center justify-between px-7">
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <h6 className="h6 sm:max-w-md text-lg mb-1 group-hover:text-white transition-colors duration-100">
            {request.goal}
          </h6>
          <p className="sm:max-w-md pr-2 sm:pr-0">{request.skill}</p>
        </div>
      </div>
      <div className="flex items-center flex-shrink-0">
        {getStatus(request.status)}
      </div>
    </Card>
  )
}

export default RequestCard
