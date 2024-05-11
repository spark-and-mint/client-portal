import { PopupButton, useCalendlyEventListener } from "react-calendly"
import { Button } from "../ui/button"

interface CalendlyProps {
  setContactInfo: (contactInfo: string | null) => void
}

const Calendly = ({ setContactInfo }: CalendlyProps) => {
  useCalendlyEventListener({
    onEventScheduled: (e) => setContactInfo(e.data.payload.event.uri),
  })

  return (
    <div>
      <Button variant="secondary" asChild>
        <PopupButton
          url="https://calendly.com/spark-and-mint-talent/brief"
          rootElement={document.getElementById("root")!}
          text="Click here to schedule"
        />
      </Button>
    </div>
  )
}

export default Calendly
