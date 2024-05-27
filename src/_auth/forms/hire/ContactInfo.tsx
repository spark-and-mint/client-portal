import { ArrowLeft, ArrowRight, AtSign, Phone, RotateCw } from "lucide-react"
import HireHeading from "./HireHeading"
import { Button, Input } from "@/components/ui"
import FadeIn from "react-fade-in"
import VideoMeeting from "@/components/shared/inputs/VideoMeeting"

const ContactInfo = ({
  contactPreference,
  contactInfo,
  setContactInfo,
  handleSubmit,
  isCreatingRequest,
  setStep,
}) => {
  const HEADINGS = {
    "Video meeting": "Book a meeting with us",
    Telegram: "Drop your Telegram handle",
    WhatsApp: "Let's WhatsApp!",
  }

  const SUBHEADINGS = {
    "Video meeting": "You pick the time, we’ll handle the script.",
    Telegram: "Give us your username and we’ll pop into your DM's.",
    WhatsApp: "Drop your number and we’ll pop into your chat.",
  }

  const ICONS = {
    Telegram: (
      <AtSign
        strokeWidth={1.5}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
      />
    ),
    WhatsApp: (
      <Phone
        strokeWidth={1.5}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
      />
    ),
  }

  const PLACEHOLDERS = {
    Telegram: "SatoshiNakamoto",
    WhatsApp: "+1 (555) 987-6543",
  }

  return (
    <FadeIn>
      <HireHeading
        heading={HEADINGS[contactPreference]}
        text={SUBHEADINGS[contactPreference]}
      />
      <div className="mt-6 space-y-6">
        {contactPreference === "Video meeting" ? (
          <VideoMeeting
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
          />
        ) : (
          <div className="relative">
            {ICONS[contactPreference]}
            <Input
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder={PLACEHOLDERS[contactPreference]}
              className="h-12 px-3 py-2 pl-12 text-base"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(8)}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={() => handleSubmit()}
          size="sm"
          disabled={contactInfo === "" || isCreatingRequest}
        >
          {isCreatingRequest ? (
            <div className="flex items-center gap-2">
              Submitting...
              <RotateCw className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Submit
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </FadeIn>
  )
}

export default ContactInfo
