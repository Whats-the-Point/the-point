import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./sideBar.css"
import logo from "../../assets/logo.svg"
import dashboard from "../../assets/Dashboard.svg"
import friends from "../../assets/Friends.svg"
import scoreboard from "../../assets/Scoreboard.svg"
import SideBarItem from './SideBarItem'
import Button from '../button/Button'

interface Props {
    dashboardActive: boolean;
    friendsActive: boolean;
    scoreboardActive: boolean;
    handleClickDashboard: React.MouseEventHandler<HTMLAnchorElement>;
    handleClickFriends: React.MouseEventHandler<HTMLAnchorElement>;
    handleClickScoreboard: React.MouseEventHandler<HTMLAnchorElement>;
}

const SideBar: React.FC<Props> = ({ dashboardActive, friendsActive, scoreboardActive, handleClickDashboard, handleClickFriends, handleClickScoreboard }) => {
    return (
        <>
            <nav className='sideBar'>
                <div className='sideBar-links'>
                    <img src={logo} alt="Whats the point" />

                    <SideBarItem active={dashboardActive} image={dashboard} onClick={handleClickDashboard}>My Dashboard</SideBarItem>
                    <SideBarItem active={friendsActive} image={friends} onClick={handleClickFriends}>My Friends</SideBarItem>
                    <SideBarItem active={scoreboardActive} image={scoreboard} onClick={handleClickScoreboard}>Scoreboard</SideBarItem>
                </div>
                <Button extraClass='sideBar-button'>+ Add match</Button>
            </nav>
        </>
    )
}

export default SideBar