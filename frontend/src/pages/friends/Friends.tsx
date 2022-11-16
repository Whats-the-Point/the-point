import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';
import { UserInfo } from '../../@types/user'

const Friends: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [friends, setFriends] = useState<UserInfo[]>([])

  useEffect(() => {
    axiosPrivate.get("/api/v1/friendship").then(response => {
      setFriends(response.data.data.friends)
    }).catch(error => {
      console.log(error);
    })
  }, []);



  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
    >
      {friends.length !== 0 ?
        friends.map((item, i) => {
          return (<div key={item.short_slug}>
            <p>{i}.</p>
            <p>{item.first_name} {item.last_name}</p>
            <p><b>Email:</b> {item.email}</p>
            <p><b>Username:</b> {item.username}</p>
            <p><b>ID:</b> {item.short_slug}</p>
          </div>
          )
        }) : <p>Not Found any Friends! Add some.</p>}
    </motion.div>
  )
}

export default Friends