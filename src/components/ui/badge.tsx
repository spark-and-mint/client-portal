import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gray: "border-transparent bg-gray-200 text-gray-800",
        blue: "border-transparent bg-blue-50 text-blue-500",
        purple: "border-transparent bg-purple-50 text-purple-700",
        amber: "border-transparent bg-amber-100 text-amber-900",
        red: "border-transparent bg-red-100 text-red-700",
        pink: "border-transparent bg-pink-100 text-pink-700",
        green: "border-transparent bg-green-300 text-green-900",
        teal: "border-transparent bg-teal-100 text-teal-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
