import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CircleAlert,
  LinkIcon,
  RotateCw,
  Sprout,
} from "lucide-react"
import FadeIn from "react-fade-in"
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion"
import XLogo from "@/svg/XLogo"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LinkedInLogo from "@/svg/LinkedInLogo"
import { Card } from "@/components/ui/card"
import { useStakeholderContext } from "@/context/AuthContext"
import {
  useUpdateOpportunity,
  useGetStakeholderOpportunity,
  useUpdateProject,
} from "@/lib/react-query/queries"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { useConfirm } from "@/components/shared/AlertDialogProvider"
import { toast } from "sonner"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const largeProps: ConfettiProps = {
  force: 0.7,
  duration: 3000,
  particleCount: 80,
  width: 1600,
  colors: ["#1a2746", "#1471BF", "#5BB4DC", "#eeffff", "#cbeafe"],
  zIndex: 1000,
}

const Opportunities = () => {
  const { stakeholder } = useStakeholderContext()
  const confirm = useConfirm()
  const { data: opportunityData, isPending } = useGetStakeholderOpportunity(
    stakeholder.accountId
  )
  const [acceptingOpportunity, setAcceptingOpportunity] = useState(false)
  const [decliningOpportunity, setDecliningOpportunity] = useState(false)

  const opportunity = opportunityData?.documents.find(
    (document) => document.status === "awaiting response"
  )

  const { mutateAsync: updateOpportunity } = useUpdateOpportunity()
  const { mutateAsync: updateProject } = useUpdateProject()

  const [showAcceptModal, setShowAcceptModal] = useState(false)

  const handleAccept = async () => {
    try {
      setAcceptingOpportunity(true)

      if (!opportunity?.$id) {
        throw new Error("opportunityId is undefined")
      }

      const acceptedOpportunity = await updateOpportunity({
        opportunityId: opportunity?.$id,
        status: "accepted",
      })

      if (acceptedOpportunity) {
        setShowAcceptModal(true)
      } else {
        toast.error("Error accepting opportunity. Please try again.")
        return
      }

      await updateProject({
        projectId: opportunity.project.$id,
        title: opportunity.project.title,
        team: [...opportunity.project.team, stakeholder.accountId],
      })
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      console.error({ error })
    } finally {
      setAcceptingOpportunity(false)
    }
  }

  const handleDecline = async () => {
    const declineConfirmed = await confirm({
      title: `Are you sure you want to decline this opportunity?`,
      cancelButton: "Cancel",
      actionButton: "Decline",
    })

    if (!declineConfirmed) return

    try {
      if (!opportunity?.$id) {
        throw new Error("opportunityId is undefined")
      }
      setDecliningOpportunity(true)
      await updateOpportunity({
        opportunityId: opportunity?.$id,
        status: "declined",
      })
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      console.error({ error })
    } finally {
      setDecliningOpportunity(false)
    }
  }

  return (
    <div className="pb-16">
      {isPending ? (
        <div>
          <div className="flex justify-between">
            <Skeleton className="mb-4 w-[18rem] h-7 rounded-md" />
            <div className="flex justify-end gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-[3.75rem] h-[3.75rem] rounded-full" />
            <Skeleton className="w-[21rem] h-12 rounded-md" />
          </div>
          <div className="mt-8 space-y-10">
            <Skeleton className="w-full h-14 rounded-md" />
            <Skeleton className="w-full h-14 rounded-md" />
            <Skeleton className="w-full h-14 rounded-md" />
          </div>
        </div>
      ) : (
        <>
          {opportunity ? (
            <>
              <FadeIn>
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div>
                    <div className="mb-4 text-primary tracking-[0.08em] uppercase text-sm font-semibold">
                      You have a new opportunity with
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={opportunity.client.logoUrl}
                        alt="logo"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                      />
                      <h3 className="h3">{opportunity.client.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 sm:mt-0">
                    <Button asChild variant="outline" size="sm">
                      <Link to={opportunity.client.website}>
                        <LinkIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <XLogo className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <LinkedInLogo className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card className="mt-8 py-2">
                  <dl className="divide-y divide-stroke-1">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Your role
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.role}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Project duration
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.duration}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Project type
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.type}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Estimated earnings
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        <div className="flex items-center gap-2">
                          {opportunity.estimatedEarnings}
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger>
                              <CircleAlert className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs p-2 leading-5">
                                This estimation is based solely on your hourly
                                rate and our initial project scope. It might
                                change due to project variations or unforeseen
                                circumstances.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Background
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.background}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.description}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Your responsibilities
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.responsibilities}
                      </dd>
                    </div>
                  </dl>
                </Card>
              </FadeIn>

              <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-between mt-10">
                <p className="text-sm mt-4 sm:mt-0">
                  Questions? Contact us{" "}
                  <a href="mailto:hello@sparkandmint.com" className="underline">
                    here
                  </a>{" "}
                  or on Slack.
                </p>
                <div className="flex gap-4">
                  <Button
                    disabled={decliningOpportunity}
                    variant="secondary"
                    onClick={handleDecline}
                  >
                    {decliningOpportunity ? (
                      <div className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Declining...
                      </div>
                    ) : (
                      "Decline"
                    )}
                  </Button>
                  <Button
                    disabled={acceptingOpportunity}
                    onClick={handleAccept}
                  >
                    {acceptingOpportunity ? (
                      <div className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Accepting...
                      </div>
                    ) : (
                      "Accept opportunity"
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <FadeIn>
              <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
                <Sprout strokeWidth={1} className="h-16 w-16 text-primary" />
                <h6 className="h6 text-[1.325rem] mt-3 text-center">
                  We're busy planting the seeds for new opportunities
                </h6>
                <p className="mt-2 text-muted-foreground text-center ">
                  If anything pops up for you, it will be shown here.
                </p>
              </Card>
            </FadeIn>
          )}
        </>
      )}

      <Dialog open={showAcceptModal} onOpenChange={setShowAcceptModal}>
        <DialogContent className="max-w-[40rem] p-12">
          <DialogHeader>
            <DialogDescription className="block text-primary tracking-[0.1em] uppercase text-sm font-semibold text-center">
              We just wanted to say
            </DialogDescription>
            <div className="flex items-center justify-center">
              <ConfettiExplosion {...largeProps} />
            </div>
            <DialogTitle className="text-center">
              <h4 className="h4 -mt-1.5 tracking-wide">CONGRATS!</h4>
            </DialogTitle>
          </DialogHeader>
          <FadeIn delay={100}>
            <img
              src="/assets/prize-cup.webp"
              alt="cup"
              className="h-[14rem] mx-auto opacity-80"
            />
            <div className="mt-6 mb-8">
              <p className="mb-1.5 text-center text-lg">
                You just accepted your{" "}
                <span className="font-semibold text-blue-300">first</span>{" "}
                opportunity – way to go!
              </p>
              <p className="text-center text-muted-foreground">
                Now you can view the project details and start creating updates.
              </p>
            </div>
            <DialogFooter className="flex sm:justify-center">
              <Button asChild>
                <Link to="/projects">
                  Go to My Projects <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </DialogFooter>
          </FadeIn>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Opportunities
