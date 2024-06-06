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
import HireHeading from "./HireHeading"

const CreateAccount = () => {
  const navigate = useNavigate()
  const { checkAuthStakeholder, isLoading: isStakeholderLoading } =
    useStakeholderContext()

  const form = useForm<z.infer<typeof CreateAccountValidation>>({
    resolver: zodResolver(CreateAccountValidation),
    defaultValues: {
      name: "",
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

  return (
    <div>
      <HireHeading heading="Create your account" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="mt-8 space-y-4"
        >
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

export default CreateAccount
