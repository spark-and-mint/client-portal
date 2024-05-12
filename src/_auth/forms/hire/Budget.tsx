import HireHeading from "./HireHeading"
import { Button, Input, Label } from "@/components/ui"
import { ArrowLeft, ArrowRight } from "lucide-react"
import FadeIn from "react-fade-in"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Budget = ({ budget, setBudget, setFixedOrOngoing, setStep }) => {
  const handleSelect = (type: string) => {
    setFixedOrOngoing(type)
  }

  return (
    <FadeIn>
      <HireHeading heading="What is your budget range for this project?" />

      <div className="mt-6 space-y-6">
        <Input
          defaultValue={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter your budget in USD"
          className="h-12 px-3 py-2 text-base"
        />
      </div>

      <RadioGroup
        onValueChange={handleSelect}
        defaultValue="fixed"
        className="mt-8 mb-10 pl-1 space-y-2"
      >
        <div className="flex items-center space-x-3 cursor-pointer">
          <RadioGroupItem value="fixed" id="fixed" />
          <Label htmlFor="fixed" className="text-base cursor-pointer">
            Fixed price
          </Label>
        </div>
        <div className="flex items-center space-x-3 cursor-pointer">
          <RadioGroupItem value="ongoing" id="ongoing" />
          <Label htmlFor="ongoing" className="text-base cursor-pointer">
            Monthly investment
          </Label>
        </div>
      </RadioGroup>

      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(5)}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setStep(7)} size="sm" disabled={budget === ""}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </FadeIn>
  )
}

export default Budget
