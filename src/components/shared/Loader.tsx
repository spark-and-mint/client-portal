import StarSvg from "@/svg/StarSvg"
import { motion } from "framer-motion"

const Loader = ({ text }: { text?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
    className="flex justify-center h-full -mt-12"
  >
    <div className="flex items-center justify-center -mt-24">
      <div className="relative">
        {text ? (
          <>
            <span className="animate-pulse-reverse delay-200 min-w-24">
              {text}
            </span>
            <StarSvg className="absolute -top-24 -left-20 h-4 w-4 animate-ping-slow delay-500" />
            <StarSvg className="absolute top-16 -left-24 h-4 w-4 animate-ping-slow delay-75" />
            <StarSvg className="absolute -top-6 -left-10 h-3 w-3 animate-ping delay-150" />
            <StarSvg className="absolute -top-20 -right-4 h-4 w-4 animate-ping-slow" />
            <StarSvg className="absolute top-24 right-10 h-3 w-4 animate-ping-slow delay-700" />
            <StarSvg className="absolute top-12 -right-16 h-3 w-3 animate-ping delay-1000" />
          </>
        ) : (
          <>
            <StarSvg className="h-4 w-4 animate-ping-slow" />
          </>
        )}
      </div>
    </div>
  </motion.div>
)

export default Loader
