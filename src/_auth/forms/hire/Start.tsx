import { useState } from "react"
import IndividualOrTeam from "./IndividualOrTeam"
import Industry from "./Industry"
import Budget from "./Budget"
import TimeFrame from "./TimeFrame"
import { cn } from "@/lib/utils"
import Goal from "./Goal"
import { IOption } from "@/types"
import Skill from "./Skill"
import ContactPreference from "./ContactPreference"
import ContactInfo from "./ContactInfo"
import ProgressBar from "./ProgressBar"
import { toast } from "sonner"
import FinalStep from "./FinalStep"
import { useStakeholderContext } from "@/context/AuthContext"
import { useCreateRequest } from "@/lib/react-query/queries"

const Start = () => {
  const { stakeholder, setRequests } = useStakeholderContext()
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

  const { mutateAsync: createRequest, isPending: isCreatingRequest } =
    useCreateRequest()

  const handleSubmit = async () => {
    const request = await createRequest({
      stakeholderId: stakeholder.id,
      individualOrTeam,
      fixedOrOngoing,
      goal: goal?.value || "",
      skill,
      industry,
      timeFrame,
      budget,
      contactPreference,
      contactInfo,
    })

    if (request) {
      setRequests((prev) => [...prev, request].reverse())
      setStep(9)
    } else {
      toast.error("Failed to create request. Please try again")
    }
  }

  const steps = {
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
        budget={budget}
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
        isCreatingRequest={isCreatingRequest}
        handleSubmit={handleSubmit}
      />
    ),
    8: (
      <ContactInfo
        contactPreference={contactPreference}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        handleSubmit={handleSubmit}
        isCreatingRequest={isCreatingRequest}
        setStep={setStep}
      />
    ),
    9: <FinalStep individualOrTeam={individualOrTeam} />,
  }

  return (
    <div
      className={cn(
        "container pt-[6vw]",
        step === Object.values(steps).length ? "max-w-[62rem]" : "max-w-[56rem]"
      )}
    >
      {step === Object.values(steps).length ? null : (
        <ProgressBar step={step} steps={steps} />
      )}
      {steps[step]}
    </div>
  )
}

export default Start
