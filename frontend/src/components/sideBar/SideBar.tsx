import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./sideBar.css"
import logo from "../../assets/logo.svg"
import dashboard from "../../assets/Dashboard.svg"
import friends from "../../assets/Friends.svg"
import scoreboard from "../../assets/Scoreboard.svg"
import SideBarItem from './SideBarItem'
import Button from '../button/Button'

const SideBar: React.FC = () => {
    const [dashboardActive, setDashboardActive] = useState<boolean>(false)
    const [friendsActive, setFriendsActive] = useState<boolean>(false)
    const [scoreboardActive, setScoreboardActive] = useState<boolean>(false)
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/dashboard") {
            setDashboardActive(true)
            setFriendsActive(false)
            setScoreboardActive(false)
        } else if (location.pathname === "/friends") {
            setDashboardActive(false)
            setFriendsActive(true)
            setScoreboardActive(false)
        } else if (location.pathname === "/scoreboard") {
            setDashboardActive(false)
            setFriendsActive(false)
            setScoreboardActive(true)
        }
    }, []);

    const handleClickDashboard = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setDashboardActive(true)
        setFriendsActive(false)
        setScoreboardActive(false)
        navigate("/dashboard");
    }

    const handleClickFriends = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setDashboardActive(false)
        setFriendsActive(true)
        setScoreboardActive(false)
        navigate("/friends");
    }

    const handleClickScoreboard = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setDashboardActive(false)
        setFriendsActive(false)
        setScoreboardActive(true)
        navigate("/scoreboard");
    }


    return (
        <>
            <nav className='sideBar'>
                <img src={logo} alt="Whats the point" />

                <SideBarItem active={dashboardActive} image={dashboard} onClick={handleClickDashboard}>My Dashboard</SideBarItem>
                <SideBarItem active={friendsActive} image={friends} onClick={handleClickFriends}>My Friends</SideBarItem>
                <SideBarItem active={scoreboardActive} image={scoreboard} onClick={handleClickScoreboard}>Scoreboard</SideBarItem>
                <Button>+ Add match</Button>
            </nav>
        </>
    )
}

export default SideBar