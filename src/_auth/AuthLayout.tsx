import { useStakeholderContext } from "@/context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const AuthLayout = () => {
  const { isAuthenticated } = useStakeholderContext()
  const location = useLocation()

  if (location.pathname === "/start") {
    return <Outlet />
  }

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="w-full">
            <div className="w-64 mx-auto">
              <Outlet />
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout
