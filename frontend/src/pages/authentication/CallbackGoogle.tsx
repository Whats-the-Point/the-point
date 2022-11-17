import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from "../../components/loading/Loading"

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../services/slices/authSlice'
import { useLoginMutation } from '../../services/slices/authApiSlice'

interface CallbackPostParams {
    code: string | null;
    session_params: {
        state: string | null;
    };
}

const CallbackGoogle: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [login] = useLoginMutation()


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params: CallbackPostParams = {
        code: searchParams.get('code'),
        session_params: {
            state: searchParams.get('state')
        }
    }

    useEffect(() => {
        login(params).unwrap().then(response => {
            console.log(response)
            dispatch(setCredentials({ ...response }))
            if (response.user_status == "active"){
                navigate('/profile')
            } else {
                navigate('/register')
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
