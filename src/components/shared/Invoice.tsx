import { FileText, Bitcoin, CreditCard, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"

const Invoice = ({ title, eukapayInvoice, stripePayment }) => {
  const [isPaid, setIsPaid] = useState(false)

  const getStatusBadge = (paid: boolean) => {
    if (paid) {
      return (
        <Badge
          variant="outline"
          className="rounded-md text-[0.7rem] px-1.5 py-0 border-green-600/20 bg-green-800/10 text-[#4ade80] tracking-wide"
        >
          <Check strokeWidth={3} className="w-3 h-3 mr-1" />
          Paid
        </Badge>
      )
    } else {
      return (
        <Badge
          variant="outline"
          className="rounded-md text-[0.7rem] px-1.5 py-0 border-yellow-600/20 bg-amber-900/10 text-[#eab308] tracking-wide"
        >
          Unpaid
        </Badge>
      )
    }
  }

  useEffect(() => {
    if (stripePayment?.paid === true || eukapayInvoice?.status === "Paid") {
      setIsPaid(true)
    }
  }, [stripePayment, eukapayInvoice])

  const getPrice = () => {
    if (stripePayment?.itemPrices && stripePayment?.itemPrices.length > 0) {
      return `$${new Intl.NumberFormat().format(
        stripePayment?.itemPrices[0].price / 100
      )} ${stripePayment?.itemPrices[0].currency.toUpperCase()}`
    } else if (eukapayInvoice) {
      return `$${new Intl.NumberFormat().format(eukapayInvoice?.price)} ${
        eukapayInvoice?.currency.unit
      }`
    }
  }

  return (
    <li className="relative flex items-center justify-between py-4 px-6 border border-accent rounded-xl text-sm leading-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
        <FileText
          strokeWidth={1.1}
          className="hidden sm:block h-12 w-12 flex-shrink-0 text-primary opacity-90"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-1.5">
          <div className="text-base font-medium">{title}</div>
          <div className="flex items-center gap-3">
            <p className="text-gray-300 font-medium">
              Total amount: {getPrice()}
            </p>
            {getStatusBadge(isPaid)}
          </div>
        </div>
      </div>

      {!isPaid && (
        <div className="flex flex-col gap-4">
          {stripePayment?.url && (
            <Link to={stripePayment?.url} target="_blank">
              <Button size="sm" className="w-48">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Stripe
              </Button>
            </Link>
          )}
          {eukapayInvoice?.paymentUrl && (
            <Link to={eukapayInvoice?.paymentUrl} target="_blank">
              <Button
                size="sm"
                variant={stripePayment?.url ? "outline" : "default"}
                className="w-48"
              >
                <Bitcoin className="w-4 h-4 mr-2" />
                Pay with Crypto
              </Button>
            </Link>
          )}
        </div>
      )}
    </li>
  )
}

export default Invoice
