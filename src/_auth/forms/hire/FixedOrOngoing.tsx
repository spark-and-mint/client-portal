import { ArrowLeft } from "lucide-react"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { Button } from "@/components/ui"

const FixedOrOngoing = ({ setFixedOrOngoing, setStep }) => {
  return (
    <div>
      <HireHeading
        heading="Choose pricing model"
        text="Opt for a fixed price or a flexible monthly investment."
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          heading="Fixed price"
          // text="Simplify with a one-time investment."
          onClick={() => {
            setFixedOrOngoing("fixed"), setStep(4)
          }}
        />
        <ButtonCard
          heading="Ongoing partnership"
          // text="Monthly investment for continous support."
          onClick={() => {
            setFixedOrOngoing("ongoing"), setStep(4)
          }}
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setStep(2)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )
}

export default FixedOrOngoing
