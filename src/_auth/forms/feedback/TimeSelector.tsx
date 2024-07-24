import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"

const TimeSelector = ({ time, onTimeChange }) => {
  const generateTimeOptions = () => {
    const options: string[] = []
    for (let hour = 9; hour <= 17; hour++) {
      const amPm = hour < 12 ? "AM" : "PM"
      const hour12 = hour > 12 ? hour - 12 : hour

      options.push(`${hour12}:00 ${amPm}`)
      if (hour !== 17) {
        options.push(`${hour12}:30 ${amPm}`)
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  return (
    <Select value={time} onValueChange={onTimeChange}>
      <SelectTrigger id="time">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TimeSelector
