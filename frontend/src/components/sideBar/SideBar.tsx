import React, { useState } from 'react'
import "./sideBar.css"
import logo from "../../assets/logo.svg"
import dashboard from "../../assets/Dashboard.svg"
import friends from "../../assets/Friends.svg"
import scoreboard from "../../assets/Scoreboard.svg"
import SideBarItem from './SideBarItem'
import Button from '../button/Button'
import arrowDown from "../../assets/arrow_down.svg"

interface Props {
    dashboardActive: boolean;
    friendsActive: boolean;
    scoreboardActive: boolean;
    handleClickDashboard: React.MouseEventHandler<HTMLAnchorElement>;
    handleClickFriends: React.MouseEventHandler<HTMLAnchorElement>;
    handleClickScoreboard: React.MouseEventHandler<HTMLAnchorElement>;
}

const SideBar: React.FC<Props> = ({
    dashboardActive,
    friendsActive,
    scoreboardActive,
    handleClickDashboard,
    handleClickFriends,
    handleClickScoreboard
}) => {
    const [open, setOpen] = useState<boolean>(true);

    const handleArrowSideBar = (e: React.MouseEvent<HTMLImageElement> ) => {
        setOpen(!open);
    }

    return (
        <>
            <nav className={`sideBar ${open ? "open" : "close"}`}>
                <div className='sideBar-links'>
                    <div className={`sideBar-top-images ${open ? "open" : "close"}`}>
                        <img className={`sideBar-logo ${open ? "open" : "close"}`}src={logo} alt="Whats the point" />
                        <img onClick={handleArrowSideBar} className={`sideBar-top-images-arrow ${open ? "open" : "close"}`} src={arrowDown} alt="open-close arrow" />
                    </div>

                    <SideBarItem open={open} active={dashboardActive} image={dashboard} onClick={handleClickDashboard}>My Dashboard</SideBarItem>
                    <SideBarItem open={open} active={friendsActive} image={friends} onClick={handleClickFriends}>My Friends</SideBarItem>
                    <SideBarItem open={open} active={scoreboardActive} image={scoreboard} onClick={handleClickScoreboard}>Scoreboard</SideBarItem>
                </div>
                <Button extraClass={`sideBar-button ${open ? "open" : "close"}`}>{open ? "+ Add match" : "+"}</Button>
            </nav>
        </>
    )
}

export default SideBar