import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }

  return (
    <div className={cn("relative p-0.5 group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-xl z-[1] opacity-60 group-hover:opacity-100 blur-lg transition duration-200 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffc632,transparent),radial-gradient(circle_farthest-side_at_100%_0,#fd5a1e,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffe45f,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#ff6a34)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffc632,transparent),radial-gradient(circle_farthest-side_at_100%_0,#fd5a1e,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffe45f,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#ff6a34)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
