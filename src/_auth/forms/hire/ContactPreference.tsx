import { Button } from "@/components/ui"
import { ArrowLeft } from "lucide-react"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"

const ContactPreference = ({ setContactPreference, setStep }) => {
  return (
    <div>
      <HireHeading heading="How do you want us to get back to you?" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <ButtonCard
          small
          text="Video meeting"
          onClick={() => {
            setContactPreference("Video meeting"), setStep(9)
          }}
        />
        <ButtonCard
          small
          text="Email"
          onClick={() => {
            setContactPreference("Email"), setStep(9)
          }}
        />
        <ButtonCard
          small
          text="Telegram"
          onClick={() => {
            setContactPreference("Telegram"), setStep(9)
          }}
        />
        <ButtonCard
          small
          text="WhatsApp"
          onClick={() => {
            setContactPreference("WhatsApp"), setStep(9)
          }}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => setStep(7)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )
}

export default ContactPreference
