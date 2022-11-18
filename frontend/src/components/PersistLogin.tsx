import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, setCredentials } from "../services/slices/authSlice";
import { useRenewMutation } from "../middleware/context/authApiSlice";

const PersistLogin = () => {
    const [isLoadingTwo, setIsLoadingTwo] = useState(true);
    const [renew, { isLoading }] = useRenewMutation()
    const dispatch = useDispatch()
    const token: string = useSelector(selectCurrentToken);
    const persist: boolean = JSON.parse(localStorage.getItem("persist")) || false

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const response = await renew(null).unwrap()
                dispatch(setCredentials({ ...response }))
                return response.access_token;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoadingTwo(false);
            }
        }

        !token && persist ? verifyRefreshToken() : setIsLoadingTwo(false);
    }, [])

    return (
        <>
            {isLoading || isLoadingTwo
                ? <Loading />
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin