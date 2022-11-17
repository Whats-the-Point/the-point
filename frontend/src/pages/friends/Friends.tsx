import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FriendsList from './FriendsList';

const Friends: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
    >
      <FriendsList />
    </motion.div>
  )
}

export default Friends