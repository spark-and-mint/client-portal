import { Button } from "@/components/ui"
import { Card } from "@/components/ui/card"
import {
  getEukapayLink,
  getStripeLink,
  removeTimezoneFromTimeString,
} from "@/lib/utils"
import { ArrowLeft, Bitcoin, CreditCard } from "lucide-react"
import FadeIn from "react-fade-in"
import { Link, useNavigate } from "react-router-dom"

const PaymentSummary = ({
  feedbackType,
  numberOfExperts,
  expertise,
  industry,
  timeFrame,
  setStep,
  handleSubmit,
}) => {
  const navigate = useNavigate()
  const summaryItems = [
    { title: "Feedback Type", description: feedbackType },
    { title: "Number of Experts", description: numberOfExperts },
    { title: "Expertise", description: expertise },
    { title: "Industry", description: industry },
    { title: "When", description: removeTimezoneFromTimeString(timeFrame) },
  ]

  const getPrice = (numberOfExperts: number) => {
    let price = 0
    if (numberOfExperts === 1) {
      price = 495
    } else if (numberOfExperts === 2) {
      price = 995
    } else if (numberOfExperts === 3) {
      price = 1495
    }

    return price
  }

  const submit = () => {
    handleSubmit()
    navigate("/")
  }

  return (
    <div>
      <div>
        <FadeIn>
          <h4 className="h4 font-bold mb-6">Review and Pay</h4>
        </FadeIn>

        <div className="flex gap-8">
          <FadeIn className="w-full">
            <Card className="w-full">
              {summaryItems.map((item, index) => (
                <div key={index} className="flex items-center mb-4 last:mb-0">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </Card>
          </FadeIn>

          <FadeIn delay={200} className="w-full">
            <Card>
              <h2 className="text-xl font-semibold mb-5">Order Details</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{`${getPrice(numberOfExperts)}.00`}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Service charge</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between mb-5">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{`${getPrice(numberOfExperts)}.00 USD`}</span>
              </div>
              <div className="flex flex-col gap-4 mt-14">
                <Button asChild size="lg" onClick={submit}>
                  <Link to={getStripeLink(numberOfExperts)} target="_blank">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay with Stripe
                  </Link>
                </Button>

                <Button asChild size="lg" variant="secondary" onClick={submit}>
                  <Link to={getEukapayLink(numberOfExperts)} target="_blank">
                    <Bitcoin className="w-4 h-4 mr-2" />
                    Pay with Crypto
                  </Link>
                </Button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
      <div className="mt-8">
        <Button
          onClick={() => setStep(6)}
          variant="link"
          className="p-0 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )
}

export default PaymentSummary
