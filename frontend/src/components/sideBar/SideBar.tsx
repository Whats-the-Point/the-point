import React, { useState, useEffect } from 'react'
import "./sideBar.css"
import logo from "../../assets/logo.svg"
import dashboard from "../../assets/Dashboard.svg"
import friends from "../../assets/Friends.svg"
import scoreboard from "../../assets/Scoreboard.svg"
import SideBarItem from './SideBarItem'
import Button from '../button/Button'
import arrowDown from "../../assets/arrow_down.svg"
import { motion } from 'framer-motion'

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
    const [sideBarWidth, setSideBarWidth] = useState<string>("0%");
    const [buttonWidth, setButtonWidth] = useState<string>("271px");
    const [logoWidth, setLogoWidth] = useState<string>("auto");
    const [rotationArrow, setRotationArrow] = useState<number>(90);

    useEffect(() => {
        setSideBarWidth("319px")
    }, [])
    

    const handleArrowSideBar = (e: React.MouseEvent<HTMLImageElement>) => {
        if (open) {
            setSideBarWidth("100px")
            setLogoWidth("0px")
            setButtonWidth("60px")
            setRotationArrow(-90)
        } else {
            setSideBarWidth("319px")
            setLogoWidth("auto")
            setButtonWidth("271px")
            setRotationArrow(90)
        }
        setOpen(!open);
    }


    return (
        <motion.nav
            initial={{ width: sideBarWidth }}
            transition={{
                ease: [0.1, 0.2, 0.4, 1]
            }}
            animate={{ width: sideBarWidth }}
            className={`sideBar`}
        >
            <motion.div
                initial={{ opacity: 0 }}
                transition={{
                    duration: 0.6,
                }}
                animate={{ opacity: 1 }}
                className='sideBar-links'
            >
                <div className={`sideBar-top-images ${open ? "open" : "close"}`}>
                    <motion.img animate={{ width: logoWidth }} className="sideBar-logo" src={logo} alt="Whats the point" />
                    <motion.img animate={{rotate: rotationArrow }}onClick={handleArrowSideBar} src={arrowDown} alt="open-close arrow" />
                </div>

                <SideBarItem open={open} active={dashboardActive} image={dashboard} onClick={handleClickDashboard}>My Dashboard</SideBarItem>
                <SideBarItem open={open} active={friendsActive} image={friends} onClick={handleClickFriends}>My Friends</SideBarItem>
                <SideBarItem open={open} active={scoreboardActive} image={scoreboard} onClick={handleClickScoreboard}>Scoreboard</SideBarItem>
            </motion.div>
            <Button animateWidth={buttonWidth} extraClass={`sideBar-button`}>{open ? "+ Add match" : "+"}</Button>
        </motion.nav>
    )
}

export default SideBar