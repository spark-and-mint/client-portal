import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CircleAlert, LinkIcon, MilestoneIcon } from "lucide-react"
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"
import Milestone from "@/components/shared/Milestone"
import { FigmaLogoIcon, NotionLogoIcon } from "@radix-ui/react-icons"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import ViewTeamMembers from "@/components/shared/ViewTeamMembers"
// import { useGetProjectById } from "@/lib/react-query/queries"
import { Card } from "@/components/ui/card"

const Project = () => {
  // const { projectId } = useParams()
  // const { data: project, isPending } = useGetProjectById(projectId)

  const project = {
    title: "Marketing Website Redesign",
    description:
      "Redesign the Global Unity website to make it more modern and user-friendly.",
    status: "In progress",
    client: {
      name: "Global Unity",
      logoUrl: "/assets/logos/global-unity.png",
    },
    team: [
      {
        $id: "1",
        firstName: "Alice",
        lastName: "Doe",
        role: "Project Manager",
        avatarUrl: "/assets/avatars/01.png",
      },
      {
        $id: "2",
        firstName: "Anna-Lisa",
        lastName: "Smitherson",
        role: "Product Designer",
        avatarUrl: "/assets/avatars/03.png",
      },
      {
        $id: "4",
        firstName: "David",
        lastName: "Smith",
        role: "Frontend Developer",
        avatarUrl: "/assets/avatars/04.png",
      },
    ],
    milestones: [
      {
        milestoneId: "1",
        title: "Research & Discovery",
        description: "Research and discovery phase for the new website design.",
        status: "approved",
        updates: [
          {
            updateId: "1",
            stakeholder: {
              $id: "2",
              firstName: "Anna-Lisa",
              lastName: "Smitherson",
              avatarUrl: "/assets/avatars/03.png",
            },
            title: "User Research Report",
            type: "Document",
            link: "#",
            description:
              "The user research report for the new website design. It includes user personas, user journey maps, and user stories.",
          },
          {
            updateId: "2",
            stakeholder: {
              $id: "2",
              firstName: "Charlie",
              lastName: "Turing",
              avatarUrl: "/assets/avatars/02.png",
            },
            title: "Competitor Analysis",
            type: "Document",
            link: "#",
            description:
              "The competitor analysis for the new website design. It includes a list of competitors, their strengths, and weaknesses.",
          },
        ],
      },
      {
        milestoneId: "2",
        title: "Wireframes & Mockups",
        description: "Wireframes and mockups for the new website design.",
        status: "in-progress",
        updates: [
          {
            updateId: "3",
            stakeholder: {
              $id: "2",
              firstName: "Anna-Lisa",
              lastName: "Smitherson",
              role: "Product Designer",
              avatarUrl: "/assets/avatars/03.png",
            },
            title: "Lo-Fi Wireframes",
            link: "https://www.figma.com",
            type: "Design asset",
            description:
              "Wireframes for the new website design. Includes home page, about page, and contact page.",
          },
        ],
      },
      {
        milestoneId: "3",
        title: "Prototype Development",
        description: "Development phase for the new website design.",
        status: "not-started",
        updates: [],
      },
    ],
  }

  return (
    <FadeIn className="pb-24">
      {!project ? (
        <div>project skeleton</div>
      ) : (
        <>
          <Button asChild variant="link" className="mb-8 -ml-4">
            <Link to="/projects">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex flex-col justify-between items-end gap-8 lg:gap-0 lg:flex-row">
            <div>
              <h3 className="h3 mb-2">{project?.title}</h3>

              <div className="flex flex-col gap-4 lg:gap-0 lg:mt-0 lg:flex-row lg:flex-wrap lg:space-x-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary" />
                  Global Unity
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary" />
                  3 months
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="flex items-center gap-2">
                    $7,500 – $9,000 USD
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <CircleAlert className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs p-2 leading-5">
                          This estimation is based solely on your hourly rate
                          and our initial project scope. It might change due to
                          project variations or unforeseen circumstances.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <Button variant="outline" size="sm">
                  <NotionLogoIcon className="h-4 w-4 mr-2 pb-0.25" />
                  Notion page
                </Button>
                <Button variant="outline" size="sm">
                  <FigmaLogoIcon className="h-4 w-4 mr-2 pb-0.25" />
                  Figma
                </Button>
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2 pb-0.25" />
                  Client website
                </Button>
                <ViewTeamMembers team={project?.team} />
              </div>
            </div>

            <div>
              <div className="mt-4 text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                Spark + Mint Representative
              </div>

              <div className="mt-6 space-y-6 gap-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src="/assets/avatars/02.png" />
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">Charlie Turing</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      charlie@sparkandmint.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          <div>
            <div>
              <h4 className="h4">Milestones & Updates</h4>
              <p className="text-sm text-muted-foreground">
                Add documents, design assets, reports, and other updates you
                have for the client under each milestone.
              </p>
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
                    As soon as {project.client.name} adds any project milestones
                    they will be listed here and you will be able to add updates
                    to them.
                  </p>
                </Card>
              ) : (
                <>
                  {project?.milestones.map((milestone) => (
                    <Milestone key={milestone.milestoneId} {...milestone} />
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </FadeIn>
  )
}

export default Project
