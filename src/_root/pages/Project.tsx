import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CalendarIcon,
  LinkIcon,
  MilestoneIcon,
  PickaxeIcon,
  Waypoints,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { FigmaLogoIcon } from "@radix-ui/react-icons"
import { Link, useParams } from "react-router-dom"
import Milestone from "@/components/shared/Milestone"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import ViewTeamMembers from "@/components/shared/ViewTeamMembers"
import { useGetProjectById } from "@/lib/react-query/queries"
import { Card } from "@/components/ui/card"
import { IOpportunity } from "@/types"
import CreateMilestone from "@/components/shared/CreateMilestone"
import { Models } from "appwrite"

const Project = () => {
  const { projectId } = useParams()
  const { data: project, isPending } = useGetProjectById(projectId)
  const teamMembers = project?.opportunities
    .filter((opportunity: IOpportunity) => opportunity.status === "accepted")
    .map((opportunity: IOpportunity) => ({
      firstName: opportunity.member?.firstName,
      lastName: opportunity.member?.lastName,
      avatarUrl: opportunity.member?.avatarUrl,
      role: opportunity.role,
    }))

  return (
    <div className="pb-24">
      {!project || isPending ? (
        <FadeIn>Loading...</FadeIn>
      ) : (
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between">
            <div>
              <Button asChild variant="link" className="mb-8 -ml-4">
                <Link to="/projects">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Link>
              </Button>

              <div className="flex flex-col justify-between gap-8 mb-8 lg:gap-0 lg:flex-row lg:mb-0">
                <div>
                  <h3 className="h3 mb-2">{project?.title}</h3>

                  <div className="flex gap-4 lg:gap-0 lg:mt-0 flex-wrap space-x-8">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <PickaxeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary" />
                      In progress
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary" />
                      3 months
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MilestoneIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary" />
                      Milestone-based
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <Button variant="outline" size="sm">
                      <LinkIcon className="h-4 w-4 mr-2 pb-0.25" />
                      Project brief
                    </Button>
                    <Button variant="outline" size="sm">
                      <Waypoints className="h-4 w-4 mr-2 pb-0.25" />
                      Roadmap
                    </Button>
                    <Button variant="outline" size="sm">
                      <FigmaLogoIcon className="h-4 w-4 mr-2 pb-0.25" />
                      Figma
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex flex-col gap-8">
                <div>
                  <div className="mt-4 text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                    Spark + Mint Representative
                  </div>

                  <div className="mt-4 space-y-6 gap-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src="/assets/avatars/02.png" />
                      </Avatar>
                      <div>
                        <p className="font-medium leading-none">
                          {project.sparkRep?.firstName}{" "}
                          {project.sparkRep?.lastName}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.sparkRep?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {teamMembers.length > 0 && (
                  <div>
                    <div className="mt-4 text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                      Team Members
                    </div>

                    <div className="mt-4">
                      <ViewTeamMembers team={teamMembers} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          <div>
            <div className="flex justify-between items-center">
              <h4 className="h4">Milestones & Updates</h4>
              <CreateMilestone projectId={project.$id} />
            </div>

            <div className="mt-12 space-y-20">
              {project?.milestones.length === 0 ? (
                <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
                  <MilestoneIcon
                    strokeWidth={1}
                    className="h-16 w-16 text-primary"
                  />
                  <h6 className="h6 text-[1.325rem] mt-3 text-center">
                    There are no milestones added yet
                  </h6>
                  <p className="mt-2 text-muted-foreground text-center max-w-md">
                    All your project milestones will be listed here.
                  </p>
                </Card>
              ) : (
                <>
                  {project?.milestones.map((milestone: Models.Document) => (
                    <Milestone
                      key={milestone.$id}
                      milestoneId={milestone.$id}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  )
}

export default Project
