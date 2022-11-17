import React, { useState, useEffect } from 'react'
import "./navBar.css"
import inbox from "../../assets/InboxFilled.svg"
import arrowDown from "../../assets/arrow_down.svg"
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../services/slices/authSlice';

interface Props {
    handleClickProfile: React.MouseEventHandler<HTMLAnchorElement>
}

const NavBar: React.FC<Props> = ({ handleClickProfile }) => {
    const [initials, setInitials] = useState<string>();
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.first_name && user?.last_name) {
            let first = Array.from(user.first_name)[0] as string
            let last = Array.from(user.last_name)[0] as string
            setInitials((first + last).toUpperCase())
        }
    }, [user]);

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