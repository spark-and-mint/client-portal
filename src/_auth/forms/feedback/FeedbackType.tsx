import { ArrowLeft, CircleUser, ScrollText } from "lucide-react"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import FadeIn from "react-fade-in"
import { Button } from "@/components/ui"
import { useNavigate } from "react-router-dom"

const FeedbackType = ({ stakeholder, setFeedbackType, setStep }) => {
  const navigate = useNavigate()

  return (
    <FadeIn>
      <HireHeading
        heading="Let's start with the feedback style!"
        text="How would you like your feedback delivered?"
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          Icon={CircleUser}
          heading="In-person"
          text="Live session with experts from your field. "
          onClick={() => {
            setFeedbackType("In-person"), setStep(3)
          }}
        />
        <ButtonCard
          Icon={ScrollText}
          heading="Report"
          text="Get the game plan straight to your inbox."
          onClick={() => {
            setFeedbackType("Report"), setStep(3)
          }}
        />
      </div>
      <div className="flex justify-start mt-8">
        <Button
          onClick={() => (stakeholder.clientId ? navigate(-1) : setStep(1))}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </FadeIn>
  )
}

export default FeedbackType
