import React from 'react'
import { motion } from 'framer-motion'

const Scoreboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
    >
      Scoreboard
    </motion.div>
  )
}

export default Scoreboard