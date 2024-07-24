import { Button } from "@/components/ui"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { ArrowLeft, Flower, Sprout, TreeDeciduous } from "lucide-react"
import FadeIn from "react-fade-in"

const NumberOfExperts = ({ setNumberOfExperts, setStep }) => {
  return (
    <FadeIn>
      <HireHeading
        heading="How many experts do you need?"
        text="More minds, more insights. Choose what fits your project."
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          Icon={Sprout}
          heading="Focused insights"
          text="1 expert for $495 USD"
          onClick={() => {
            setNumberOfExperts(1), setStep(5)
          }}
        />
        <ButtonCard
          Icon={Flower}
          heading="Balanced perspectives"
          text="2 experts for $995 USD"
          onClick={() => {
            setNumberOfExperts(2), setStep(5)
          }}
        />
        <ButtonCard
          Icon={TreeDeciduous}
          heading="Comprehensive review"
          text="3 experts for $1495 USD"
          onClick={() => {
            setNumberOfExperts(3), setStep(5)
          }}
        />
      </div>
      <div className="mt-8">
        <Button
          onClick={() => setStep(3)}
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

export default NumberOfExperts
