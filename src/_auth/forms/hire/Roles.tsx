import { ArrowLeft, ArrowRight } from "lucide-react"
import Checkbox from "./Checkbox"
import HireHeading from "./HireHeading"
import { Button } from "@/components/ui"
import { useEffect, useState } from "react"
import ButtonCard from "./ButtonCard"

const Roles = ({ setRoles, setStep, individualOrTeam }) => {
  const [roleString, setRoleString] = useState<string[]>([])
  const plural = individualOrTeam === "team" ? "s" : ""

  const handleSelect = (type: string) => {
    if (roleString.includes(type)) {
      setRoleString(roleString.filter((role) => role !== type))
    } else {
      setRoleString([...roleString, type])
    }
  }

  useEffect(() => {
    setRoles(roleString.length > 0 ? roleString.join(", ") : "")
  }, [roleString, setRoles])

  return (
    <div>
      <HireHeading
        heading={`What role${plural} are you hiring for?`}
        text={plural ? "Select all that apply." : null}
      />
      {plural ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Checkbox
            text={`Developer${plural}`}
            selected={roleString.includes("Developers")}
            onClick={() => handleSelect("Developers")}
          />
          <Checkbox
            text={`Designer${plural}`}
            selected={roleString.includes("Designers")}
            onClick={() => handleSelect("Designers")}
          />
          <Checkbox
            text="Marketing / Sales"
            selected={roleString.includes("Marketing experts")}
            onClick={() => handleSelect("Marketing experts")}
          />
          <Checkbox
            text={`Project Manager${plural}`}
            selected={roleString.includes("Project Managers")}
            onClick={() => handleSelect("Project Managers")}
          />
          <Checkbox
            text={`Product Manager${plural}`}
            selected={roleString.includes("Product Managers")}
            onClick={() => handleSelect("Product Managers")}
          />
          <Checkbox
            text="Other"
            selected={roleString.includes("Other")}
            onClick={() => handleSelect("Other")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-8">
          <ButtonCard
            small
            text={`Developer`}
            onClick={() => {
              setRoles("Developer"), setStep(3)
            }}
          />
          <ButtonCard
            small
            text={`Designer`}
            onClick={() => {
              setRoles("Designer"), setStep(3)
            }}
          />
          <ButtonCard
            small
            text="Marketing Expert"
            onClick={() => {
              setRoles("Marketing expert"), setStep(3)
            }}
          />
          <ButtonCard
            small
            text={`Project Manager`}
            onClick={() => {
              setRoles("Project Manager"), setStep(3)
            }}
          />
          <ButtonCard
            small
            text={`Product Manager`}
            onClick={() => {
              setRoles("Product Manager"), setStep(3)
            }}
          />
          <ButtonCard
            small
            text="Other"
            onClick={() => {
              setRoles("Other"), setStep(3)
            }}
          />
        </div>
      )}
      <div className="flex justify-between mt-8">
        <Button onClick={() => setStep(1)} size="sm" variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {plural && (
          <Button
            onClick={() => setStep(3)}
            size="sm"
            disabled={!roleString.length}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Roles
