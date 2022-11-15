import useAuth from './useAuth';
import axios from '../../middleware/api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        // if renewalToken not available logout user?
        const renewalToken = localStorage.getItem("renewalToken") || "";
        if (renewalToken !== "") {
            const response = await axios.get('/api/v1/session/renew', { headers: { 'Authorization': renewalToken } });

            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.access_token);
                return {
                    ...prev,
                    accessToken: response.data.access_token,
                    renewalToken: response.data.renewal_token,
                    roles: [response.data.user_status]
                }
            });
            localStorage.setItem("renewalToken", response.data.renewal_token)
            return response.data.accessToken;
        } else
            return null;
    }

    return refresh;
};

export default useRefreshToken;