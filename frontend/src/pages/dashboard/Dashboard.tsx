import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import "./dashboard.css"
import { TableItem } from '../../components/table/TableItem'
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate'
import { Match } from '../../@types/games'

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/api/v1/match").then(response => {
      setIsSuccess(true)
      setIsLoading(false)
      setMatches(response.data.data.matches)
    }).catch(error => {
      setIsLoading(false)
      setIsSuccess(false)
      setError(error)
      setIsError(true)
      console.log(error);
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      animate={{ opacity: 1 }}
      className='dashboard-container'
    >
      <div className='dashboard-container-upper'>
        <div className='data-container'>
          <p>Games Played</p>
          <p>20</p>
        </div>
        <div className='data-container'>
          <p>Victories</p>
          <p>9</p>
        </div>
      </div>
      <div className='dashboard-container-down'>

        <div className='dashboard-down-header'>
          <h5 className='dashboard-down-title'>Last Games Played</h5>
          <a>See all</a>
        </div>
        <div className='dashboard-table'>
          <div className='dashboard-table-header'>
            <p>Game</p>
            <p>Date</p>
            <p>Players</p>
            <p>Winner</p>
            <p>Highest Score</p>
            <p>Your place</p>
          </div>
          <div className="vector" />
          <div className='dashboard-data-y-scroll'>
            <div className='dashboard-data-x-scroll'>
              {matches.map((match, i) => {
                return <TableItem key={match.id} match={match}/>
              })}
            </div>
          </div>
        </div>
      </div>


    </motion.div>
  )
}

export default Dashboard