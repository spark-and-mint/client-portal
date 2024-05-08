import { Button } from "@/components/ui"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import { ArrowLeft } from "lucide-react"
import FadeIn from "react-fade-in"

const Industry = ({ setIndustry, setStep }) => {
  return (
    <FadeIn>
      <HireHeading heading="What industry are you working in?" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <ButtonCard
          small
          text="AI"
          onClick={() => {
            setIndustry("AI"), setStep(4)
          }}
        />
        <ButtonCard
          small
          text="Blockchain"
          onClick={() => {
            setIndustry("Blockchain"), setStep(4)
          }}
        />
        <ButtonCard
          small
          text="DeFi / Crypto"
          onClick={() => {
            setIndustry("DeFi / Crypto"), setStep(4)
          }}
        />
        <ButtonCard
          small
          text="NFT / Art"
          onClick={() => {
            setIndustry("NFT / Art"), setStep(4)
          }}
        />
        <ButtonCard
          small
          text="Education"
          onClick={() => {
            setIndustry("Education"), setStep(4)
          }}
        />
        <ButtonCard
          small
          text="Health"
          onClick={() => {
            setIndustry("Health"), setStep(4)
          }}
        />
        <ButtonCard
          small
          text="Finance"
          onClick={() => {
            setIndustry("Finance"), setStep(4)
          }}
        />

        <ButtonCard
          small
          text="Other"
          onClick={() => {
            setIndustry("Other"), setStep(4)
          }}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => setStep(2)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </FadeIn>
  )
}

export default Industry
