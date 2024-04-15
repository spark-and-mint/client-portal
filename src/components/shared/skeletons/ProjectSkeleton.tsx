import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import FadeIn from "react-fade-in"

const ProjectSkeleton = () => {
  return (
    <div>
      <FadeIn className="flex justify-between items-end">
        <div>
          <Skeleton className="w-20 h-8 mt-1" />
          <Skeleton className="w-[24rem] h-12 mt-12" />
          <Skeleton className="w-[30rem] h-6 mt-4" />
          <div className="flex gap-8 mt-6">
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-32 h-8" />
          </div>
        </div>

        <div>
          <Skeleton className="w-52 h-4" />

          <div className="mt-6 space-y-6 gap-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-9 h-9 rounded-full" />
              <div>
                <Skeleton className="w-44 h-4" />
                <Skeleton className="w-44 h-4 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
      <Separator className="my-16" />
    </div>
  )
}

export default ProjectSkeleton
