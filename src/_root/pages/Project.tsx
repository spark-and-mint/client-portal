import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  LinkIcon,
  MilestoneIcon,
  PickaxeIcon,
  Waypoints,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { Link, useParams } from "react-router-dom"
import Milestone from "@/components/shared/Milestone"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import ViewTeamMembers from "@/components/shared/ViewTeamMembers"
import {
  useGetProjectById,
  useGetProjectMilestones,
  useGetProjectTeam,
} from "@/lib/react-query/queries"
import { Card } from "@/components/ui/card"
import CreateMilestone from "@/components/shared/CreateMilestone"
import { Models } from "appwrite"
import ProjectSkeleton from "@/components/shared/skeletons/ProjectSkeleton"

const Project = () => {
  const { projectId } = useParams()
  const { data: project, isPending } = useGetProjectById(projectId)
  const { data: teamMembers } = useGetProjectTeam(project?.$id, project?.team)
  const { data: milestones } = useGetProjectMilestones(projectId)

  return (
    <div className="pb-24">
      {!project || isPending ? (
        <ProjectSkeleton />
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
                    <div className="flex items-center text-sm text-muted-foreground ">
                      <PickaxeIcon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="first-letter:uppercase">
                        {project?.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MilestoneIcon className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      Milestone-based
                    </div>
                  </div>

                  {project?.briefLink && project?.roadmapLink && (
                    <div className="flex items-center gap-4 mt-8">
                      {project?.briefLink && (
                        <Link to={project?.briefLink}>
                          <Button variant="outline" size="sm">
                            <LinkIcon className="h-4 w-4 mr-2 pb-0.25" />
                            Project brief
                          </Button>
                        </Link>
                      )}
                      {project?.roadmapLink && (
                        <Link to={project?.roadmapLink}>
                          <Button variant="outline" size="sm">
                            <Waypoints className="h-4 w-4 mr-2 pb-0.25" />
                            Roadmap
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
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

                {teamMembers && teamMembers.length > 0 && (
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
              {milestones && milestones.length === 0 ? (
                <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
                  <MilestoneIcon
                    strokeWidth={1}
                    className="h-16 w-16 text-primary"
                  />
                  <h6 className="h6 text-[1.325rem] mt-3 text-center">
                    There are no milestones added yet
                  </h6>
                  <p className="mt-2 text-muted-foreground text-center max-w-md">
                    Get started by adding one to your project.
                  </p>
                </Card>
              ) : (
                <>
                  {milestones &&
                    milestones.length > 0 &&
                    milestones.map((milestone: Models.Document) => (
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
