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
import {
  useCreateClient,
  useCreateRequest,
  useUpdateStakeholder,
} from "@/lib/react-query/queries"
import Company from "./Company"

const StartProject = () => {
  const { stakeholder, setStakeholder, setRequests } = useStakeholderContext()
  const [step, setStep] = useState(stakeholder.clientId ? 2 : 1)
  const [company, setCompany] = useState<null | IOption>(null)
  const [individualOrTeam, setIndividualOrTeam] = useState("")
  const [fixedOrOngoing, setFixedOrOngoing] = useState("fixed")
  const [goal, setGoal] = useState<null | IOption>(null)
  const [skill, setSkill] = useState("")
  const [industry, setIndustry] = useState("")
  const [timeFrame, setTimeFrame] = useState("")
  const [budget, setBudget] = useState("")
  const [contactPreference, setContactPreference] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const { mutateAsync: createClient } = useCreateClient()
  const { mutateAsync: updateStakeholder } = useUpdateStakeholder()
  const { mutateAsync: createRequest } = useCreateRequest()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      if (company) {
        if (company.value) {
          const updatedStakeholder = await updateStakeholder({
            stakeholderId: stakeholder.id,
            firstName: stakeholder.firstName,
            lastName: stakeholder.lastName,
            email: stakeholder.email,
            avatarUrl: stakeholder.avatarUrl,
            avatarId: stakeholder.avatarId,
            file: [],
            company: company.label,
            clientId: company.value,
          })
          if (updatedStakeholder) {
            setStakeholder({
              ...stakeholder,
              ...updatedStakeholder,
            })
          } else {
            toast.error("Something went wrong. Please try again")
            return
          }
        } else {
          const client = await createClient({ name: company.label })
          if (client) {
            const updatedStakeholder = await updateStakeholder({
              stakeholderId: stakeholder.id,
              firstName: stakeholder.firstName,
              lastName: stakeholder.lastName,
              email: stakeholder.email,
              avatarUrl: stakeholder.avatarUrl,
              avatarId: stakeholder.avatarId,
              file: [],
              company: company.label,
              clientId: client?.$id,
            })

            if (updatedStakeholder) {
              setStakeholder({
                ...stakeholder,
                ...updatedStakeholder,
              })
            } else {
              toast.error("Something went wrong. Please try again")
              return
            }
          } else {
            toast.error("Something went wrong. Please try again")
            return
          }
        }
      }

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
        setStep(10)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to create request. Please try again")
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = {
    1: <Company company={company} setCompany={setCompany} setStep={setStep} />,
    2: (
      <IndividualOrTeam
        stakeholder={stakeholder}
        setIndividualOrTeam={setIndividualOrTeam}
        setStep={setStep}
      />
    ),
    3: <Goal goal={goal} setGoal={setGoal} setStep={setStep} />,
    4: <Industry setIndustry={setIndustry} setStep={setStep} />,
    5: <Skill skill={skill} setSkill={setSkill} setStep={setStep} />,
    6: (
      <TimeFrame
        setTimeFrame={setTimeFrame}
        setStep={setStep}
        individualOrTeam={individualOrTeam}
      />
    ),
    7: (
      <Budget
        budget={budget}
        setBudget={setBudget}
        setStep={setStep}
        setFixedOrOngoing={setFixedOrOngoing}
      />
    ),
    8: (
      <ContactPreference
        contactPreference={contactPreference}
        setContactPreference={setContactPreference}
        setContactInfo={setContactInfo}
        setStep={setStep}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
      />
    ),
    9: (
      <ContactInfo
        contactPreference={contactPreference}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        setStep={setStep}
      />
    ),
    10: <FinalStep individualOrTeam={individualOrTeam} />,
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

export default StartProject
