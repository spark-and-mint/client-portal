import { Button, Input } from "@/components/ui"
import { ArrowRight, PlusIcon, UploadIcon } from "lucide-react"
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion"
import FadeIn from "react-fade-in/lib/FadeIn"
import { useNavigate } from "react-router-dom"

const confettiProps: ConfettiProps = {
  force: 0.7,
  duration: 3500,
  particleCount: 80,
  width: 1600,
  colors: ["#fd5a1e", "#ffc632", "#ffe45f", "#ff6a34", "#fff"],
  zIndex: 1000,
}

const AddMaterial = ({ handleSubmit }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-16 -mt-4">
      <div className="w-full space-y-8">
        <FadeIn className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <ConfettiExplosion {...confettiProps} />
          </div>
          <h3 className="h3 font-bold tracking-tight">Payment Successful!</h3>
          <p className="text-muted-foreground ">
            Ready to share your project details? Add files and links below.
          </p>
        </FadeIn>
        <FadeIn className="grid gap-8" delay={200}>
          <div>
            <h2 className="text-xl font-semibold">Upload Files</h2>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full mt-4 px-6 pt-5 pb-6 border-2 border-accent border-dashed rounded-md hover:border-primary hover:bg-slate-600/10 transition-colors cursor-pointer">
                <div className="space-y-2 text-center">
                  <UploadIcon
                    strokeWidth={1.5}
                    className="mx-auto w-10 h-10 text-amber-700"
                  />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="files"
                      className="relative cursor-pointer rounded-md bg-background font-medium text-primary"
                    >
                      <span>Upload a file</span>
                      <input
                        id="files"
                        type="file"
                        className="sr-only"
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPG, PNG up to 25MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Links</h2>
            <div className="flex items-center gap-2">
              <Input type="url" placeholder="https://example.com" />
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add another link
              </Button>
            </div>
          </div>
        </FadeIn>
        <FadeIn className="flex justify-center mt-8" delay={300}>
          <Button
            onClick={() => {
              handleSubmit()
              navigate("/")
            }}
          >
            Save & Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </FadeIn>
      </div>
    </div>
  )
}

export default AddMaterial
