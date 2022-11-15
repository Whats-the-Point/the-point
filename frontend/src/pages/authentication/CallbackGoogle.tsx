import './callbackGoogle.css'
import axios from 'axios';
import loading_gif from '../../assets/loading.gif'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { loginCurrentUser } from '../../services/sliceUsers';

interface CallbackPostParams {
    code: string | null;
    session_params: {
        state: string | null;
    };
}

const CallbackGoogle: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const params: CallbackPostParams = {
        code: searchParams.get('code'),
        session_params: {
            state: searchParams.get('state')
        }
    }

    useEffect(() => {
        axios.post('/api/v1/auth/google/callback', params).then(response => {
            console.log(response);
            setLoading(false);
            if (response.data.user_status === "initiated") {
                dispatch(loginCurrentUser({auth_token: response.data.auth_token, renew_token: response.data.renew_token}))
                navigate("/register")
            } else {
                navigate("/register") // go to user profile
            }
        }).catch(error => {
            navigate("/")
            console.log(error);
        });
    },)

    return (
        <div className='loading-div'>
            <img src={loading_gif} alt="Loading..." />
        </div>
    );
}

export default CallbackGoogle;