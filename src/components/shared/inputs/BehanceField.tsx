import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const BehanceField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="behance"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Behance</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="https://behance.net/yourusername"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default BehanceField
