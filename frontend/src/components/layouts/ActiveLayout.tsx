import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import "./activeLayout.css"
import Loading from '../loading/Loading'
import Unauthorized from '../../pages/Unauthorized'
import useAuth from "../../middleware/hooks/useAuth";
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';

const ActiveLayout: React.FC = () => {
    const [dashboardActive, setDashboardActive] = useState<boolean>(false)
    const [friendsActive, setFriendsActive] = useState<boolean>(false)
    const [scoreboardActive, setScoreboardActive] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSuccess, setisSuccess] = useState<boolean>(false)
    const [isUninitialized, setisUninitialized] = useState<boolean>(true)
    const navigate = useNavigate();
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        setisUninitialized(false)
        axiosPrivate.get("/api/v1/user").then(response => {
            setAuth({
                user: response.data,
                accessToken: auth.accessToken,
                role: auth.role
            })
            setIsLoading(false)
            setisSuccess(true)
        }).catch(error => {
            setIsLoading(false)
            setisSuccess(false)
            console.log(error);
        })

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

    const handleClickAddMatch = (e: React.MouseEvent<HTMLDivElement>) => {
        setDashboardActive(false)
        setFriendsActive(false)
        setScoreboardActive(false)
        navigate("/add-match");
    }


    const isLoadingOrUnitialized = () => {
        if (isLoading || isUninitialized) {
            return <Loading />
        } else {
            if (isSuccess) {
                return (
                    <>
                        <NavBar handleClickProfile={handleClickProfile} />
                        <Outlet />
                    </>
                )
            } else {
                return <Unauthorized />
            }
        }
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
                handleClickAddMatch={handleClickAddMatch}
            />
            <div className='second-active'>
                {isLoadingOrUnitialized()}
            </div>
        </div>
    )
}

export default ActiveLayout