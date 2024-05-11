import { Card } from "@/components/ui/card"
import { Scale } from "lucide-react"
import FadeIn from "react-fade-in"

const Documents = () => {
  return (
    <FadeIn className="pb-16 space-y-4">
      <Card className="flex flex-col items-center justify-center h-full py-16">
        <Scale strokeWidth={1} className="h-14 w-14 text-primary" />
        <h6 className="h6 text-[1.325rem] mt-3 text-center">
          No documents yet
        </h6>
        <p className="mt-2 text-muted-foreground text-center ">
          All your legal documents will be listed here.
        </p>
      </Card>
    </FadeIn>
  )
}

export default Documents
