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

const WorkStatusField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="workStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your current work status?</FormLabel>
          <Select
            value={field.value ?? undefined}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your work status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Freelancer/Consultant">
                Freelancer/Consultant
              </SelectItem>
              <SelectItem value="Part Time Employee">
                Part Time Employee
              </SelectItem>
              <SelectItem value="Full Time Employee">
                Full Time Employee
              </SelectItem>
              <SelectItem value="Fractional Leader">
                Fractional Leader
              </SelectItem>
              <SelectItem value="Consultant + Employee Mix">
                Consultant + Employee Mix
              </SelectItem>
              <SelectItem value="None of The Above">
                None of The Above
              </SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            We understand that work scenario's vary a lot today. Do your best to
            choose the scenario that best describes your current situation.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default WorkStatusField
