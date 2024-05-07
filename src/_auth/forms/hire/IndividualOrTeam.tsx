import { UserIcon, UsersIcon } from "lucide-react"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"

const IndividualOrTeam = ({ setIndividualOrTeam, setStep }) => {
  return (
    <div>
      <HireHeading
        heading="How can we contribute to your success?"
        text="Select your team size to get started."
      />
      <div className="mt-8 space-y-6">
        <ButtonCard
          Icon={UserIcon}
          heading="One superstar"
          text="Only need one person? Let's find your star."
          onClick={() => {
            setIndividualOrTeam("individual"), setStep(2)
          }}
        />
        <ButtonCard
          Icon={UsersIcon}
          heading="Small team"
          text="Harness the power of a top-tier team."
          onClick={() => {
            setIndividualOrTeam("team"), setStep(2)
          }}
        />
      </div>
    </div>
  )
}

export default IndividualOrTeam
