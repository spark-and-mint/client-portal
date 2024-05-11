import { Button } from "@/components/ui"
import { MailCheck, ArrowRight } from "lucide-react"
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const confettiProps: ConfettiProps = {
  force: 0.7,
  duration: 3000,
  particleCount: 80,
  width: 1600,
  colors: ["#1a2746", "#1471BF", "#5BB4DC", "#eeffff", "#cbeafe"],
  zIndex: 1000,
}

const FinalStep = ({ individualOrTeam }) => {
  return (
    <FadeIn>
      <div className="flex flex-col mt-4 items-center text-center">
        <div className="flex items-center justify-center">
          <ConfettiExplosion {...confettiProps} />
        </div>
        <div className="animate-border flex items-center justify-center w-16 h-16 bg-white bg-gradient-to-r from-cyan-300 via-purple-300 to-teal-300 bg-[length:400%_400%] text-slate-900 rounded-full">
          <MailCheck strokeWidth={1.5} className="w-10 h-10" />
        </div>
        <h3 className="h3 mt-4">
          {individualOrTeam === "team"
            ? "Your Superstars are on the Way!"
            : "Your Superstar is on the Way!"}
        </h3>
        <p className="sm:w-[34rem] mt-2 text-[1.1rem] text-muted-foreground leading-7">
          Thanks for submitting your request. A Spark representative will
          connect with you within a business day to outline our game plan. Get
          ready to make some waves!
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/" className="block">
          <Button>
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </FadeIn>
  )
}

export default FinalStep
