import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
            if(response.data.user_status === "initiated") {
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
        <section>
            <h1>Loading...</h1>
        </section>
    );
}

export default CallbackGoogle;