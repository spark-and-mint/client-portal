import { Button } from "@/components/ui"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import FadeIn from "react-fade-in"

const Partners = () => {
  return (
    <FadeIn className="pb-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h5 className="h5 mb-2">Partner Network</h5>
          <p className="text-sm text-muted-foreground">
            Uniting vision and innovation for a winning future.
          </p>
        </div>
        <Button variant="outline">Become a partner</Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card className="flex w-full flex-col items-center">
          <img
            src="/assets/partners/beats.svg"
            alt="Beats"
            className="h-36 -mt-12"
          />
          <div className="flex flex-col items-center gap-3 -mt-6">
            <CardTitle className="text-[1.25rem]">
              Crypto Banking Partner
            </CardTitle>
            <CardDescription>10% off on your first 6 months</CardDescription>
            <Button size="sm" className="mt-4">
              Go to Offer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
        <Card className="flex w-full flex-col items-center">
          <img
            src="/assets/partners/fideum.svg"
            alt="Beats"
            className="h-36 -mt-12"
          />
          <div className="flex flex-col items-center gap-3 -mt-6">
            <CardTitle className="text-[1.25rem]">
              Blockchain Analytics Partner
            </CardTitle>
            <CardDescription>20% off on premium analytics</CardDescription>
            <Button size="sm" className="mt-4">
              Go to Offer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        <Card className="flex w-full flex-col items-center">
          <img
            src="/assets/partners/functionland.svg"
            alt="Beats"
            className="h-36 -mt-12"
          />
          <div className="flex flex-col items-center gap-3 -mt-6">
            <CardTitle className="text-[1.25rem]">
              AI Research Collaboration
            </CardTitle>
            <CardDescription>10% off on your first 6 months</CardDescription>
            <Button size="sm" className="mt-4">
              Go to Offer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
        <Card className="flex w-full flex-col items-center">
          <img
            src="/assets/partners/bloomly.svg"
            alt="Beats"
            className="h-36 -mt-12"
          />
          <div className="flex flex-col items-center gap-3 -mt-6">
            <CardTitle className="text-[1.25rem]">
              AI Security Solutions
            </CardTitle>
            <CardDescription>20% off on premium analytics</CardDescription>
            <Button size="sm" className="mt-4">
              Go to Offer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* <Card className="py-4">
          <img
            src="/assets/partners/bloomly.svg"
            alt="Bloomly"
            className="h-full w-full"
          />
        </Card>

        <Card className="py-4">
          <img
            src="/assets/partners/ed3.svg"
            alt="Ed3 Dao"
            className="h-full w-full"
          />
        </Card>
        <Card className="py-4">
          <img
            src="/assets/partners/fideum.svg"
            alt="Fideum"
            className="h-full w-full"
          />
        </Card>
        <Card className="py-4">
          <img
            src="/assets/partners/functionland.svg"
            alt="Functionland"
            className="h-full w-full"
          />
        </Card>
        <Card className="py-4">
          <img
            src="/assets/partners/globalunity.svg"
            alt="Global Unity"
            className="h-full w-full"
          />
        </Card> */}
      </div>
    </FadeIn>
  )
}

export default Partners
