import { Button, Label } from "@/components/ui"
import HireHeading from "./HireHeading"
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react"
import FadeIn from "react-fade-in"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import TimeSelector from "./TimeSelector"
import TimezoneSelector from "./TimezoneSelector"

interface TimeFrameProps {
  timeFrame: string
  setTimeFrame: (timeFrame: string) => void
  setStep: (step: number) => void
  feedbackType: string
}

const TimeFrame = ({
  timeFrame,
  setTimeFrame,
  setStep,
  feedbackType,
}: TimeFrameProps) => {
  const report = feedbackType === "report"
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [timezone, setTimezone] = useState("")

  useEffect(() => {
    if (!date) return
    const formattedTimeFrame = `${format(date, "PPP")}${
      time ? `, ${time}` : ""
    }${timezone ? `, ${timezone}` : ""}`
    setTimeFrame(formattedTimeFrame)
  }, [date, time, timezone, setTimeFrame])

  return (
    <FadeIn>
      <HireHeading
        heading={
          report
            ? "When do you want to receieve the report?"
            : "Schedule your feedback jam session"
        }
        text="Choose the date and time that works best for you. We will do everything in our power to accommodate your schedule."
      />

      <div className="grid gap-6 mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="grid space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal rounded-md",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-input" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid space-y-2">
            <Label htmlFor="time">Time</Label>
            <TimeSelector time={time} onTimeChange={setTime} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>

          <TimezoneSelector
            timezone={timezone}
            onTimezoneChange={setTimezone}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(5)}
          size="sm"
          variant="link"
          className="p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => setStep(7)}
          size="sm"
          disabled={!timeFrame.length}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </FadeIn>
  )
}

export default TimeFrame
