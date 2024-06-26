import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Models } from "appwrite"

const ProjectCard = ({
  project,
  client,
}: {
  project: Models.Document
  client: Models.Document
}) => {
  return (
    <Card className="flex flex-col justify-between gap-2 p-2">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h4 className="h4">{project.title}</h4>
            {client?.logoUrl ? (
              <img
                src={client?.logoUrl.toString()}
                className="w-14 h-14 rounded-full border border-slate-600"
              />
            ) : (
              <Avatar>
                <AvatarFallback>
                  <span className="text-sm uppercase">
                    {project.title.substring(0, 2)}
                  </span>
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <div className="text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                Type
              </div>
              <p className="font-medium">Milestone-based</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                Status
              </div>
              <p className="font-medium first-letter:uppercase">
                {project.status}
              </p>
            </div>
          </div>

          <div>
            <Button asChild className="w-full">
              <Link to={`/project/${project.$id}`}>
                Project details <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
