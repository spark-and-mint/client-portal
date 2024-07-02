import { Card } from "@/components/ui/card"
import { ArrowRight, LucideIcon } from "lucide-react"

interface ButtonCardProps {
  Icon?: LucideIcon
  heading?: string
  text?: string
  small?: boolean
  onClick: () => void
}

const ButtonCard = ({
  Icon,
  heading,
  text,
  small,
  onClick,
}: ButtonCardProps) => {
  if (small) {
    return (
      <Card
        className="flex items-center justify-between px-4 py-3 group hover:bg-slate-400/10 hover:border-primary transition-colors duration-100 cursor-pointer"
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
          <div className="flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-100 bg-transparent border border-primary text-primary group-hover:bg-primary group-hover:text-black">
            <ArrowRight strokeWidth={1.3} className="w-4 h-4" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="flex items-center justify-between py-4 group hover:bg-slate-400/10 hover:border-primary transition-colors duration-100 cursor-pointer"
      onClick={onClick}
      tabIndex={0}
    >
      <div className="flex items-center gap-6">
        {Icon && (
          <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full">
            <Icon strokeWidth={2} className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1">
          <h6 className="h6 font-medium text-lg group-hover:text-white transition-colors duration-100">
            {heading}
          </h6>
          {text && (
            <p className="pr-2 sm:pr-0 text-[0.95rem] text-white/80">{text}</p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-100 bg-transparent border border-primary text-primary group-hover:bg-primary group-hover:text-black">
          <ArrowRight strokeWidth={1.3} className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}

export default ButtonCard
