import { Pencil, Star } from "lucide-react"
import { Button } from "../ui"
import { Link } from "react-router-dom"

const FeedbackRequestItem = ({ request }) => {
  return (
    <div>
      <div className="bg-black/40 border border-accent rounded-xl">
        <div className="flex flex-col sm:flex-row gap-6 justify-between px-6 py-4">
          <div className="flex justify-between sm:hidden">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-secondary text-primary rounded-full">
              <Star className="w-5 h-5" />
            </div>
            <div className="flex items-center flex-shrink-0">
              <Link to={`/feedback/${request.$id}`}>
                <Button size="sm" className="flex items-center">
                  <Pencil className="w-4 h-5 mr-2" />
                  Update details
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center justify-center flex-shrink-0 w-10 h-10 bg-secondary text-primary rounded-full">
              <Star className="w-5 h-5" />
            </div>
            <div className="sm:max-w-[24rem] space-y-1">
              <div className="font-semibold">{request.expertise} feedback</div>
              <p className="sm:max-w-md pr-2 sm:pr-0 text-sm first-letter:capitalize">
                {request.feedbackType} session with {request.numberOfExperts}{" "}
                expert
                {request.numberOfExperts > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center flex-shrink-0">
            <Link to={`/feedback/${request.$id}`}>
              <Button size="sm" className="flex items-center">
                <Pencil className="w-4 h-5 mr-2" />
                Update details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackRequestItem
