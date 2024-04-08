import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import MultipleSelector from "@/components/ui/multi-select"
import { useFormContext } from "react-hook-form"
import skills from "@/lib/constants/skills"
import { IOption } from "@/types"
import { mockSearch } from "@/lib/utils"

const SkillsField = () => {
  const { control } = useFormContext()
  const skillOptions: IOption[] = skills

  return (
    <FormField
      control={control}
      name="skills"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What are your top skills?</FormLabel>
          <FormControl>
            <MultipleSelector
              value={field.value}
              onChange={field.onChange}
              defaultOptions={skillOptions}
              onSearch={async (value) => {
                const res = await mockSearch(value, skillOptions)
                return res
              }}
              hidePlaceholderWhenSelected
              triggerSearchOnFocus
              placeholder="Search and select your skills"
              emptyIndicator={
                <p className="w-full text-center leading-10 text-white">
                  No results found.
                </p>
              }
            />
          </FormControl>
          <FormDescription>
            We'll use these to match you with clients and projects that fit you.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SkillsField
