import Invoice from "@/components/shared/Invoice"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useStakeholderContext } from "@/context/AuthContext"
import {
  useGetClientDocuments,
  useGetInvoiceData,
} from "@/lib/react-query/queries"
import { FileText } from "lucide-react"
import FadeIn from "react-fade-in"

const InvoiceList = ({ invoices }) => {
  const { data: invoiceData, isPending, isError } = useGetInvoiceData(invoices)

  if (isPending) {
    return (
      <Card className="flex flex-col items-center justify-center h-full py-16">
        <Skeleton className="h-14 w-14 rounded-full" />
        <Skeleton className="h-6 w-48 mt-3 rounded-md" />
        <Skeleton className="h-5 w-80 mt-4 rounded-md" />
      </Card>
    )
  }

  if (isError) {
    return <p>Error loading invoices. Please try again later.</p>
  }

  return (
    <div className="space-y-8">
      {invoiceData.map((invoiceData) => (
        <Invoice
          key={invoiceData.id}
          title={invoiceData.title}
          eukapayInvoice={invoiceData.eukapayInvoice}
          stripePayment={invoiceData.stripePayment}
        />
      ))}
    </div>
  )
}

const Payments = () => {
  const { stakeholder } = useStakeholderContext()
  const { data: documents, isPending: isPendingDocuments } =
    useGetClientDocuments(stakeholder.clientId)
  const invoices = documents?.documents.filter((doc) => doc.invoice === true)

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

              <ul className="space-y-10">
                <InvoiceList invoices={invoices} />
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
