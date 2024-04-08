import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import MultipleSelector from "@/components/ui/multi-select"
import domains from "@/lib/constants/domains"
import { IOption } from "@/types"

const DomainsField = () => {
  const { control } = useFormContext()
  const domainOptions: IOption[] = domains

  return (
    <FormField
      control={control}
      name="domains"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What industries or domains have you worked in?</FormLabel>
          <FormControl>
            <MultipleSelector
              value={field.value}
              onChange={field.onChange}
              defaultOptions={domainOptions}
              hidePlaceholderWhenSelected
              placeholder="Choose as many as you like..."
            />
          </FormControl>
          <FormDescription>
            We recommend selecting industries and domains you're fairly
            comfortable in vs. ones you've only dabbled in.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DomainsField
