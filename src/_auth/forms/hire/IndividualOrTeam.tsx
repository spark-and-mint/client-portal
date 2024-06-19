import { ArrowLeft, UserIcon, UsersIcon } from "lucide-react"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import FadeIn from "react-fade-in"
import { Button } from "@/components/ui"
import { useNavigate } from "react-router-dom"

const IndividualOrTeam = ({ stakeholder, setIndividualOrTeam, setStep }) => {
  const navigate = useNavigate()

  return (
    <FadeIn>
      <HireHeading
        heading="How can we contribute to your success?"
        text={
          stakeholder?.clientId
            ? "Select your team size to get started."
            : "Select your team size"
        }
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          Icon={UserIcon}
          heading="One superstar"
          text="Only need one person? Let's find your star."
          onClick={() => {
            setIndividualOrTeam("individual"), setStep(3)
          }}
        />
        <ButtonCard
          Icon={UsersIcon}
          heading="Small team"
          text="Harness the power of a top-tier team."
          onClick={() => {
            setIndividualOrTeam("team"), setStep(3)
          }}
        />
      </div>
      <div className="flex justify-start mt-8">
        <Button
          onClick={() => (stakeholder.clientId ? navigate(-1) : setStep(1))}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </FadeIn>
  )
}

export default IndividualOrTeam
