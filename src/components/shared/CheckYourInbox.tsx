import { MailIcon } from "lucide-react"

const CheckYourInbox = () => {
  return (
    <div className="flex flex-col gap-4 mt-24 text-center">
      <MailIcon strokeWidth={1.3} className="w-12 h-12 mx-auto text-primary" />
      <h4 className="h4">Check your inbox!</h4>
      <p className="leading-6 text-muted-foreground">
        Didn't receive a verification email?
        <br />
        Please contact us at{" "}
        <a className="text-primary" href="mailto:hello@sparkandmint.com">
          hello@sparkandmint.com
        </a>
      </p>
    </div>
  )
}

export default CheckYourInbox
