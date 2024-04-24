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
import { ArrowRight, RotateCw } from "lucide-react"
import { account } from "@/lib/appwrite/config"
import { default as ReactSelect } from "react-select"
import { useState } from "react"
import { cn } from "@/lib/utils"

const SignUpForm = () => {
  const navigate = useNavigate()
  const { checkAuthStakeholder, isLoading: isStakeholderLoading } =
    useStakeholderContext()
  const { data: clients, isPending: isPendingClients } = useGetClients()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
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

  const handleSignUp = async (values: z.infer<typeof SignUpValidation>) => {
    try {
      const stakeholder = {
        ...values,
        clientId: values.clientId.value,
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

      account.createVerification("https://portal.sparkandmint.com/verify")

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

  const getClientOptions = (clients) => {
    return clients?.documents.map((client) => ({
      label: client.name,
      value: client.$id,
    }))
  }

  const { clearErrors } = form

  return (
    <div className="mt-8 sm:mt-0 pb-16">
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
                  <ReactSelect
                    options={getClientOptions(clients)}
                    isDisabled={isPendingClients}
                    unstyled={true}
                    placeholder="Search and select..."
                    isClearable={true}
                    noOptionsMessage={() => "No results found."}
                    onInputChange={(input) => {
                      if (input) {
                        setMenuIsOpen(true)
                      } else {
                        setMenuIsOpen(false)
                      }
                    }}
                    menuIsOpen={menuIsOpen}
                    classNames={{
                      control: (e) =>
                        cn(
                          `h-10 rounded-md border border-accent`,
                          `px-3 py-2 bg-background text-sm `,
                          e.isFocused
                            ? "ring-2 ring-ring ring-offset-2 ring-offset-background"
                            : ""
                        ),
                      indicatorSeparator: () => "opacity-0",
                      dropdownIndicator: () => "opacity-0",
                      clearIndicator: () => "opacity-0",
                      placeholder: () => "text-placeholder",
                      menu: () =>
                        cn(
                          "absolute top-0 mt-1 text-sm z-10 w-full",
                          "rounded-md border bg-popover shadow-md overflow-x-hidden"
                        ),
                      option: () =>
                        cn(
                          "cursor-default",
                          "rounded-sm py-1.5 m-1 px-2 text-sm outline-none",
                          "focus:bg-gray-200 hover:bg-slate-700 w-auto"
                        ),
                      noOptionsMessage: () => "py-3",
                      input: () => "text-sm overflow-x-hidden",
                    }}
                    onChange={(x) => {
                      clearErrors("clientId")
                      field.onChange(x)
                    }}
                  />
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

      <Link to="/sign-in" className="group">
        <div className="mt-10 py-3 border border-border rounded-md text-primary transition-colors group-hover:border-accent">
          <p className="text-sm text-center transition-colors group-hover:text-white">
            Already have an account?
            <span className="font-semibold ml-1">
              Log in{" "}
              <ArrowRight className="h-4 w-4 inline transition group-hover:translate-x-0.5 group-hover:text-white" />
            </span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default SignUpForm
