import React, { useState, useEffect } from 'react'
import "./navBar.css"
import inbox from "../../assets/InboxFilled.svg"
import arrowDown from "../../assets/arrow_down.svg"
import useAuth from "../../middleware/hooks/useAuth";

interface Props {
    handleClickProfile: React.MouseEventHandler<HTMLAnchorElement>
}

const NavBar: React.FC<Props> = ({ handleClickProfile }) => {
    const [initials, setInitials] = useState<string>();
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.user?.first_name && auth.user?.last_name) {
            let first = Array.from(auth.user.first_name)[0] as string
            let last = Array.from(auth.user.last_name)[0] as string
            setInitials((first + last).toUpperCase())
        }
    }, [auth.user]);

    return (
        <nav className='navBar'>
            <a className='navBar-link inbox'>
                <img className='navBar-link-icon' src={inbox} />
            </a>
            <div className='navBar-profile'>
                <a onClick={handleClickProfile} className='navBar-link profile'>{initials}</a>
                <img className='navBar-profile-icon' src={arrowDown} />
            </div>
        </nav>
    )
}

export default NavBar