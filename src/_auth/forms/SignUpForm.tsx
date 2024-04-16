import * as z from "zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
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
  useGetClients,
  useSignInAccount,
} from "@/lib/react-query/queries"
import { SignUpValidation } from "@/lib/validation"
import { useStakeholderContext } from "@/context/AuthContext"
import { RotateCw } from "lucide-react"
import { account } from "@/lib/appwrite/config"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"

const SignUpForm = () => {
  const navigate = useNavigate()
  const { checkAuthStakeholder, isLoading: isStakeholderLoading } =
    useStakeholderContext()
  const { data: clients, isPending: isPendingClients } = useGetClients()

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      clientId: "",
    },
  })

  const {
    mutateAsync: createStakeholderAccount,
    isPending: isCreatingAccount,
  } = useCreateStakeholderAccount()
  const { mutateAsync: signInAccount, isPending: isSigningInStakeholder } =
    useSignInAccount()

  const handleSignUp = async (
    stakeholder: z.infer<typeof SignUpValidation>
  ) => {
    try {
      const newStakeholder = await createStakeholderAccount(stakeholder)

      if (!newStakeholder) {
        toast.error("Sign up failed. Please try again.")
        return
      }

      const session = await signInAccount({
        email: stakeholder.email,
        password: stakeholder.password,
      })

      if (!session) {
        toast.error("Something went wrong. Please try again.")
        return
      }

      account.createVerification(
        "https://spark-and-mint-client-portal.netlify.app/verify"
      )

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
    <div className="pb-16">
      <Form {...form}>
        <h1 className="h5 mb-8 text-center">Create your account</h1>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
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

          <FormField
            control={form.control}
            name="clientId"
            disabled={isPendingClients}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company or organization</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients?.documents.map((client) => (
                        <SelectItem key={client.$id} value={client.$id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

          <p className="text-sm text-center">
            Already have an account?
            <Link to="/sign-in" className="font-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
