import { ArrowLeft, ArrowRight } from "lucide-react"
import HireHeading from "./HireHeading"
import { Button, Input } from "@/components/ui"
import FadeIn from "react-fade-in"

const Skill = ({ skill, setSkill, setStep }) => {
  return (
    <FadeIn>
      <HireHeading
        heading="What do you need to win?"
        text="Describe the skill requirements that you need to succeed."
      />
      <div className="mt-6 space-y-6">
        <Input
          onChange={(e) => setSkill(e.target.value)}
          placeholder="ML Optimization, Smart Contracts, Mobile UX/UI Design..."
          className="h-12 px-3 py-2 text-base"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(3)}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setStep(5)} size="sm" disabled={skill === ""}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </FadeIn>
  )
}

export default Skill
