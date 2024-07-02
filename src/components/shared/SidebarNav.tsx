import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  BriefcaseBusinessIcon,
  Scale,
  Building2,
  CreditCard,
  Heart,
  ScrollText,
  ExternalLink,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { useStakeholderContext } from "@/context/AuthContext"
import { Badge } from "../ui/badge"

export function SidebarNav() {
  const { stakeholder, projects } = useStakeholderContext()

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
        projects && projects && projects.length > 0
          ? `${projects.length}`
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
      <NavLink
        to="https://mirror.xyz/0x6Bc6Fad80Dc2FD5CB2744db381bCfeE2b824da0E/NcWrygP3bmWqzZZ7ZkLzA9s4fzhmYuqx1P0Wp-nQ4_o"
        target="_blank"
        className={() =>
          cn(
            buttonVariants({ variant: "ghost" }),
            `group w-full justify-start rounded-md font-medium`
          )
        }
      >
        <ScrollText className="w-4 h-4 mr-2 -translate-y-0.25" />
        Read our Manifesto
        <ExternalLink className="w-4 h-4 ml-auto -translate-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </NavLink>
      <NavLink
        to="https://x.com/yourteamspark"
        target="_blank"
        className={() =>
          cn(
            buttonVariants({ variant: "ghost" }),
            `group w-full justify-start rounded-md font-medium`
          )
        }
      >
        <Heart className="w-4 h-4 mr-2 -translate-y-0.25" />
        Join our Fan Club
        <ExternalLink className="w-4 h-4 ml-auto -translate-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </NavLink>
    </FadeIn>
  )
}
