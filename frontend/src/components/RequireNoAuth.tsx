import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../services/slices/authSlice";

const RequireNoAuth: React.FC = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation();

    return (
        token ?
            <Navigate to="/profile" state={{ from: location }} replace />
            : <Outlet />
    );
}

export default RequireNoAuth