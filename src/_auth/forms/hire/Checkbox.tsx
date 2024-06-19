import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface CheckboxProps {
  text: string
  onClick: () => void
  selected: boolean
}

const Checkbox = ({ text, onClick, selected }: CheckboxProps) => {
  return (
    <Card
      className={cn(
        "flex items-center justify-between px-4 py-3 group hover:bg-slate-400/10 hover:border-primary transition-colors duration-100 cursor-pointer",
        selected && "bg-slate-400/10 border-primary"
      )}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="flex flex-col gap-6">
        <div className="flex-1">
          <h6 className="h6 mb-0.25 font-medium text-[0.95rem] group-hover:text-white transition-colors duration-100">
            {text}
          </h6>
        </div>
      </div>
      <div className="flex items-center">
        <CheckCircle2
          strokeWidth={1.25}
          className={cn(
            "w-6 h-6 rounded-full transition-colors duration-100 ",
            selected ? "bg-primary text-black" : " text-muted-foreground/30"
          )}
        />
      </div>
    </Card>
  )
}

export default Checkbox
