import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { useGetUserMutation } from '../../middleware/context/userSlice';
import { setUser } from '../../services/slices/authSlice';
import { useDispatch } from 'react-redux'
import "./activeLayout.css"
import Loading from '../loading/Loading'
import Unauthorized from '../../pages/Unauthorized'

const ActiveLayout: React.FC = () => {
    const [dashboardActive, setDashboardActive] = useState<boolean>(false)
    const [friendsActive, setFriendsActive] = useState<boolean>(false)
    const [scoreboardActive, setScoreboardActive] = useState<boolean>(false)
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch()
    const [getUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useGetUserMutation()


    useEffect(() => {
        getUser(null).unwrap().then(user => {
            console.log(user)
            dispatch(setUser(user))
        }).catch((err) =>
            console.log(err)
        )

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
        <div className='main-active'>
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
                {isLoading ? <Loading /> :
                    isSuccess ?
                        <Outlet /> : <Unauthorized />}
            </div>
        </div>
    )
}

export default ActiveLayout