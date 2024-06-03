import { Dot } from "lucide-react"
import goalData from "@/lib/constants/goals"

const RequestItem = ({ request }) => {
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

  const goals = goalData.reduce((acc, { label, icon: Icon }) => {
    acc[label] = <Icon strokeWidth={1.75} className="w-5 h-5" />
    return acc
  }, {})

  return (
    <div>
      <div className="bg-black/40 border border-accent rounded-xl">
        <div className="flex justify-between px-6 py-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full">
              {goals[request.goal]}
            </div>
            <div className="sm:max-w-[24rem] space-y-1">
              <div className="font-semibold">{request.goal}</div>
              <p className="sm:max-w-md pr-2 sm:pr-0 text-sm">
                {request.skill}
              </p>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0">
            {getStatus(request.status)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestItem
