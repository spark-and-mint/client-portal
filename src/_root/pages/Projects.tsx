import ProjectCard from "@/components/shared/ProjectCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useStakeholderContext } from "@/context/AuthContext"
import { useGetStakeholderOpportunity } from "@/lib/react-query/queries"
import { Models } from "appwrite"
import { TreePalm } from "lucide-react"
import FadeIn from "react-fade-in"

const Projects = () => {
  const { stakeholder } = useStakeholderContext()
  const { data: opportunityData, isPending } = useGetStakeholderOpportunity(
    stakeholder.accountId
  )

  const opportunities = opportunityData?.documents
    .filter((opportunity: Models.Document) => opportunity.status === "accepted")
    .sort(
      (a: Models.Document, b: Models.Document) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    )

  return (
    <div className="pb-16">
      {!opportunities || isPending ? (
        <Card className="flex flex-col justify-between h-full p-2">
          <CardHeader>
            <CardTitle>
              <div>
                <div className="flex items-center justify-between">
                  <Skeleton className="mb-4 w-[20rem] h-10 rounded-md" />
                  <Skeleton className="w-20 h-20 rounded-full" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="mb-4 w-24 h-4 rounded-md" />
                  <Skeleton className="mb-4 w-64 h-4 rounded-md" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="mb-4 w-24 h-4 rounded-md" />
                  <Skeleton className="mb-4 w-64 h-4 rounded-md" />
                </div>
              </div>

              <div>
                <Skeleton className="w-32 h-12 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {opportunities && opportunities.length > 0 ? (
            <FadeIn className="flex flex-col gap-12">
              {opportunities.map((opportunity: Models.Document) => (
                <div key={opportunity.$id}>
                  <ProjectCard
                    project={opportunity.project}
                    role={opportunity.role}
                  />
                </div>
              ))}
            </FadeIn>
          ) : (
            <FadeIn>
              <Card className="flex flex-col items-center justify-center h-full py-16">
                <TreePalm strokeWidth={1} className="h-14 w-14 text-primary" />
                <h6 className="h6 text-[1.325rem] mt-3 text-center">
                  No projects yet
                </h6>
                <p className="mt-2 text-muted-foreground text-center ">
                  All your accepted opportunities will be listed here.
                </p>
              </Card>
            </FadeIn>
          )}
        </>
      )}
    </div>
  )
}

export default Projects
