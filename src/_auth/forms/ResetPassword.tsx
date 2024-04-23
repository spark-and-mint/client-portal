import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useSearchParams } from "react-router-dom"
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
import { ResetValidation, PasswordsValidation } from "@/lib/validation"
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  MailIcon,
  RotateCw,
} from "lucide-react"
import StarSvg from "@/svg/StarSvg"
import { account } from "@/lib/appwrite/config"
import { useState } from "react"

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [passwordIsReset, setPasswordIsReset] = useState(false)
  const [isResettingPassword, setIsResttingPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const secret = searchParams.get("secret")
  const userId = searchParams.get("userId")
  const isResetting = userId && secret

  const resetForm = useForm<z.infer<typeof ResetValidation>>({
    resolver: zodResolver(ResetValidation),
    defaultValues: {
      email: "",
    },
  })

  const handleReset = async (email: z.infer<typeof ResetValidation>) => {
    const resetPassword = await account.createRecovery(
      email.email,
      "https://members.sparkandmint.com/reset"
    )

    if (resetPassword) setEmailSent(true)
  }

  const passwordForm = useForm<z.infer<typeof PasswordsValidation>>({
    resolver: zodResolver(PasswordsValidation),
  })

  if (passwordIsReset) {
    return (
      <div>
        <div className="flex flex-col gap-4 mt-24 text-center">
          <CircleCheck
            strokeWidth={1.3}
            className="w-12 h-12 mx-auto text-primary"
          />
          <h4 className="h4">Password reset</h4>
          <Button asChild variant="link" className="text-lg font-medium">
            <Link to="/sign-in">
              Return to sign in
              <ArrowRight className="h-4 w-4 ml-1.5 inline" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isResetting) {
    const handleNewPw = async (
      passwords: z.infer<typeof PasswordsValidation>
    ) => {
      setIsResttingPassword(true)
      const passwordUpdated = await account.updateRecovery(
        userId,
        secret,
        passwords.newPassword,
        passwords.confirmPassword
      )

      if (passwordUpdated) {
        setPasswordIsReset(true)
        setIsResttingPassword(false)
      }
    }

    return (
      <div className="mt-16 sm:mt-3">
        <Form {...passwordForm}>
          <StarSvg className="w-8 h-8 mb-8 mx-auto" />
          <h5 className="h5 mb-8 text-center">Reset your password</h5>

          <form
            onSubmit={passwordForm.handleSubmit(handleNewPw)}
            className="space-y-4"
          >
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm your password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                disabled={isResettingPassword}
                type="submit"
                className="mt-2 w-full"
              >
                {isResettingPassword ? (
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Resetting password...
                  </div>
                ) : (
                  "Reset password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    )
  }

  return (
    <>
      {emailSent ? (
        <div>
          <div className="flex flex-col gap-4 mt-24 text-center">
            <MailIcon
              strokeWidth={1.3}
              className="w-12 h-12 mx-auto text-primary"
            />
            <h4 className="h4">Email sent</h4>
            <p className="leading-6 text-muted-foreground">
              Check your email and open the link we sent to continue.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-16 sm:mt-3">
          <Form {...resetForm}>
            <StarSvg className="w-8 h-8 mb-8 mx-auto" />
            <h5 className="h5 mb-2 text-center">Reset your password</h5>
            <p className="mb-8 text-muted-foreground text-center text-sm">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
            <form
              onSubmit={resetForm.handleSubmit(handleReset)}
              className="space-y-4"
            >
              <FormField
                control={resetForm.control}
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

              <div>
                <Button type="submit" className="mt-2 w-full">
                  Continue
                </Button>
              </div>
            </form>
          </Form>

          <Link to="/sign-in" className="group">
            <div className="mt-8 py-3 border border-border rounded-md text-primary transition-colors group-hover:border-accent">
              <p className="text-sm text-center transition-colors group-hover:text-white">
                <span className="flex items-center font-semibold justify-center">
                  <ArrowLeft className="h-4 w-4 mr-1.5 inline transition group-hover:-translate-x-0.5 group-hover:text-white" />
                  Return to sign in
                </span>
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default ResetPassword
