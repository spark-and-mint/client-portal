import CreatableSelect from "react-select/creatable"
import { cn } from "@/lib/utils"
import HireHeading from "./HireHeading"
import { Button } from "@/components/ui"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SingleValue } from "react-select"
import { IOption } from "@/types"
import FadeIn from "react-fade-in"

const goals: IOption[] = [
  {
    value: "Launch a website",
    label: "Launch a website",
  },
  {
    value: "Create a brand",
    label: "Create a brand",
  },
  {
    value: "Design a pitch deck",
    label: "Design a pitch deck",
  },
  {
    value: "Grow a community",
    label: "Grow a community",
  },
  {
    value: "Social media campaign",
    label: "Social media campaign",
  },
  {
    value: "Design a product",
    label: "Design a product",
  },
  {
    value: "Build a product",
    label: "Build a product",
  },
  {
    value: "PR/marketing support",
    label: "PR/marketing support",
  },
  {
    value: "Fractional leadership",
    label: "Fractional leadership",
  },
  {
    value: "Project management support ",
    label: "Project management support ",
  },
  {
    value: "Product management support",
    label: "Product management support",
  },
  {
    value: "Other",
    label: "Other",
  },
]

interface GoalProps {
  goal: IOption | null
  setGoal: (goal: IOption | null) => void
  setStep: (step: number) => void
}

const Goal = ({ goal, setGoal, setStep }: GoalProps) => {
  return (
    <FadeIn>
      <HireHeading
        heading="Define your goal"
        text="What milestone do you aim to achieve?"
      />
      <div className="mt-6">
        <CreatableSelect
          options={goals}
          unstyled={true}
          placeholder="Type or search and select"
          formatCreateLabel={(inputValue) => `Select: ${inputValue}`}
          value={goal}
          classNames={{
            control: (e) =>
              cn(
                `h-12 rounded-md border border-accent`,
                `px-3 py-2 bg-background`,
                e.isFocused
                  ? "ring-2 ring-ring ring-offset-2 ring-offset-background"
                  : ""
              ),
            placeholder: () => "text-placeholder",
            menu: () =>
              cn(
                "absolute top-0 mt-1 z-10 w-full",
                "rounded-b-md border border-accent bg-popover shadow-md overflow-x-hidden"
              ),
            option: () => cn("py-2 px-3 focus:bg-gray-200 hover:bg-slate-700"),
          }}
          onChange={(newValue: SingleValue<IOption>) => {
            if (newValue === null) {
              setGoal(null)
            } else {
              setGoal(newValue)
            }
          }}
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(1)}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={() => setStep(3)} size="sm" disabled={!goal}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </FadeIn>
  )
}

export default Goal
