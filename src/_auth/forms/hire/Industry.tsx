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
            setIndustry("AI"), setStep(5)
          }}
        />
        <ButtonCard
          small
          text="Blockchain"
          onClick={() => {
            setIndustry("Blockchain"), setStep(5)
          }}
        />
        <ButtonCard
          small
          text="DeFi / Crypto"
          onClick={() => {
            setIndustry("DeFi / Crypto"), setStep(5)
          }}
        />
        <ButtonCard
          small
          text="NFT / Art"
          onClick={() => {
            setIndustry("NFT / Art"), setStep(5)
          }}
        />
        <ButtonCard
          small
          text="Education"
          onClick={() => {
            setIndustry("Education"), setStep(5)
          }}
        />
        <ButtonCard
          small
          text="Health"
          onClick={() => {
            setIndustry("Health"), setStep(5)
          }}
        />
        <ButtonCard
          small
          text="Finance"
          onClick={() => {
            setIndustry("Finance"), setStep(5)
          }}
        />

        <ButtonCard
          small
          text="Other"
          onClick={() => {
            setIndustry("Other"), setStep(5)
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

export default Industry
