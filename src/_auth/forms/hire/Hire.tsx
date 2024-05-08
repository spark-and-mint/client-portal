import { useState } from "react"
import IndividualOrTeam from "./IndividualOrTeam"
import Industry from "./Industry"
import Budget from "./Budget"
import TimeFrame from "./TimeFrame"
import { cn } from "@/lib/utils"
import Goal from "./Goal"
import { IOption } from "@/types"
import Skill from "./Skill"
import { Button } from "@/components/ui"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ContactPreference from "./ContactPreference"
import { Link } from "react-router-dom"
import FadeIn from "react-fade-in"

const Hire = () => {
  const [step, setStep] = useState(1)
  const [individualOrTeam, setIndividualOrTeam] = useState("")
  const [fixedOrOngoing, setFixedOrOngoing] = useState("fixed")
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
    3: <Industry setIndustry={setIndustry} setStep={setStep} />,
    4: <Skill setSkill={setSkill} setStep={setStep} />,
    5: (
      <TimeFrame
        setTimeFrame={setTimeFrame}
        setStep={setStep}
        individualOrTeam={individualOrTeam}
      />
    ),
    6: (
      <Budget
        setBudget={setBudget}
        setStep={setStep}
        setFixedOrOngoing={setFixedOrOngoing}
      />
    ),
    7: (
      <ContactPreference
        setContactPreference={setContactPreference}
        setStep={setStep}
      />
    ),
    8: (
      <FadeIn>
        <div className="flex flex-col gap-2 mt-8 text-sm">
          <p>
            You are looking to hire{" "}
            <span className="font-semibold">{individualOrTeam}</span> for{" "}
            <span className="font-semibold">{goal?.label}</span> in the{" "}
            <span className="font-semibold">{industry}</span> industry.
          </p>
          <p>
            You need someone with{" "}
            <span className="font-semibold">{skill.toLowerCase()}</span> skills
            and are looking to start{" "}
            <span className="font-semibold">{timeFrame}</span>.
          </p>
          <p>
            Your budget is{" "}
            <span className="font-semibold">
              {budget ? `$${budget}` : "undisclosed"}
            </span>{" "}
            and you prefer to be contacted via{" "}
            <span className="font-semibold">{contactPreference}</span>.
          </p>
          <p>
            You have opted for{" "}
            <span className="font-semibold">
              {fixedOrOngoing === "fixed" ? "a fixed price" : "an ongoing"}
            </span>{" "}
            partnership.
          </p>
        </div>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setStep(7)} size="sm" variant="ghost">
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
      </FadeIn>
    ),
  }

  return (
    <div className={cn("container max-w-[56rem] pt-[6vw]")}>
      <div className="flex justify-between gap-2 max-w-[14rem] mb-4">
        {Object.values(STEPS).map((_, i) => (
          <span
            className={cn(
              "h-0.5 w-full rounded-md transition-colors duration-300",
              step > i ? "bg-primary" : "bg-secondary"
            )}
          ></span>
        ))}
      </div>
      <FadeIn className="flex items-center gap-2 mb-2 w-full">
        {/* <p className="text-primary text-xs font-semibold tracking-wider uppercase">
          Step {step}{" "}
          <span className="text-muted-foreground">
            / {Object.values(STEPS).length}
          </span>
        </p> */}
      </FadeIn>
      {STEPS[step]}
    </div>
  )
}

export default Hire
