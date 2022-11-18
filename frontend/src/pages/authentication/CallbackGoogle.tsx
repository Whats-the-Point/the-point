import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from "../../components/loading/Loading"
import axios from '../../middleware/api/axios';
import useAuth from "../../middleware/hooks/useAuth";

interface CallbackPostParams {
    code: string | null;
    session_params: {
        state: string | null;
    };
}

const CallbackGoogle: React.FC = () => {
    const { auth, setAuth } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    console.log("CALLBACK GOOGLE")

    const params: CallbackPostParams = {
        code: searchParams.get('code'),
        session_params: {
            state: searchParams.get('state')
        }
    }
    useEffect(() => {
        axios.post('/api/v1/auth/google/callback', params).then(response => {
            const user = {};
            const accessToken = response.data.access_token;
            const role = response.data.user_status;

            setAuth({ user: user, accessToken: accessToken, role: role });

            if (response.data.user_status === "initiated") {
                navigate("/register")
            } else {
                navigate("/profile", { replace: true }); // go to user profile or dashboard
            }
        }).catch((err) => {
            console.log(err)
            navigate('/')
        })
    }, [])

    return (
        <Loading />
    );
}

export default CallbackGoogle;
