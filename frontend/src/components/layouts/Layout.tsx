import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout