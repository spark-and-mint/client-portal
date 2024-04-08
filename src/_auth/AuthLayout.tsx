import { useStakeholderContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
  const { isAuthenticated } = useStakeholderContext()

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
