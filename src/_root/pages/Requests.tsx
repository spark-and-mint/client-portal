import RequestCard from "@/components/shared/RequestCard"
import { Button } from "@/components/ui"
import { useStakeholderContext } from "@/context/AuthContext"
import { Models } from "appwrite"
import { PlusIcon } from "lucide-react"
import { useEffect } from "react"
import FadeIn from "react-fade-in"
import { Link, useNavigate } from "react-router-dom"

const Requests = () => {
  const { requests } = useStakeholderContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (requests.length === 0) {
      navigate("/")
    }
  }, [requests, navigate])

  return (
    <FadeIn className="pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between mb-8">
        <h5 className="h5">Project requests</h5>
        <Link to="/start">
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            New request
          </Button>
        </Link>
      </div>
      {requests && requests.length > 0 && (
        <FadeIn className="flex flex-col gap-6">
          {requests.map((request: Models.Document) => (
            <div key={request.$id}>
              <RequestCard request={request} />
            </div>
          ))}
        </FadeIn>
      )}
    </FadeIn>
  )
}

export default Requests
