import ProjectCard from "@/components/shared/ProjectCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useStakeholderContext } from "@/context/AuthContext"
import {
  useGetClientById,
  useGetClientProjects,
} from "@/lib/react-query/queries"
import { Models } from "appwrite"
import { TreePalm } from "lucide-react"
import FadeIn from "react-fade-in"

const Projects = () => {
  const { stakeholder } = useStakeholderContext()
  const { data: projects, isPending: isPendingProjects } = useGetClientProjects(
    stakeholder?.clientId
  )
  const { data: client, isPending: isPendingClient } = useGetClientById(
    stakeholder?.clientId
  )

  return (
    <div className="pb-16">
      {!projects || !client || isPendingProjects || isPendingClient ? (
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
          {projects && projects.documents.length > 0 ? (
            <FadeIn className="flex flex-col gap-12">
              {projects.documents.map((project: Models.Document) => (
                <div key={project.$id}>
                  <ProjectCard project={project} client={client} />
                </div>
              ))}
            </FadeIn>
          ) : (
            <FadeIn>
              <Card className="flex flex-col items-center justify-center h-full py-16">
                <TreePalm strokeWidth={1} className="h-14 w-14 text-primary" />
                <h6 className="h6 text-[1.325rem] mt-3 text-center">
                  No projects started yet
                </h6>
                <p className="mt-2 text-muted-foreground text-center ">
                  All your projects will be listed here.
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
