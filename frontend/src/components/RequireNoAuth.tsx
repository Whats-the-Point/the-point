import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../middleware/hooks/useAuth";

const RequireNoAuth: React.FC = () => {
    const location = useLocation();
    const persist: boolean = JSON.parse(localStorage.getItem("persist")) || false

    return (
        persist ?
            <Navigate to="/profile" state={{ from: location }} replace />
            :
            <Outlet />
    );
}

export default RequireNoAuth