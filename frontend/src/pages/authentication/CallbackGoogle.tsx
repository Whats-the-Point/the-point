import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from "../../components/loading/Loading"

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../services/slices/authSlice'
import { useCallbackMutation } from '../../middleware/context/authApiSlice'

interface CallbackPostParams {
    code: string | null;
    session_params: {
        state: string | null;
    };
}

const CallbackGoogle: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [callback] = useCallbackMutation()


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params: CallbackPostParams = {
        code: searchParams.get('code'),
        session_params: {
            state: searchParams.get('state')
        }
    }

    useEffect(() => {
        callback(params).unwrap().then(response => {
            dispatch(setCredentials({ ...response }))
            if (response.user_status == "initiated"){
                navigate('/register')
            } else {
                navigate('/profile')
            }
        }).catch((err) =>
            console.log(err)
            navigate("/")
        )
    }, [])

return (
    <Loading />
);
}

export default CallbackGoogle;
