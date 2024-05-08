import { Button } from "@/components/ui"
import { ArrowLeft } from "lucide-react"
import ButtonCard from "./ButtonCard"
import HireHeading from "./HireHeading"
import FadeIn from "react-fade-in"

const ContactPreference = ({ setContactPreference, setStep }) => {
  return (
    <FadeIn>
      <HireHeading heading="How do you want us to get back to you?" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <ButtonCard
          small
          text="Video meeting"
          onClick={() => {
            setContactPreference("Video meeting"), setStep(8)
          }}
        />
        <ButtonCard
          small
          text="Email"
          onClick={() => {
            setContactPreference("Email"), setStep(8)
          }}
        />
        <ButtonCard
          small
          text="Telegram"
          onClick={() => {
            setContactPreference("Telegram"), setStep(8)
          }}
        />
        <ButtonCard
          small
          text="WhatsApp"
          onClick={() => {
            setContactPreference("WhatsApp"), setStep(8)
          }}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => setStep(6)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </FadeIn>
  )
}

export default ContactPreference
