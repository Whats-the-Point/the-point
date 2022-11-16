import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import "./activeLayout.css"

const ActiveLayout: React.FC = () => {
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

    const handleClickProfile = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setDashboardActive(false)
        setFriendsActive(false)
        setScoreboardActive(false)
        navigate("/profile");
    }

    return (
        <main className='main-active'>
            <SideBar
                dashboardActive={dashboardActive}
                friendsActive={friendsActive}
                scoreboardActive={scoreboardActive}
                handleClickDashboard={handleClickDashboard}
                handleClickScoreboard={handleClickScoreboard}
                handleClickFriends={handleClickFriends}
            />
            <div className='second-active'>
                <NavBar handleClickProfile={handleClickProfile} />
                <Outlet />
            </div>
        </main>
    )
}

export default ActiveLayout