import { useGetEukapayInvoice } from "@/lib/react-query/queries"
import { Dot, FileText, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { Skeleton } from "../ui/skeleton"

const Invoice = ({ invoice }) => {
  const { data: invoiceData, isPending: isPendingInvoice } =
    useGetEukapayInvoice(invoice.code)

  const getStatus = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.8rem] font-medium border border-border rounded-lg">
            <Dot className="w-6 h-6 text-green-500 scale-150" />
            Accepted
          </span>
        )
      default:
        return (
          <span className="flex gap-0.5 pr-3 pl-1 py-1.5 text-[0.8rem] font-medium border border-border rounded-lg">
            <Dot className="w-6 h-6 text-amber-400 scale-150" />
            {status}
          </span>
        )
    }
  }

  if (isPendingInvoice) {
    return (
      <div className="flex justify-between p-6">
        <Skeleton className="w-64 h-6" />
        <Skeleton className="w-28 h-6" />
      </div>
    )
  }

  return (
    <Link to={invoiceData.paymentUrl} target="_blank" className="block">
      <li className="relative flex items-center justify-between py-4 px-6 text-sm leading-6 hover:bg-accent/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
          <FileText
            className="hidden sm:block h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="sm:ml-4 flex items-center min-w-0 flex-1 gap-2">
            <span className="truncate font-medium">{invoice.title}</span>
          </div>
          <div className="flex items-center sm:ml-5">
            {getStatus(invoiceData.status)}
          </div>
        </div>
        <div className="ml-4 flex font-medium text-primary items-center">
          Open
          <ExternalLink className="h-4 w-4 mb-0.5 ml-2" />
        </div>
      </li>
    </Link>
  )
}

export default Invoice
