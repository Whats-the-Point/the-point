import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../middleware/hooks/useAuth";

interface Props {
    allowedRoles: string[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth