import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
    image: string;
    children: string;
    active: boolean
    open: boolean
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const SideBarItem: React.FC<Props> = ({ open, active, image, children, onClick }) => {
    return (
        open ?
            <a className={`sideBar-link open ${active ? 'active' : ''}`} onClick={onClick}>
                <img src={image} />
                {children}
            </a> :
            <a className={`sideBar-link close ${active ? 'active' : ''}`} onClick={onClick}>
                <img src={image} />
            </a>
    )
}

export default SideBarItem