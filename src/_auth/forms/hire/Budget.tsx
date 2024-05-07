import HireHeading from "./HireHeading"
import ButtonCard from "./ButtonCard"
import { Button } from "@/components/ui"
import { ArrowLeft } from "lucide-react"

const Budget = ({ setBudget, setStep, individualOrTeam, fixedOrOngoing }) => {
  const plural = individualOrTeam === "team"
  const fixed = fixedOrOngoing === "fixed"

  return (
    <div>
      <HireHeading
        heading={
          plural
            ? `What is your ${
                fixed ? "" : "monthly "
              }budget range for this team?`
            : `What is your ${
                fixed ? "" : "monthly "
              }budget range for this individual?`
        }
        text="All prices are in USD."
      />

      <div className="grid grid-cols-2 gap-4 mt-8">
        <ButtonCard
          small
          text={fixed ? `$5,000 – $20,000` : "$5,000 – $10,000"}
          onClick={() => {
            setBudget(fixed ? `$5,000 – $20,000` : "$5,000 – $10,000"),
              setStep(8)
          }}
        />
        <ButtonCard
          small
          text={fixed ? `$20,000 – $55,000` : "$10,000 – $15,000"}
          onClick={() => {
            setBudget(fixed ? `$20,000 – $55,000` : "$10,000 – $15,000"),
              setStep(8)
          }}
        />
        <ButtonCard
          small
          text={fixed ? `$55,000 – $95,000` : "$15,000 – $20,000"}
          onClick={() => {
            setBudget(fixed ? `$55,000 – $95,000` : "$15,000 – $20,000"),
              setStep(8)
          }}
        />
        <ButtonCard
          small
          text={fixed ? "$95,000+" : "$20,000+"}
          onClick={() => {
            setBudget(fixed ? "$95,000+" : "$20,000+"), setStep(8)
          }}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => setStep(6)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )
}

export default Budget
