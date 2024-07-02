import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Form,
} from "@/components/ui"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useGetFeedbackRequestById,
  useUpdateFeedbackRequest,
} from "@/lib/react-query/queries"
import { FeedbackRequestValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, RotateCw } from "lucide-react"
import FadeIn from "react-fade-in"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

const FeedbackRequestDetails = () => {
  const { feedbackRequestId } = useParams()
  const { data: feedbackRequest, isPending } =
    useGetFeedbackRequestById(feedbackRequestId)
  const { mutateAsync: updateFeedbackRequest, isPending: isLoadingUpdate } =
    useUpdateFeedbackRequest()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FeedbackRequestValidation>>({
    resolver: zodResolver(FeedbackRequestValidation),
    defaultValues: {
      link: feedbackRequest?.link,
      file: [],
    },
  })

  const fileRef = form.register("file")

  const handleSubmit = async (
    values: z.infer<typeof FeedbackRequestValidation>
  ) => {
    try {
      if (!feedbackRequest) return

      console.log("submit lol?")

      const updatedFeedbackRequest = await updateFeedbackRequest({
        feedbackRequestId: feedbackRequest.$id,
        link: feedbackRequest.link,
        fileName: feedbackRequest.fileName,
        fileId: feedbackRequest.fileId,
        fileUrl: feedbackRequest.fileUrl,
        ...values,
      })

      if (!updatedFeedbackRequest) {
        toast.error("Could not update details. Please try again.")
      } else {
        toast.success("Details updated successfully.")
      }
    } catch (error) {
      toast.error("Could not update details. Please try again")
    }
  }

  const summaryItems = [
    { title: "Feedback Type", description: feedbackRequest?.feedbackType },
    {
      title: "Number of Experts",
      description: feedbackRequest?.numberOfExperts,
    },
    { title: "Expertise", description: feedbackRequest?.expertise },
    { title: "Status", description: feedbackRequest?.status },
  ]

  return (
    <div>
      {isPending ? (
        <Card className="flex flex-col items-center justify-center h-full py-16">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-6 w-48 mt-3 rounded-md" />
          <Skeleton className="h-5 w-80 mt-4 rounded-md" />
        </Card>
      ) : (
        <div className="w-full space-y-10">
          <FadeIn>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">
                Feedback Request Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Ready to share your project details? Add files and links below.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Card className="w-full mt-6 py-0 px-5">
              <dl className="divide-y divide-stroke-1">
                {summaryItems.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  >
                    <dt className="text-sm font-semibold leading-6">
                      {item.title}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 first-letter:capitalize">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </FadeIn>

          <FadeIn delay={400}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10">
                  <FormField
                    control={form.control}
                    name="link"
                    defaultValue={feedbackRequest?.link}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link to your project</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem className="relative w-full">
                        <FormLabel>
                          {feedbackRequest?.fileName ? (
                            <>
                              Uploaded:{" "}
                              <span className="text-primary">{`${feedbackRequest.fileName}`}</span>
                            </>
                          ) : (
                            "File upload"
                          )}
                        </FormLabel>
                        <Input
                          type="file"
                          className="cursor-pointer file:cursor-pointer"
                          {...fileRef}
                        />
                        <FormDescription className="absolute -bottom-6 right-0 text-xs text-end">
                          Max file size: 25MB
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between pt-8">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoadingUpdate}>
                    {isLoadingUpdate ? (
                      <div className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Updating...
                      </div>
                    ) : (
                      "Update details"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </FadeIn>
        </div>
      )}
    </div>
  )
}

export default FeedbackRequestDetails
