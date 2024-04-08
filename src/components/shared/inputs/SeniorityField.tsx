import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const SeniorityField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="seniority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your current level of seniority?</FormLabel>
          <Select
            value={field.value ?? undefined}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Executive">Executive</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Select the option that best describes your current professional
            level. This helps us understand your experience and how you might
            fit into projects.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SeniorityField
