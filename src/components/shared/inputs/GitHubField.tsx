import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const GitHubField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="github"
      render={({ field }) => (
        <FormItem>
          <FormLabel>GitHub</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="https://github.com/yourusername"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default GitHubField
