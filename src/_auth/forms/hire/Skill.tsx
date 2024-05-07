import { ArrowLeft, ArrowRight } from "lucide-react"
import HireHeading from "./HireHeading"
import { Button, Input } from "@/components/ui"

const Skill = ({ setSkill, setStep }) => {
  return (
    <div>
      <HireHeading
        heading="Detail your skill requirements (optional)"
        text="What specialized skills are essential for this project?"
      />
      <div className="mt-6 space-y-6">
        <Input
          onChange={(e) => setSkill(e.target.value)}
          placeholder="ML Optimization, Smart Contracts, UX/UI Design..."
          className="h-12 px-3 py-2"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setStep(4)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setStep(6)} size="sm">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default Skill
