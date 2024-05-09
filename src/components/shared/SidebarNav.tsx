import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  BriefcaseBusinessIcon,
  Scale,
  FileText,
  Sparkles,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { useStakeholderContext } from "@/context/AuthContext"
import { useGetClientProjects } from "@/lib/react-query/queries"

export function SidebarNav() {
  const { stakeholder, hasRequest } = useStakeholderContext()
  const { data: projects } = useGetClientProjects(stakeholder?.clientId)

  const navLinks = [
    {
      title: "Home",
      icon: HomeIcon,
      to: "/",
    },
    {
      title: "Hire Talent",
      icon: Sparkles,
      to: "/hire",
      badge: hasRequest ? `1` : false,
    },
    {
      title: "My Projects",
      icon: BriefcaseBusinessIcon,
      to: "/projects",
      badge:
        projects && projects.documents.length > 0
          ? `${projects.documents.length}`
          : false,
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
          {link.badge && (
            <span
              className={cn(
                "ml-3 px-2.5 py-0.5 text-xs font-semibold rounded-full",
                link.title === "My Projects"
                  ? "text-white bg-gray-700"
                  : "text-black bg-primary"
              )}
            >
              {link.badge}
            </span>
          )}
        </NavLink>
      ))}
    </FadeIn>
  )
}
