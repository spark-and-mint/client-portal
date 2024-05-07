import { useState } from "react"
import IndividualOrTeam from "./IndividualOrTeam"
import Industry from "./Industry"
import Budget from "./Budget"
import TimeFrame from "./TimeFrame"
import { cn } from "@/lib/utils"
import Goal from "./Goal"
import { IOption } from "@/types"
import Skill from "./Skill"
import FixedOrOngoing from "./FixedOrOngoing"
import { Button } from "@/components/ui"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ContactPreference from "./ContactPreference"
import { Link } from "react-router-dom"

const Hire = () => {
  const [step, setStep] = useState(1)
  const [individualOrTeam, setIndividualOrTeam] = useState("")
  const [fixedOrOngoing, setFixedOrOngoing] = useState("")
  const [goal, setGoal] = useState<null | IOption>(null)
  const [skill, setSkill] = useState("")
  const [industry, setIndustry] = useState("")
  const [timeFrame, setTimeFrame] = useState("")
  const [budget, setBudget] = useState("")
  const [contactPreference, setContactPreference] = useState("")

  const STEPS = {
    1: (
      <IndividualOrTeam
        setIndividualOrTeam={setIndividualOrTeam}
        setStep={setStep}
      />
    ),
    2: <Goal goal={goal} setGoal={setGoal} setStep={setStep} />,
    3: (
      <FixedOrOngoing setFixedOrOngoing={setFixedOrOngoing} setStep={setStep} />
    ),
    4: <Industry setIndustry={setIndustry} setStep={setStep} />,
    5: <Skill setSkill={setSkill} setStep={setStep} />,
    6: (
      <TimeFrame
        setTimeFrame={setTimeFrame}
        setStep={setStep}
        individualOrTeam={individualOrTeam}
      />
    ),
    7: (
      <Budget
        setBudget={setBudget}
        setStep={setStep}
        individualOrTeam={individualOrTeam}
        fixedOrOngoing={fixedOrOngoing}
      />
    ),
    8: (
      <ContactPreference
        setContactPreference={setContactPreference}
        setStep={setStep}
      />
    ),
    9: (
      <div>
        <div className="flex flex-col gap-2 mt-8 text-lg">
          <div>
            <span className="pr-1 font-medium text-primary">
              Individual or team:{" "}
            </span>
            {individualOrTeam}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">
              Fixed or ongoing:{" "}
            </span>
            {fixedOrOngoing}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">Goal: </span>
            {goal?.value}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">Skill: </span>
            {skill}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">Industry: </span>
            {industry}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">Time frame: </span>
            {timeFrame}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">Budget: </span>
            {budget}
          </div>
          <div>
            <span className="pr-1 font-medium text-primary">
              Contact preference:{" "}
            </span>
            {contactPreference}
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setStep(8)} size="sm" variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Link to="/">
            <Button size="sm">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    ),
  }

  return (
    <div className={cn("container max-w-[58rem] pt-[6vw]")}>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-primary text-xs font-semibold tracking-wider uppercase">
          Step {step}{" "}
          <span className="text-muted-foreground">
            / {Object.values(STEPS).length}
          </span>
        </p>
      </div>
      {STEPS[step]}
    </div>
  )
}

export default Hire
