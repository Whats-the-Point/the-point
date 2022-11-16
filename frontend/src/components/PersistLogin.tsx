import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../middleware/hooks/useRefreshToken";
import useAuth from "../middleware/hooks/useAuth";
import Loading from "./loading/Loading";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const renewal_token = localStorage.getItem("renewal_token")
    console.log(renewal_token)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
                localStorage.clear();
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

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