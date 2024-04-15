import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  BriefcaseBusinessIcon,
  Scale,
  FileText,
  Landmark,
} from "lucide-react"
import FadeIn from "react-fade-in"

export function SidebarNav() {
  const navLinks = [
    {
      title: "Home",
      icon: HomeIcon,
      to: "/",
    },
    {
      title: "My Projects",
      icon: BriefcaseBusinessIcon,
      to: "/projects",
    },
    {
      title: "Company Details",
      icon: Landmark,
      to: "/details",
    },
    {
      title: "Legal Documents",
      icon: Scale,
      to: "/documents",
    },
    {
      title: "Invoices",
      icon: FileText,
      to: "/invoices",
    },
  ]

  return (
    <FadeIn className="hidden sm:flex space-x-2 w-full lg:flex-col lg:space-x-0 lg:space-y-2">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              `w-full justify-start rounded-md font-medium ${
                isActive && "bg-muted hover:bg-muted"
              }`
            )
          }
          end
        >
          <link.icon className="w-4 h-4 mr-2" />
          {link.title}
        </NavLink>
      ))}
    </FadeIn>
  )
}
