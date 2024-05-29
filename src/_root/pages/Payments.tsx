import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useStakeholderContext } from "@/context/AuthContext"
import { useGetClientDocuments } from "@/lib/react-query/queries"
import { cn } from "@/lib/utils"
import { Dot, ExternalLink, FileText } from "lucide-react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const Payments = () => {
  const { stakeholder } = useStakeholderContext()
  const { data: documents, isPending: isPendingDocuments } =
    useGetClientDocuments(stakeholder.clientId)
  const invoices = documents?.documents.filter((doc) => doc.invoice === true)

  const statuses = {
    yellow: ["Cancelled"],
    green: ["Paid"],
  }

  const statusStyles = {
    yellow: "text-amber-400",
    green: "text-green-500",
  }

  const getStatusColor = (status: string) => {
    for (const [color, statusArray] of Object.entries(statuses)) {
      if (statusArray.includes(status)) {
        return color
      }
    }
    return null
  }

  const getStatus = (status: string) => {
    const color = getStatusColor(status)
    if (!color) return null

    return (
      <span className="flex flex-grow-0 items-center pr-3 pl-0.5 py-1 text-[0.9rem] border border-border rounded-lg text-xs font-medium tracking-wide">
        <Dot className={cn("w-6 h-6 scale-150", statusStyles[color])} />
        {status}
      </span>
    )
  }

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
          {invoices && invoices.length > 0 ? (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">
                  Payments and invoices
                </h3>
                <p className="text-sm text-muted-foreground">
                  View and pay your invoices here.
                </p>
              </div>

              <ul className="divide-y divide-accent rounded-md border border-accent">
                {invoices.map((document) => (
                  <Link
                    key={document.$id}
                    to={document.link}
                    target="_blank"
                    className="block"
                  >
                    <li className="relative flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-accent/20">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                        <FileText
                          className="hidden sm:block h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="sm:ml-4 flex items-center min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {document.title}
                          </span>
                        </div>
                        <div className="flex items-center sm:ml-5">
                          {getStatus(document.status)}
                        </div>
                      </div>
                      <div className="ml-4 flex font-medium text-primary items-center">
                        Open
                        <ExternalLink className="h-4 w-4 mb-0.5 ml-2" />
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </>
          ) : (
            <Card className="flex flex-col items-center justify-center h-full py-16">
              <FileText strokeWidth={1} className="h-14 w-14 text-primary" />
              <h6 className="h6 text-[1.325rem] mt-3 text-center">
                No invoices yet
              </h6>
              <p className="mt-2 text-muted-foreground text-center ">
                All your payments and invoices will be listed here.
              </p>
            </Card>
          )}
        </>
      )}
    </FadeIn>
  )
}

export default Payments
