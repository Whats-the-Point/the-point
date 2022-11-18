import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserInfo } from '../../@types/auth';
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';


const Friends: React.FC = () => {
  const [friends, setFriends] = useState<UserInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const axiosPrivate = useAxiosPrivate();



  useEffect(() => {
    axiosPrivate.get("/api/v1/friendship").then(response => {
      setIsSuccess(true)
      setIsLoading(false)
      setFriends(response.data.data.friends)
    }).catch(error => {
      setIsLoading(false)
      setIsSuccess(false)
      setError(error)
      setIsError(true)
      console.log(error);
    })

  }, []);

  const friendsList = () => {
    let content: JSX.Element;
    if (isLoading) {
      content = <p>"Loading..."</p>;
    } else if (isSuccess) {
      content = friends.length !== 0 ? (
        <section className="friends">
          <h3>Friends List</h3>
          {friends.map((friend, i) => {
            return (<div key={friend.short_slug}>
              <p>{i}.</p>
              <p>{friend.first_name} {friend.last_name}</p>
              <p><b>Email:</b> {friend.email}</p>
              <p><b>Username:</b> {friend.username}</p>
              <p><b>ID:</b> {friend.short_slug}</p>
            </div>
            )
          })}
        </section>
      ) : (<p>Not Found any Friends! Add some.</p>)
    } else if (isError) {
      content = <p>{JSON.stringify(error)}</p>;
    }

    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
    >
      {friendsList()}
    </motion.div>
  )
}

export default Friends