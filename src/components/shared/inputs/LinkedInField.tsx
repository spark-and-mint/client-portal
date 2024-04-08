import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const LinkedInField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="linkedin"
      render={({ field }) => (
        <FormItem>
          <FormLabel>LinkedIn</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="https://linkedin.com/in/yourusername"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default LinkedInField
