import { Button, Input } from "@/components/ui"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { ArrowLeft, ArrowRight } from "lucide-react"
import FadeIn from "react-fade-in"
import { useState } from "react"

const Industry = ({ industry, setIndustry, setStep }) => {
  const [showOther, setShowOther] = useState(false)

  return (
    <FadeIn>
      <HireHeading
        heading="Select your industry"
        text="Help us tailor our expertise to your specific field."
      />
      {showOther ? (
        <div className="mt-6">
          <Input
            defaultValue={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Please specify your industry..."
            className="h-12 px-3 py-2 text-base"
          />
        </div>
      ) : (
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
                if (industry === "Other") {
                  setIndustry("")
                  setShowOther(true)
                } else {
                  setIndustry(industry)
                  setStep(4)
                }
              }}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => (showOther ? setShowOther(false) : setStep(2))}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {showOther && (
          <Button
            onClick={() => setStep(4)}
            size="sm"
            disabled={industry === ""}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </FadeIn>
  )
}

export default Industry
