import axios from '../../middleware/api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from "../../middleware/hooks/useAuth";
import Loading from "../../components/loading/Loading"

interface CallbackPostParams {
    code: string | null;
    session_params: {
        state: string | null;
    };
}

const CallbackGoogle: React.FC = () => {
    const { auth, setAuth } = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    const params: CallbackPostParams = {
        code: searchParams.get('code'),
        session_params: {
            state: searchParams.get('state')
        }
    }

    useEffect(() => {
        axios.post('/api/v1/auth/google/callback', params).then(response => {
            setLoading(false);
            const user = "";
            const accessToken = response.data.access_token;
            const renewalToken = response.data.renewal_token;
            const roles = [response.data.user_status];

            setAuth({ user: user, accessToken: accessToken, renewalToken: renewalToken, roles: roles });
            localStorage.setItem("renewalToken", renewalToken);

            if (response.data.user_status === "initiated") {
                navigate("/register")
            } else {
                navigate("/profile", { replace: true }); // go to user profile or dashboard
            }
        }).catch(error => {
            console.log(error);
            navigate("/")
        });
    },)

    return (
        <Loading />
    );
}

export default CallbackGoogle;