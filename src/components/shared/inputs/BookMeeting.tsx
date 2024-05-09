import { Button } from "@/components/ui"
import { ExternalLinkIcon } from "lucide-react"
import Calendly from "../Calendly"

const BookMeeting = ({ meetingBooked, setMeetingBooked }) => {
  return (
    <div>
      <div className="my-10">
        {meetingBooked && <p className="mb-2">Meeting booked successfully!</p>}
        {meetingBooked ? (
          <Button variant="secondary">
            Link to meeting
            <ExternalLinkIcon className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Calendly setMeetingBooked={setMeetingBooked} />
        )}
      </div>
    </div>
  )
}

export default BookMeeting
