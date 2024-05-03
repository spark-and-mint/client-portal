import { useStakeholderContext } from "@/context/AuthContext"
import { Button } from "../ui/button"
import Section from "./Section"
import { Link, useLocation } from "react-router-dom"
import { UserNav } from "./UserNav"
import {
  BriefcaseBusiness,
  FileText,
  Home,
  Landmark,
  PanelLeft,
  Scale,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import StarSvg from "@/svg/StarSvg"
import { cn } from "@/lib/utils"

const Header = () => {
  const { stakeholder, isAuthenticated, isLoading } = useStakeholderContext()
  const location = useLocation()

  return (
    <Section className="!px-0 !py-0 flex items-center min-h-24">
      <div className="container flex justify-between items-center gap-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className={cn(
                "sm:hidden",
                !stakeholder.emailVerification && "hidden"
              )}
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <StarSvg className="w-8 h-8 mb-8 pl-2" />
              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                to="/projects"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <BriefcaseBusiness className="h-5 w-5" />
                My Projects
              </Link>
              <Link
                to="/details"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Landmark className="h-5 w-5" />
                Company details
              </Link>
              <Link
                to="/documents"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Scale className="h-5 w-5" />
                Legal documents
              </Link>
              <Link
                to="/invoices"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <FileText className="h-5 w-5" />
                Invoices
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to={isAuthenticated ? "/" : "/sign-in"}>
          <img src="/assets/logo.svg" alt="logo" className="w-[4.5rem]" />
        </Link>

        {import.meta.env.DEV && (
          <div className="fixed left-4 bottom-4 font-medium tracking-wide">
            CLIENT PORTAL
          </div>
        )}

        {isAuthenticated ? (
          <UserNav />
        ) : (
          <>
            {isLoading ? (
              <div className="animate-ping">
                <StarSvg className="w-5 h-5" />
              </div>
            ) : (
              <>
                {location.pathname === "/sign-up" ? (
                  <Button asChild variant="outline">
                    <Link to="/sign-in">Log in</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <Link to="/sign-up">Sign up</Link>
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Section>
  )
}

export default Header
