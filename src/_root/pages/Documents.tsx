import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useStakeholderContext } from "@/context/AuthContext"
import { useGetClientDocuments } from "@/lib/react-query/queries"
import { ExternalLink, LinkIcon, Scale } from "lucide-react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const Documents = () => {
  const { stakeholder } = useStakeholderContext()

  const { data: documents, isPending: isPendingDocuments } =
    useGetClientDocuments(stakeholder.clientId)

  return (
    <FadeIn className="pb-16 space-y-4">
      {isPendingDocuments ? (
        <Card className="flex flex-col items-center justify-center h-full py-16">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-6 w-48 mt-3 rounded-md" />
          <Skeleton className="h-5 w-80 mt-4 rounded-md" />
        </Card>
      ) : (
        <>
          {documents?.documents && documents?.documents.length > 0 ? (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Legal documents</h3>
                <p className="text-sm text-muted-foreground">
                  Here you can find all our agreements and legal documents.
                </p>
              </div>

              <ul className="max-w-[26rem] divide-y divide-accent rounded-md border border-accent">
                {documents?.documents.map((document) => (
                  <Link to={document.link} target="_blank" className="block">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-accent/20">
                      <div className="flex w-0 flex-1 items-center">
                        <LinkIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {document.title}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex font-medium text-primary items-center flex-shrink-0">
                        Open
                        <ExternalLink className="h-4 w-4 mb-0.5 ml-2" />
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </>
          ) : (
            <Card className="opacity-20 flex flex-col items-center justify-center h-full py-16">
              <Scale strokeWidth={1} className="h-14 w-14 text-primary" />
              <h6 className="h6 text-[1.325rem] mt-3 text-center">
                No documents yet
              </h6>
              <p className="mt-2 text-muted-foreground text-center ">
                All your legal documents will be listed here.
              </p>
            </Card>
          )}
        </>
      )}
    </FadeIn>
  )
}

export default Documents
