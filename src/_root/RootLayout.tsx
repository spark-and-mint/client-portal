import { SidebarNav } from "@/components/shared/SidebarNav"
import { useStakeholderContext } from "@/context/AuthContext"
import { Outlet, useLocation } from "react-router-dom"
import { EmailVerification } from "./pages"
import { cn } from "@/lib/utils"
import ServerError from "@/components/shared/ServerError"

const RootLayout = () => {
  const { stakeholder, serverError } = useStakeholderContext()
  const location = useLocation()
  const projectPage = location.pathname.includes("/project/")

  if (serverError) {
    return <ServerError />
  }

  if (!stakeholder.id) {
    return null
  }

  if (!stakeholder.emailVerification) {
    return <EmailVerification />
  }

  return (
    <div className="container h-full">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {!projectPage && (
          <aside className="lg:w-1/4">
            <SidebarNav />
          </aside>
        )}
        <div className={cn("flex-1", !projectPage && "lg:max-w-2xl")}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
