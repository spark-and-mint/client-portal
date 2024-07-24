import { Button } from "@/components/ui"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { ArrowLeft } from "lucide-react"
import FadeIn from "react-fade-in"

const Industry = ({ setIndustry, setStep }) => {
  return (
    <FadeIn>
      <HireHeading
        heading="Select your industry"
        text="Help us tailor our expertise to your specific field."
      />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {[
          "AI",
          "Blockchain",
          "DeFi / Crypto",
          "NFT / Art",
          "Education",
          "Health",
          "Finance",
          "Other",
        ].map((industry) => (
          <ButtonCard
            key={industry}
            small
            text={industry}
            onClick={() => {
              setIndustry(industry)
              setStep(4)
            }}
          />
        ))}
      </div>
      <div className="mt-8">
        <Button
          onClick={() => setStep(2)}
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

export default Industry
