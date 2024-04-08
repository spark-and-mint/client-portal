import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const XField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="x"
      render={({ field }) => (
        <FormItem>
          <FormLabel>X</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="https://x.com/yourusername"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default XField
