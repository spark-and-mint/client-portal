import { ArrowRight } from "lucide-react"
import HireHeading from "./HireHeading"
import { Button } from "@/components/ui"
import FadeIn from "react-fade-in"
import CreatableSelect from "react-select/creatable"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useGetClients } from "@/lib/react-query/queries"
import { createFilter } from "react-select"

const Company = ({ company, setCompany, setStep }) => {
  const { data: clients } = useGetClients()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const getClientOptions = (clients) => {
    return clients?.documents.map((client) => ({
      label: client.name,
      value: client.$id,
    }))
  }

  const handleCreate = (value: string) => {
    const companyValue = { label: value, value: null }
    setCompany(companyValue)
  }

  return (
    <FadeIn>
      <HireHeading
        heading="What's the name of your company?"
        text="Enter or select the name of your company or organization."
      />
      <div className="mt-6 space-y-6">
        <CreatableSelect
          options={getClientOptions(clients)}
          filterOption={createFilter({
            matchFrom: "any",
            stringify: (option) => `${option.label}`,
          })}
          onCreateOption={handleCreate}
          unstyled={true}
          value={company}
          placeholder="Search and select..."
          isClearable={true}
          noOptionsMessage={() => "No results found."}
          onInputChange={(input) => {
            if (input) {
              setMenuIsOpen(true)
            } else {
              setMenuIsOpen(false)
            }
          }}
          menuIsOpen={menuIsOpen}
          classNames={{
            control: (e) =>
              cn(
                `h-10 rounded-md border border-accent`,
                `px-3 py-2 bg-background text-sm `,
                e.isFocused
                  ? "ring-2 ring-ring ring-offset-2 ring-offset-background"
                  : ""
              ),
            indicatorSeparator: () => "opacity-0",
            dropdownIndicator: () => "opacity-0",
            clearIndicator: () =>
              "translate-x-5 z-10 cursor-pointer opacity-80",
            placeholder: () => "text-placeholder",
            menuList: () => "overflow-x-hidden",
            menu: () =>
              cn(
                "absolute top-0 mt-2 text-sm z-10 w-full",
                "rounded-md border border-accent bg-popover shadow-md "
              ),
            option: () =>
              cn(
                "w-full py-1.5 px-2 m-1 text-sm outline-none cursor-default rounded-sm",
                "focus:bg-gray-200 hover:bg-slate-700"
              ),
            noOptionsMessage: () => "py-3",
            input: () => "text-sm overflow-x-hidden",
          }}
          onChange={(selectedOption) => {
            setCompany(selectedOption)
          }}
        />
      </div>
      <div className="flex justify-end mt-8">
        <Button onClick={() => setStep(2)} size="sm" disabled={!company}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </FadeIn>
  )
}

export default Company
