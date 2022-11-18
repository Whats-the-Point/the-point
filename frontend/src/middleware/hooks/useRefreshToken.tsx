import useAuth from './useAuth';
import axios from '../../middleware/api/axios';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/v1/session/renew', { withCredentials: true });

        setAuth({
            user: auth.user,
            accessToken: response.data.access_token,
            role: response.data.user_status
        });
        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;