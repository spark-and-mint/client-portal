import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  BriefcaseBusinessIcon,
  Scale,
  FileText,
  Sparkles,
  Building2,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { useStakeholderContext } from "@/context/AuthContext"
import { useGetClientProjects } from "@/lib/react-query/queries"
import { Badge } from "../ui/badge"

export function SidebarNav() {
  const { stakeholder, requests } = useStakeholderContext()
  const { data: projects } = useGetClientProjects(stakeholder?.clientId)

  const navLinks = [
    {
      title: "Home",
      icon: HomeIcon,
      to: "/",
    },
    {
      title: "Start a Project",
      icon: Sparkles,
      to: requests && requests.length > 0 ? "/requests" : "/start",
      badge: requests && requests.length > 0 ? `${requests.length}` : false,
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
      title: "My Projects",
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
      title: "Invoices",
      icon: FileText,
      to: "/invoices",
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
                isActive && "bg-muted hover:bg-muted"
              }`
            )
          }
          end
        >
          <link.icon className="w-4 h-4 mr-2" />
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
