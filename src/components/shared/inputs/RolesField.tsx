import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"
import roles from "@/lib/constants/roles"
import { IOption } from "@/types"
import MultipleSelector from "@/components/ui/multi-select"
import { mockSearch } from "@/lib/utils"

const RolesField = () => {
  const { control } = useFormContext()
  const roleOptions: IOption[] = roles

  return (
    <FormField
      control={control}
      name="roles"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Which roles describe you best?</FormLabel>
          <FormControl>
            <MultipleSelector
              value={field.value}
              onChange={field.onChange}
              defaultOptions={roleOptions}
              onSearch={async (value) => {
                const res = await mockSearch(value, roleOptions)
                return res
              }}
              groupBy="group"
              hidePlaceholderWhenSelected
              triggerSearchOnFocus
              placeholder="Search and select your primary roles"
              emptyIndicator={
                <p className="w-full text-center leading-10 text-white">
                  No results found.
                </p>
              }
            />
          </FormControl>
          <FormDescription>
            We know these can be over-simplified, but it helps us understand
            your general focus.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RolesField
