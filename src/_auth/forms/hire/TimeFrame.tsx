import { Button } from "@/components/ui"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { ArrowLeft } from "lucide-react"

interface TimeFrameProps {
  setTimeFrame: (timeFrame: string) => void
  setStep: (step: number) => void
  individualOrTeam: string
}

const TimeFrame = ({
  setTimeFrame,
  setStep,
  individualOrTeam,
}: TimeFrameProps) => {
  const plural = individualOrTeam === "team"

  return (
    <div>
      <HireHeading
        heading={
          plural
            ? "When would you like your team to start?"
            : "When do you need the individual to start?"
        }
        text={
          plural
            ? "Spark + Mint requires 5 business days to assemble a customized team and finalize contracts."
            : null
        }
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          heading="As soon as possible"
          onClick={() => {
            setTimeFrame("As soon as possible"), setStep(7)
          }}
        />
        <ButtonCard
          heading="In a few weeks from now"
          onClick={() => {
            setTimeFrame("In a few weeks from now"), setStep(7)
          }}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => setStep(5)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )
}

export default TimeFrame
