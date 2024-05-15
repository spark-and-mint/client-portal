import { Button } from "@/components/ui"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Card } from "@/components/ui/card"
import { useStakeholderContext } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  ExternalLink,
  Heart,
  ScrollText,
  Sparkles,
} from "lucide-react"
import { useEffect } from "react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const Home = () => {
  const { stakeholder, requests } = useStakeholderContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <FadeIn className="pb-16 space-y-8">
      <div className="relative flex justify-between items-center mb-8 -mt-2">
        <div>
          <h4 className="h4 mb-1">
            Hello, <span className="capitalize">{stakeholder.firstName}</span>!
          </h4>
          <p className={cn("max-w-[34rem] mt-1.5 text-lg")}>
            Welcome to the TeamSpark client portal.
          </p>
        </div>
        <img
          src="/assets/stars-multiple.svg"
          className="hidden sm:block w-14 h-14 mr-3"
        />
      </div>

      {/* {projectsWithNewUpdates && projectsWithNewUpdates.length > 0 ? (
        <>
          {projectsWithNewUpdates.map((project: Models.Document) => (
            <Link to={`/project/${project.$id}`} className="block">
              <Card className="flex items-center justify-between group hover:bg-slate-400/15 border-cyan-400 transition-colors duration-100">
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full animate-wobble delay-300">
                    <BellRing strokeWidth={2} className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h6 className="h6 text-lg mb-1 group-hover:text-white transition-colors duration-100">
                      {project.title} has new updates!
                    </h6>
                    <p className="pr-2 sm:pr-0">
                      Check out the latest updates from the team.
                    </p>
                  </div>
                </div>
                <div className="flex items-center animate-bounce-right">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-100 bg-transparent border border-primary text-primary group-hover:bg-primary group-hover:text-slate-600">
                    <ArrowRight strokeWidth={1.3} className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </>
      ) : (
        <Link to="/start" className="block">
          <Card className="flex items-center justify-between group hover:bg-slate-400/15 hover:border-cyan-400 transition-colors duration-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full">
                <Landmark strokeWidth={2} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h6 className="h6 text-lg mb-1 group-hover:text-white transition-colors duration-100">
                  Add company details
                </h6>
                <p className="pr-2 sm:pr-0">
                  Help us learn more about your mission.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-100 bg-transparent border border-primary text-primary group-hover:bg-primary group-hover:text-slate-600">
                <ArrowRight strokeWidth={1.3} className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </Link>
      )} */}

      {requests && requests.length > 0 ? null : (
        <Link to="/start" className="block mt-9 mb-10">
          <BackgroundGradient className="rounded-xl bg-background">
            <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group border-transparent hover:bg-slate-400/15 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                <div className="animate-border flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white bg-gradient-to-r from-cyan-300 via-purple-300 to-teal-300 bg-[length:400%_400%] text-slate-900 rounded-full">
                  <Sparkles strokeWidth={1.5} className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h6 className="h6 text-lg mb-2 group-hover:text-white transition-colors duration-100">
                    Start a Project
                  </h6>
                  <p>Find the best talent to bring your vision to life.</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Button>
                  Get started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </BackgroundGradient>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary text-primary rounded-full transition-colors duration-100">
            <ScrollText strokeWidth={1.5} className="w-6 h-6" />
          </div>
          <div>
            <h6 className="h6 mb-2">Read our Manifesto</h6>
            <p>Understand our values and what keeps us exploring together.</p>
          </div>
          <div className="mt-2">
            <Button asChild variant="secondary">
              <Link
                to="https://mirror.xyz/0x6Bc6Fad80Dc2FD5CB2744db381bCfeE2b824da0E/NcWrygP3bmWqzZZ7ZkLzA9s4fzhmYuqx1P0Wp-nQ4_o"
                target="_blank"
                className="flex items-center"
              >
                Open manifesto <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="relative flex flex-col gap-5">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary text-primary rounded-full transition-colors duration-100">
            <Heart strokeWidth={1.5} className="w-6 h-6" />
          </div>
          <div>
            <h6 className="h6 mb-2">Stay in the Loop</h6>
            <p>Connect with us on X for the latest updates and news.</p>
          </div>
          <div className="mt-2">
            <Button asChild variant="secondary">
              <Link to="https://x.com/sparkandmint" target="_blank">
                Connect with us <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </FadeIn>
  )
}

export default Home
