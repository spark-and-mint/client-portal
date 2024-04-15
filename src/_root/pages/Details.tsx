import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Input, Button } from "@/components/ui"
import { useStakeholderContext } from "@/context/AuthContext"
import { RotateCw } from "lucide-react"
import FadeIn from "react-fade-in"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ClientValidation } from "@/lib/validation"
import { useGetClientById, useUpdateClient } from "@/lib/react-query/queries"
import FormLoader from "@/components/shared/FormLoader"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from "@/components/shared/ImageUploader"

const Details = () => {
  const { stakeholder } = useStakeholderContext()
  const { data: client, isPending } = useGetClientById(stakeholder.client.id)

  const form = useForm<z.infer<typeof ClientValidation>>({
    resolver: zodResolver(ClientValidation),
    defaultValues: {
      name: client?.name,
      website: client?.website,
      description: client?.description,
      file: [],
    },
  })

  const { mutateAsync: updateClient, isPending: isLoadingUpdate } =
    useUpdateClient()

  const handleSubmit = async (values: z.infer<typeof ClientValidation>) => {
    const updatedClient = await updateClient({
      id: stakeholder.client.id,
      logoId: stakeholder.client.logoId,
      logoUrl: stakeholder.client.logoUrl,
      ...values,
    })

    if (!updatedClient) {
      toast.error("Failed to update client. Please try again")
    } else {
      toast.success("Client updated successfully!")
    }
  }

  if (isPending) {
    return <FormLoader />
  }

  return (
    <div className="pb-12">
      <FadeIn className="space-y-6">
        <div className="mb-12">
          <h3 className="text-lg font-medium mb-2">Company details</h3>
          <p className="text-sm text-muted-foreground">
            Update your company or organization details
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {" "}
            <FormField
              control={form.control}
              name="name"
              defaultValue={client?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              defaultValue={client?.website}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              defaultValue={client?.description}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <ImageUploader
                      fieldChange={field.onChange}
                      mediaUrl={stakeholder.client.logoUrl.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <div className="flex gap-6 pt-8">
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
            </div>
          </form>
        </Form>
      </FadeIn>
    </div>
  )
}

export default Details
