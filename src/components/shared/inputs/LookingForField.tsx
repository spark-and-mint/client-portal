import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const LookingForField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="lookingFor"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What kind of work are you looking for?</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Please specify" {...field} />
          </FormControl>
          <FormDescription>
            Full-time employment, part-time gigs, freelance opportunities, or
            something else?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default LookingForField
