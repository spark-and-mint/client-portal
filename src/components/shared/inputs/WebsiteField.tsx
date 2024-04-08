import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const WebsiteField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="website"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Do you have a portfolio or personal website you can share?
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="https://vitalik.ca" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default WebsiteField
