import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentRole } from "../services/slices/authSlice";

interface Props {
    allowedRoles: string[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentRole);
    const location = useLocation();

    return (
        allowedRoles?.includes(role)
            ? <Outlet />
            : token //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth