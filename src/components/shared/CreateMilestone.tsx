import { PlusIcon, RotateCw } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  Label,
} from "@/components/ui"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCreateMilestone } from "@/lib/react-query/queries"
import { MilestoneValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"

const CreateMilestone = ({ projectId }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { mutateAsync: createMilestone, isPending } = useCreateMilestone()

  const form = useForm<z.infer<typeof MilestoneValidation>>({
    resolver: zodResolver(MilestoneValidation),
    defaultValues: {
      title: "",
    },
  })

  const handleCreateMilestone = async (
    milestone: z.infer<typeof MilestoneValidation>
  ) => {
    const newMilestone = await createMilestone({
      projectId,
      title: milestone.title,
    })

    if (!newMilestone) {
      toast.error("Could not create milestone. Please try again.")
    } else {
      toast.success("Project created successfully.")
      setShowCreateDialog(false)
    }
  }

  return (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create milestone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new milestone</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleCreateMilestone)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium">Title</Label>
                  <Input type="text" {...field} />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-4">
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Creating...
                  </div>
                ) : (
                  "Create milestone"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMilestone
