import { motion } from "framer-motion"

interface FadeInProps {
  duration?: number
  delay?: number
  children: React.ReactNode
  className?: string
}

const FadeIn = ({ duration, delay, children, className }: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration ?? 0.75,
        delay: delay ?? 0,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
