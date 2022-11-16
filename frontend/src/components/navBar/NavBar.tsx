import React from 'react'
import "./navBar.css"
import { useNavigate } from 'react-router-dom'
import inbox from "../../assets/InboxFilled.svg"
import arrowDown from "../../assets/arrow_down.svg"

interface Props {
    handleClickProfile: React.MouseEventHandler<HTMLAnchorElement>
}

const NavBar: React.FC<Props> = ({ handleClickProfile }) => {
    const navigate = useNavigate();

    return (
        <nav className='navBar'>
            <a className='navBar-link inbox'>
                <img className='navBar-link-icon' src={inbox} />
            </a>
            <div className='navBar-profile'>
                <a onClick={handleClickProfile} className='navBar-link profile'>RP</a>
                <img className='navBar-profile-icon' src={arrowDown} />
            </div>
        </nav>
    )
}

export default NavBar