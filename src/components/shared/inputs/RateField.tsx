import {
  FormControl,
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

const RateField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="rate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your hourly rate in USD?</FormLabel>
          <Select
            value={field.value ?? undefined}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your hourly rate" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="50-75">50-75</SelectItem>
              <SelectItem value="75-100">75-100</SelectItem>
              <SelectItem value="100-125">100-125</SelectItem>
              <SelectItem value="125-150">125-150</SelectItem>
              <SelectItem value="150+">150+</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RateField
