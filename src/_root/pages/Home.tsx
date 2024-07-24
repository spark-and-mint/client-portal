import FeedbackRequestItem from "@/components/shared/FeedbackRequestItem"
import RequestItem from "@/components/shared/RequestItem"
import { Button } from "@/components/ui"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Card } from "@/components/ui/card"
import { useStakeholderContext } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import { MessageCircleHeart, PackagePlusIcon, Plus } from "lucide-react"
import { useEffect } from "react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const Home = () => {
  const { stakeholder, feedbackRequests } = useStakeholderContext()
  // const { stakeholder, requests, feedbackRequests } = useStakeholderContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const requests = [
    {
      $id: "1",
      goal: "Design a product",
      skill: "I need a product designer with web3 experience.",
      status: "in review",
    },
    {
      $id: "2",
      goal: "Social media campaign",
      skill: "DAO and crypto experience needed.",
      status: "accepted",
    },
  ]

  return (
    <FadeIn className="pb-16 space-y-8">
      <div className="-mt-2">
        <h4 className="h4 mb-1">
          Hello, <span className="capitalize">{stakeholder.firstName}</span>!
        </h4>
        <p className={cn("max-w-[34rem] mt-1.5 text-lg")}>
          Welcome to the TeamSpark client portal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-14 mt-10 mb-11 md:grid-cols-2">
        <Link to="/start">
          <BackgroundGradient className="rounded-xl bg-background">
            <Card className="flex flex-col gap-5 group border-transparent hover:bg-slate-600/10 transition-colors duration-200">
              <div className="animate-border flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white bg-gradient-to-r from-yellow-300 via-primary to-amber-600 bg-[length:400%_400%] text-slate-900 rounded-full">
                <PackagePlusIcon strokeWidth={2} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-3 text-[1.25rem] font-semibold">
                  Start a Project
                </h4>
                <p>
                  Find the best talent to bring your ambitious visions to life.
                </p>
              </div>
            </Card>
          </BackgroundGradient>
        </Link>

        <Link to="/feedback">
          <BackgroundGradient className="rounded-xl bg-background">
            <Card className="relative flex flex-col gap-5 group border-transparent hover:bg-slate-600/10 transition-colors duration-200">
              <div className="animate-border flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white bg-gradient-to-r from-yellow-300 via-primary to-amber-600 bg-[length:400%_400%] text-slate-900 rounded-full">
                <MessageCircleHeart
                  strokeWidth={2}
                  className="w-6 h-6 -mt-0.5"
                />
              </div>
              <div>
                <h4 className="mb-3 text-[1.25rem] font-semibold">
                  Feedback Sessions
                </h4>
                <p>Build your panel of freelancers for feedback on anything!</p>
              </div>
            </Card>
          </BackgroundGradient>
        </Link>
      </div>

      {requests && requests.length > 0 ? (
        <>
          <Link to="/start" className="block sm:hidden">
            <Button className="w-full text-base" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Start a new project
            </Button>
          </Link>

          <Card>
            <h6 className="h6 flex justify-between">
              Your project requests
              <Link to="/start" className="hidden sm:block">
                <Button size="sm" className="flex items-center">
                  <Plus className="w-4 h-5 mr-2" />
                  New project
                </Button>
              </Link>
            </h6>
            <ul className="mt-6 *:py-2 first:*:pt-0 last:*:pb-0">
              {requests.map((request) => (
                <RequestItem key={request.$id} request={request} />
              ))}
            </ul>
          </Card>
        </>
      ) : null}

      {feedbackRequests && feedbackRequests.length > 0 ? (
        <>
          <Link to="/start" className="block sm:hidden">
            <Button className="w-full text-base" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Start a new project
            </Button>
          </Link>

          <Card>
            <h6 className="h6">Your feedback sessions</h6>
            <ul className="mt-6 *:py-2 first:*:pt-0 last:*:pb-0">
              {feedbackRequests.map((request) => (
                <FeedbackRequestItem key={request.$id} request={request} />
              ))}
            </ul>
          </Card>
        </>
      ) : null}
    </FadeIn>
  )
}

export default Home
