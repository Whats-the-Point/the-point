import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
    image: string;
    children: string;
    active: boolean
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const SideBarItem: React.FC<Props> = ({ active, image, children, onClick }) => {
    return (
        <a className={`sideBar-link ${active ? 'active' : ''}`} onClick={onClick}>
            <img src={image} />
            {children}
        </a>
    )
}

export default SideBarItem