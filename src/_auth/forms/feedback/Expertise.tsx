import { Button } from "@/components/ui"
import HireHeading from "./HireHeading"
import { ArrowLeft, ArrowRight } from "lucide-react"
import FadeIn from "react-fade-in"
import { useEffect, useState } from "react"
import Checkbox from "./Checkbox"

const Expertise = ({ expertise, setExpertise, numberOfExperts, setStep }) => {
  const [expertiseString, setExpertiseString] = useState<string[]>([])
  const single = numberOfExperts === 1

  const handleSelect = (type: string) => {
    if (expertiseString.includes(type)) {
      setExpertiseString(expertiseString.filter((role) => role !== type))
    } else {
      setExpertiseString([...expertiseString, type])
    }
  }

  useEffect(() => {
    setExpertise(expertiseString.length > 0 ? expertiseString.join(", ") : "")
  }, [expertise, expertiseString, setExpertise])

  return (
    <FadeIn>
      <HireHeading
        heading={
          single
            ? "Now let's match you with the right person"
            : "Now let's match you with the right people"
        }
        text={
          single
            ? "What kind of expert are you looking for? Select all that apply."
            : "What kind of experts are you looking for? Select all that apply."
        }
      />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {[
          single ? "UX/UI Designer" : "UX/UI Designers",
          single ? "Brand Designer" : "Brand Designers",
          single ? "Marketing Specialist" : "Marketing Specialists",
          single ? "Software Developer" : "Software Developers",
          single ? "Web3/Blockchain Specialist" : "Web3/Blockchain Specialists",
          single ? "AI Specialist" : "AI Specialists",
          single ? "Growth Hacker" : "Growth Hackers",
          "Other",
        ].map((expertise) => (
          <Checkbox
            key={expertise}
            text={expertise}
            selected={expertiseString.includes(expertise)}
            onClick={() => handleSelect(expertise)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(4)}
          size="sm"
          variant="link"
          className="p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => setStep(6)}
          size="sm"
          disabled={!expertiseString.length}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </FadeIn>
  )
}

export default Expertise
