import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { ExternalLinkIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import Calendly from "../Calendly"

const MeetingField = ({ stakeholder, meetingBooked, setMeetingBooked }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="meeting"
      defaultValue={stakeholder.meeting}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {meetingBooked
              ? "Meeting booked!"
              : "Book a meeting with us to discuss your profile"}
          </FormLabel>
          <FormControl>
            <div>
              <Input
                type="text"
                {...field}
                value={field.value || ""}
                className="hidden"
              />
              {meetingBooked ? (
                <Button variant="secondary">
                  Link to meeting
                  <ExternalLinkIcon className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Calendly setMeetingBooked={setMeetingBooked} />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default MeetingField
