import * as z from "zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import human from "humanparser"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  useCreateStakeholderAccount,
  useSignInAccount,
} from "@/lib/react-query/queries"
import { CreateAccountValidation } from "@/lib/validation"
import { useStakeholderContext } from "@/context/AuthContext"
import { RotateCw } from "lucide-react"
import StarSvg from "@/svg/StarSvg"
import GoogleIcon from "@/svg/GoogleIcon"
import { account } from "@/lib/appwrite/config"

const SignUpForm = () => {
  const navigate = useNavigate()
  const { checkAuthStakeholder, isLoading: isStakeholderLoading } =
    useStakeholderContext()

  const form = useForm<z.infer<typeof CreateAccountValidation>>({
    resolver: zodResolver(CreateAccountValidation),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
    },
  })

  const {
    mutateAsync: createStakeholderAccount,
    isPending: isCreatingAccount,
  } = useCreateStakeholderAccount()

  const { mutateAsync: signInAccount, isPending: isSigningInStakeholder } =
    useSignInAccount()

  const handleSignUp = async (
    values: z.infer<typeof CreateAccountValidation>
  ) => {
    const { firstName, lastName } = human.parseName(values.name)

    try {
      const stakeholder = {
        firstName: firstName || values.name,
        lastName: lastName || "N/A",
        ...values,
      }

      const newStakeholder = await createStakeholderAccount(stakeholder)

      if (!newStakeholder) {
        toast.error("Sign up failed. Please try again.")
        return
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      })

      if (!session) {
        toast.error("Something went wrong. Please try again.")
        return
      }

      const isLoggedIn = await checkAuthStakeholder()

      if (isLoggedIn) {
        form.reset()
        navigate("/")
      } else {
        toast.error("Login failed. Please try again.")
        return
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const onGoogleSignIn = async () => {
    try {
      account.createOAuth2Session(
        "google",
        "https://portal.teamspark.xyz/oauth2callback"
      )
    } catch (error) {
      toast.error("Login failed. Please try again.")
    }
  }

  return (
    <div className="mt-8 sm:mt-0 pb-16">
      <Form {...form}>
        <StarSvg className="w-8 h-8 mb-6 mx-auto" />
        <h1 className="h5 text-center">Game On!</h1>
        <p className="mt-1 mb-8 text-sm text-muted-foreground text-center">
          Let's start by creating an account.
        </p>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center w-full h-10 text-xs font-medium"
          onClick={onGoogleSignIn}
        >
          <GoogleIcon className="w-3 h-3 mr-3 text-white" />
          Continue with Google
        </Button>

        <div className="flex items-center justify-center mt-6 mb-4">
          <div className="w-full border-b border-border"></div>
          <p className="mx-4 text-sm text-muted-foreground">or</p>
          <div className="w-full border-b border-border"></div>
        </div>

        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-1">
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={
                isCreatingAccount ||
                isSigningInStakeholder ||
                isStakeholderLoading
              }
            >
              {isCreatingAccount ||
              isSigningInStakeholder ||
              isStakeholderLoading ? (
                <div className="flex items-center gap-2">
                  <RotateCw className="h-4 w-4 animate-spin" />
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
