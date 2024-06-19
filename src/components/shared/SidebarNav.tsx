import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  BriefcaseBusinessIcon,
  Scale,
  Sparkles,
  Building2,
  CreditCard,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { useStakeholderContext } from "@/context/AuthContext"
import { useGetClientProjects } from "@/lib/react-query/queries"
import { Badge } from "../ui/badge"

export function SidebarNav() {
  const { stakeholder } = useStakeholderContext()
  const { data: projects } = useGetClientProjects(stakeholder?.clientId)

  const navLinks = [
    {
      title: "Home",
      icon: HomeIcon,
      to: "/",
    },

    ...(stakeholder.clientId
      ? [
          {
            title: "Company Details",
            icon: Building2,
            to: "/details",
          },
        ]
      : []),
    {
      title: "Active Projects",
      icon: BriefcaseBusinessIcon,
      to: "/projects",
      badge:
        projects && projects.documents && projects.documents.length > 0
          ? `${projects.documents.length}`
          : false,
    },
    {
      title: "Legal Documents",
      icon: Scale,
      to: "/documents",
    },
    {
      title: "Payments",
      icon: CreditCard,
      to: "/payments",
    },
    {
      title: "Start a Project",
      icon: Sparkles,
      to: "/start",
    },
    // {
    //   title: "Partner Network",
    //   icon: Handshake,
    //   to: "/partners",
    // },
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
                isActive && "bg-secondary/30 hover:bg-secondary/30"
              }`
            )
          }
          end
        >
          <link.icon className="w-4 h-4 mr-2 -translate-y-0.25" />
          {link.title}
          {link.badge && (
            <Badge variant="outline" className="ml-3 px-2 py-0.25 text-xs">
              {link.badge}
            </Badge>
          )}
        </NavLink>
      ))}
    </FadeIn>
  )
}
