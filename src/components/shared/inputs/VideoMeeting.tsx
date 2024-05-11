import { CheckCircle } from "lucide-react"
import Calendly from "../Calendly"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const VideoMeeting = ({ contactInfo, setContactInfo }) => {
  return (
    <div>
      <div className="mt-8 mb-10">
        {contactInfo === "" ? (
          <Calendly setContactInfo={setContactInfo} />
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Meeting booked successfully!</AlertTitle>
            <AlertDescription className="flex items-center gap-1 pt-2 text-muted-foreground">
              Submit your request to continue.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default VideoMeeting
