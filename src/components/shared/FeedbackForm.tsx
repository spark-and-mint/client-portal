import * as z from "zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
} from "@/components/ui"
import { FeedbackValidation } from "@/lib/validation"
import { toast } from "sonner"
import { useCreateFeedback, useUpdateFeedback } from "@/lib/react-query/queries"
import { Pencil, Plus, RotateCw } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

type FeedbackFormProps = {
  update?: Models.Document
  feedback?: Models.Document
  action: "create" | "update"
}

const FeedbackForm = ({ update, feedback, action }: FeedbackFormProps) => {
  const [showDialog, setShowDialog] = useState(false)

  const form = useForm<z.infer<typeof FeedbackValidation>>({
    resolver: zodResolver(FeedbackValidation),
    defaultValues: {
      text: feedback?.text ?? "",
      label: feedback?.label ?? "",
    },
  })

  const { mutateAsync: createFeedback, isPending: isLoadingCreate } =
    useCreateFeedback()
  const { mutateAsync: updateFeedback, isPending: isLoadingUpdate } =
    useUpdateFeedback()

  const handleSubmit = async (values: z.infer<typeof FeedbackValidation>) => {
    // UPDATE
    if (feedback && action === "update") {
      const updatedFeedback = await updateFeedback({
        feedbackId: feedback.$id,
        text: values.text,
        label: values.label,
      })

      if (!updatedFeedback) {
        toast.error("Could not update feedback. Please try again.")
      } else {
        toast.success("Feedback updated successfully.")
        setShowDialog(false)
      }

      return
    }

    // CREATE
    if (update) {
      const newFeedback = await createFeedback({
        updateId: update.$id,
        text: values.text,
        label: values.label,
      })

      if (!newFeedback) {
        toast.error("Could not add feedback. Please try again.")
      } else {
        toast.success("Feedback added successfully.")
        setShowDialog(false)
      }
    }
  }

  const feedbackLabels = [
    "Looks great 👍",
    "Perfect ⭐",
    "Love it! ❤️",
    "Almost there, just needs a little polish 💅 ",
    "Interesting approach 🧐",
    "Not quite there yet 🔄",
    "Too complex, please simplify 🔍",
    "Off the mark ❌",
    "Not quite aligned with our goals 🚫",
  ]

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        {action === "create" ? (
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add feedback
          </Button>
        ) : (
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "Add feedback" : "Update feedback"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-2">
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex-wrap mt-2 mb-8 gap-3"
              onValueChange={(value) => form.setValue("label", value)}
              defaultValue={form.getValues("label")}
            >
              {feedbackLabels.map((label) => (
                <ToggleGroupItem key={label} value={label} aria-label={label}>
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      placeholder="I left some additional comments in the document for you to review. Please take a look and let's continue the conversation there."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end pt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoadingCreate || isLoadingUpdate}
              >
                {isLoadingCreate || isLoadingUpdate ? (
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin" />
                    {action === "create" ? "Adding..." : "Saving..."}
                  </div>
                ) : (
                  <>{action === "create" ? "Add feedback" : "Save"}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackForm
