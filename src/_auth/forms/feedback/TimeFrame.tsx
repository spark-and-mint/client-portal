import { Button } from "@/components/ui"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { ArrowLeft } from "lucide-react"
import FadeIn from "react-fade-in"

interface TimeFrameProps {
  setTimeFrame: (timeFrame: string) => void
  setStep: (step: number) => void
  feedbackType: string
}

const TimeFrame = ({ setTimeFrame, setStep, feedbackType }: TimeFrameProps) => {
  const report = feedbackType === "report"

  return (
    <FadeIn>
      <HireHeading
        heading={
          report
            ? "When do you want to receieve the report?"
            : "Schedule your feedback session"
        }
        text="Choose the timing that works best for you."
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          heading="As soon as possible"
          onClick={() => {
            setTimeFrame("As soon as possible"), setStep(7)
          }}
        />
        <ButtonCard
          heading="Within 7 business days"
          onClick={() => {
            setTimeFrame("Within 7 business days"), setStep(7)
          }}
        />
        <ButtonCard
          heading="Flexible timeframe"
          onClick={() => {
            setTimeFrame("Flexible timeframe"), setStep(7)
          }}
        />
      </div>
      <div className="mt-8">
        <Button
          onClick={() => setStep(5)}
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

export default TimeFrame
