import React from 'react'
import { motion } from 'framer-motion'

const Friends = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
    >
      Friends
    </motion.div>
  )
}

export default Friends