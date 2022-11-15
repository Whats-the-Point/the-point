import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../sideBar/SideBar'
import "./activeLayout.css"

const ActiveLayout: React.FC = () => {
    return (
        <main className='main-active'>
            <SideBar />
            <Outlet />
        </main>
    )
}

export default ActiveLayout