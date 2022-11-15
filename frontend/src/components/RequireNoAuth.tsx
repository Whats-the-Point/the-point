import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../middleware/hooks/useAuth";

const RequireNoAuth: React.FC = () => {

    const { auth } = useAuth();
    const location = useLocation();
    const renewal_token = localStorage.getItem("renewalToken")
    console.log(renewal_token)

    return (
        renewal_token && renewal_token !== ""
            ? <Navigate to="/profile" state={{ from: location }} replace />
            : <Outlet />
    );
}

export default RequireNoAuth