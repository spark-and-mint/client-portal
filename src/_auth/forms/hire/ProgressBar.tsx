import { motion } from "framer-motion"

const ProgressBar = ({ step, steps }) => {
  const numberOfSteps = Object.keys(steps).length - 1
  const percentageComplete = Math.round((step / numberOfSteps) * 100)

  return (
    <div className="relative w-full h-0.25 mb-5 bg-slate-800/60 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentageComplete}%` }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="h-full bg-gradient-to-r from-amber-900 to-orange-200"
      />
    </div>
  )
}

export default ProgressBar
