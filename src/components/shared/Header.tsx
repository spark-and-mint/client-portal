import { useStakeholderContext } from "@/context/AuthContext"
import { Button } from "../ui/button"
import Section from "./Section"
import { Link, useLocation } from "react-router-dom"
import { UserNav } from "./UserNav"
import {
  BriefcaseBusiness,
  FileText,
  Home,
  PanelLeft,
  Scale,
  Sparkles,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import StarSvg from "@/svg/StarSvg"
import { useEffect, useState } from "react"

const Header = () => {
  const { isAuthenticated, isLoading, requests } = useStakeholderContext()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (pathname === "/start") {
    return (
      <Section className="!px-0 !py-0 flex items-center min-h-24">
        <div className="container flex justify-between items-center">
          <Link to={isAuthenticated ? "/" : "/sign-in"}>
            <img src="/assets/logo.svg" alt="logo" className="w-[7.25rem]" />
          </Link>
          <Button variant="outline">
            <Link to="#">Questions?</Link>
          </Button>
        </div>
      </Section>
    )
  }

  if (pathname === "/sign-up" || pathname === "/sign-in") {
    return (
      <Section className="!px-0 !py-0 flex items-center min-h-24">
        <div className="container flex justify-between items-center">
          <Link to={isAuthenticated ? "/" : "/sign-in"}>
            <img src="/assets/logo.svg" alt="logo" className="w-[7.25rem]" />
          </Link>
          {location.pathname === "/sign-up" ? (
            <Button asChild variant="outline">
              <Link to="/sign-in">Log in</Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link to="/sign-up">Sign up</Link>
            </Button>
          )}
        </div>
      </Section>
    )
  }

  return (
    <Section className="!px-0 !py-0 flex items-center min-h-24">
      <div className="container flex justify-between items-center gap-10">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <StarSvg className="w-8 h-8 mb-8 pl-2" />
              <Link to="/" className="flex items-center gap-4 px-2.5">
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                to={requests && requests.length > 0 ? "/requests" : "/start"}
                className="flex items-center gap-4 px-2.5"
              >
                <Sparkles className="h-5 w-5" />
                Start a Project
                {requests && requests.length > 0 && (
                  <span className="ml-2 px-2.5 py-1 text-xs font-semibold rounded-full text-black bg-primary">
                    {requests.length}
                  </span>
                )}
              </Link>
              <Link to="/projects" className="flex items-center gap-4 px-2.5">
                <BriefcaseBusiness className="h-5 w-5" />
                My Projects
              </Link>
              {/* <Link to="/details" className="flex items-center gap-4 px-2.5">
                <Landmark className="h-5 w-5" />
                Company details
              </Link> */}
              <Link to="/documents" className="flex items-center gap-4 px-2.5">
                <Scale className="h-5 w-5" />
                Legal documents
              </Link>
              <Link to="/invoices" className="flex items-center gap-4 px-2.5">
                <FileText className="h-5 w-5" />
                Invoices
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to={isAuthenticated ? "/" : "/sign-in"}>
          <img src="/assets/logo.svg" alt="logo" className="w-[7.25rem]" />
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
