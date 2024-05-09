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
import { ArrowRight, MailCheck } from "lucide-react"
import ContactPreference from "./ContactPreference"
import { Link } from "react-router-dom"
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion"
import FadeIn from "react-fade-in"
import ContactInfo from "./ContactInfo"

const confettiProps: ConfettiProps = {
  force: 0.7,
  duration: 3000,
  particleCount: 80,
  width: 1600,
  colors: ["#1a2746", "#1471BF", "#5BB4DC", "#eeffff", "#cbeafe"],
  zIndex: 1000,
}

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
  const [contactInfo, setContactInfo] = useState("")

  console.log(fixedOrOngoing)
  console.log(industry)
  console.log(timeFrame)
  console.log(budget)

  const STEPS = {
    1: (
      <IndividualOrTeam
        setIndividualOrTeam={setIndividualOrTeam}
        setStep={setStep}
      />
    ),
    2: <Goal goal={goal} setGoal={setGoal} setStep={setStep} />,
    3: <Industry setIndustry={setIndustry} setStep={setStep} />,
    4: <Skill skill={skill} setSkill={setSkill} setStep={setStep} />,
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
        contactPreference={contactPreference}
        setContactPreference={setContactPreference}
        setContactInfo={setContactInfo}
        setStep={setStep}
      />
    ),
    8: (
      <ContactInfo
        contactPreference={contactPreference}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        setStep={setStep}
      />
    ),
    9: (
      <FadeIn>
        <div className="flex flex-col mt-4 items-center text-center">
          <div className="flex items-center justify-center">
            <ConfettiExplosion {...confettiProps} />
          </div>
          <div className="animate-border flex items-center justify-center w-16 h-16 bg-white bg-gradient-to-r from-cyan-300 via-purple-300 to-teal-300 bg-[length:400%_400%] text-slate-900 rounded-full">
            <MailCheck strokeWidth={1.5} className="w-10 h-10" />
          </div>
          <h3 className="h3 mt-4">
            {individualOrTeam === "team"
              ? "Your Superstars are on the Way!"
              : "Your Superstar is on the Way!"}
          </h3>
          <p className="w-[38rem] mt-2 text-[1.1rem] text-muted-foreground leading-7">
            Thanks for submitting your request. A Spark representative will
            connect within a business day to outline our game plan. We’re
            talking synergy, strategy, and some serious talent—let’s head for a
            home run!
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/" className="block">
            <Button>
              Back to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </FadeIn>
    ),
  }

  return (
    <div
      className={cn(
        "container pt-[6vw]",
        step === 9 ? "max-w-[62rem]" : "max-w-[56rem]"
      )}
    >
      {step === 9 ? null : (
        <div className="flex justify-between gap-2 max-w-[14rem] mb-4">
          {Object.values(STEPS).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-0.5 w-full rounded-md transition-colors duration-300",
                step > i ? "bg-[#8ba9bc]" : "bg-secondary"
              )}
            ></span>
          ))}
        </div>
      )}
      {STEPS[step]}
    </div>
  )
}

export default Hire
