import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./loading/Loading";
import useRefreshToken from "../middleware/hooks/useRefreshToken";
import useAuth from "../middleware/hooks/useAuth"

const PersistLogin = () => {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const persist: boolean = JSON.parse(localStorage.getItem("persist")) || false

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
               
            }
            catch (err) {
                console.error(err);
                localStorage.clear();
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <>
            {isLoading
                ? <Loading />
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin