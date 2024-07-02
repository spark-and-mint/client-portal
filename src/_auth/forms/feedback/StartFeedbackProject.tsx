import { useState } from "react"
import FeedbackType from "./FeedbackType"
import Industry from "./Industry"
import TimeFrame from "./TimeFrame"
import { cn } from "@/lib/utils"
import { IOption } from "@/types"
import ProgressBar from "./ProgressBar"
import { toast } from "sonner"
import { useStakeholderContext } from "@/context/AuthContext"
import {
  useCreateClient,
  useCreateFeedbackRequest,
  useUpdateStakeholder,
} from "@/lib/react-query/queries"
import Company from "./Company"
import Expertise from "./Expertise"
import NumberOfExperts from "./NumberOfExperts"
import PaymentSummary from "./PaymentSummary"
import AddMaterial from "./AddMaterial"

const StartFeedbackProject = () => {
  const { stakeholder, setStakeholder, setFeedbackRequests } =
    useStakeholderContext()
  const [step, setStep] = useState(stakeholder.clientId ? 2 : 1)
  const [company, setCompany] = useState<null | IOption>(null)
  const [feedbackType, setFeedbackType] = useState("")
  const [numberOfExperts, setNumberOfExperts] = useState(0)
  const [expertise, setExpertise] = useState("")
  const [industry, setIndustry] = useState("")
  const [timeFrame, setTimeFrame] = useState("")
  const { mutateAsync: createClient } = useCreateClient()
  const { mutateAsync: updateStakeholder } = useUpdateStakeholder()
  const { mutateAsync: createFeedbackRequest } = useCreateFeedbackRequest()

  const handleSubmit = async () => {
    try {
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

      const feedbackRequest = await createFeedbackRequest({
        stakeholderId: stakeholder.id,
        feedbackType,
        numberOfExperts,
        industry,
        expertise,
        timeFrame,
        status: "in review",
      })

      if (feedbackRequest) {
        setFeedbackRequests((prev) => [...prev, feedbackRequest].reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to create feedback request. Please try again")
    }
  }

  const steps = {
    1: <Company company={company} setCompany={setCompany} setStep={setStep} />,
    2: (
      <FeedbackType
        stakeholder={stakeholder}
        setFeedbackType={setFeedbackType}
        setStep={setStep}
      />
    ),
    3: (
      <NumberOfExperts
        setNumberOfExperts={setNumberOfExperts}
        setStep={setStep}
      />
    ),
    4: (
      <Expertise
        expertise={expertise}
        setExpertise={setExpertise}
        setStep={setStep}
      />
    ),
    5: <Industry setIndustry={setIndustry} setStep={setStep} />,
    6: (
      <TimeFrame
        setTimeFrame={setTimeFrame}
        setStep={setStep}
        feedbackType={feedbackType}
      />
    ),
    7: (
      <PaymentSummary
        feedbackType={feedbackType}
        numberOfExperts={numberOfExperts}
        expertise={expertise}
        industry={industry}
        timeFrame={timeFrame}
        setStep={setStep}
        handleSubmit={handleSubmit}
      />
    ),
    8: <AddMaterial handleSubmit={handleSubmit} />,
  }

  return (
    <div
      className={cn(
        "container pt-[6vw] -mt-6",
        step === 7
          ? "max-w-[80rem]"
          : step === Object.values(steps).length
          ? "max-w-[62rem]"
          : "max-w-[56rem]"
      )}
    >
      {step === Object.values(steps).length ||
      step === 7 ||
      step === 8 ? null : (
        <ProgressBar step={step} steps={steps} />
      )}
      {steps[step]}
    </div>
  )
}

export default StartFeedbackProject
