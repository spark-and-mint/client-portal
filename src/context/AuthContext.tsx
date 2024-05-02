import { useLocation, useNavigate } from "react-router-dom"
import { createContext, useContext, useEffect, useState } from "react"
import { IStakeholder } from "@/types"
import { getCurrentStakeholder } from "@/lib/appwrite/api"
import { Models } from "appwrite"

export const INITIAL_STAKEHOLDER: IStakeholder = {
  id: "",
  clientId: "",
  email: "",
  firstName: "",
  lastName: "",
  name: "",
  avatarUrl: "",
  avatarId: "",
  emailVerification: false,
}

const INITIAL_STATE = {
  stakeholder: INITIAL_STAKEHOLDER,
  isLoading: false,
  isAuthenticated: false,
  setStakeholder: () => {},
  setIsAuthenticated: () => {},
  checkAuthStakeholder: async () => false as boolean,
  serverError: false,
}

type IContextType = {
  stakeholder: IStakeholder
  isLoading: boolean
  setStakeholder: React.Dispatch<React.SetStateAction<IStakeholder>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthStakeholder: () => Promise<boolean>
  serverError: boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [stakeholder, setStakeholder] =
    useState<IStakeholder>(INITIAL_STAKEHOLDER)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  const checkAuthStakeholder = async () => {
    setIsLoading(true)
    try {
      const {
        stakeholder,
        error,
      }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { stakeholder: Models.Document | null; error: any } =
        await getCurrentStakeholder()

      if (
        error &&
        error.message &&
        !error.message.includes("User (role: guests) missing scope (account)")
      ) {
        setServerError(true)
      }

      if (stakeholder) {
        setStakeholder(serverResponseToStakeholderModel(stakeholder))
        setIsAuthenticated(true)
        setServerError(false)
        return true
      }

      setIsAuthenticated(false)
      return false
    } catch (error) {
      console.error("Error checking authentication:", error)
      setIsAuthenticated(false)
      setServerError(true)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const serverResponseToStakeholderModel = (stakeholder: Models.Document) => {
    return {
      id: stakeholder.$id,
      clientId: stakeholder.clientId,
      email: stakeholder.email,
      firstName: stakeholder.firstName,
      lastName: stakeholder.lastName,
      name: stakeholder.name,
      avatarUrl: stakeholder.avatarUrl,
      avatarId: stakeholder.avatarId,
      emailVerification: stakeholder.emailVerification,
    }
  }

  useEffect(() => {
    checkAuthStakeholder().then((authenticated) => {
      if (
        !authenticated &&
        location.pathname !== "/sign-up" &&
        location.pathname !== "/reset" &&
        location.pathname !== "/verify"
      ) {
        navigate("/sign-in")
      }
    })
  }, [])

  const value = {
    stakeholder,
    setStakeholder,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthStakeholder,
    serverError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useStakeholderContext = () => useContext(AuthContext)
