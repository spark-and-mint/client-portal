import { Button } from "@/components/ui"
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react"
import RadioButton from "./RadioButton"
import HireHeading from "./HireHeading"
import FadeIn from "react-fade-in"
import { useEffect, useState } from "react"
import { useStakeholderContext } from "@/context/AuthContext"

const ContactPreference = ({
  contactPreference,
  setContactPreference,
  setContactInfo,
  setStep,
}) => {
  const { setHasRequest } = useStakeholderContext()
  const [loading, setLoading] = useState(false)
  const handleSelect = (preference: string) => {
    setContactPreference(preference)
  }

  useEffect(() => {
    setContactInfo("")
  }, [setContactInfo])

  useEffect(() => {
    setHasRequest(true)
  }, [setHasRequest])

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(9)
    }, 3000)
  }

  return (
    <FadeIn>
      <HireHeading heading="How do you want us to get back to you?" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <RadioButton
          text="Email"
          selected={contactPreference === "Email"}
          onClick={() => handleSelect("Email")}
        />
        <RadioButton
          text="Video meeting"
          selected={contactPreference === "Video meeting"}
          onClick={() => handleSelect("Video meeting")}
        />
        <RadioButton
          text="Telegram"
          selected={contactPreference === "Telegram"}
          onClick={() => handleSelect("Telegram")}
        />
        <RadioButton
          text="WhatsApp"
          selected={contactPreference === "WhatsApp"}
          onClick={() => handleSelect("WhatsApp")}
        />
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={() => setStep(6)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() =>
            contactPreference === "Email" ? handleSubmit() : setStep(8)
          }
          size="sm"
          disabled={!contactPreference || loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              Submitting...
              <RotateCw className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {contactPreference === "Email" ? "Submit" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </FadeIn>
  )
}

export default ContactPreference
