import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const DribbbleField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="dribbble"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dribbble</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="https://dribbble.com/yourusername"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DribbbleField
