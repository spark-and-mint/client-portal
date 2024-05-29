import { AnnoyedIcon, ExternalLink, RefreshCcw } from "lucide-react"
import { Button } from "../ui"
import { Link } from "react-router-dom"

const ServerError = () => {
  return (
    <div className="container h-full">
      <div className="flex flex-col items-center gap-2 mt-20 text-center">
        <AnnoyedIcon
          strokeWidth={1.5}
          className="w-10 h-10 mx-auto text-primary"
        />
        <h5 className="h5 mt-2">Could not reach the server.</h5>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
          <Button onClick={() => window.location.reload()} variant="secondary">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reload the page
          </Button>
          <span className="font-semibold">or</span>
          <Button asChild>
            <Link target="_blank" to="https://status.appwrite.online/">
              Check API status
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 leading-6 text-muted-foreground">
          If the issue persists, contact us on Slack or at{" "}
          <Button variant="link" asChild className="font-normal text-base p-0">
            <a className="text-primary" href="mailto:hello@teamspark.xyz">
              hello@teamspark.xyz
            </a>
          </Button>
        </p>
      </div>
    </div>
  )
}

export default ServerError
