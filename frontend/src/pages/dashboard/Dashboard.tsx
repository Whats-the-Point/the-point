import React from 'react'
import { motion } from 'framer-motion'

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
    >
      Dashboard
    </motion.div>
  )
}

export default Dashboard