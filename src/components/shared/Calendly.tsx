import { PopupButton, useCalendlyEventListener } from "react-calendly"
import { Button } from "../ui/button"

interface CalendlyProps {
  setMeetingBooked: (meetingBooked: string | null) => void
}

const Calendly = ({ setMeetingBooked }: CalendlyProps) => {
  useCalendlyEventListener({
    onEventScheduled: (e) => setMeetingBooked(e.data.payload.event.uri),
  })

  return (
    <div>
      <Button variant="secondary" asChild>
        <PopupButton
          url="https://calendly.com/spark-and-mint-talent/hello"
          rootElement={document.getElementById("root")!}
          text="Click here to schedule"
        />
      </Button>
    </div>
  )
}

export default Calendly
