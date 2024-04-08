import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const FarcasterField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="farcaster"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Farcaster</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="https://warpcast.com/yourusername"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FarcasterField
