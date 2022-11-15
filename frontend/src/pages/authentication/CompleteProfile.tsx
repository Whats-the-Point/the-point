import './completeProfile.css'
import Button from "../../components/button/Button";
import useAuth from '../../middleware/hooks/useAuth';
import { useSelector }from "react-redux";
import { useCurrentUser } from "../../services/sliceUsers";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';

const USERNAME_REGEX = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
interface PostParams {
    name: string;
    username: string;
}

const CompleteProfile: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [validUsername, setValidUsername] = useState<boolean>(false);
    const [validName, setValidName] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const current_user = useSelector(useCurrentUser);
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();
    const { setAuth } = useAuth();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
        setErrMsg([]);
    }, [username])

    useEffect(() => {
        if (name === "") {
            setValidName(false)
        } else {
            setValidName(true);
        }
    }, [name])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params: PostParams = {
            name: name,
            username: username
        }
        setLoading(true);

        axiosPrivate.post("/api/v1/user/complete-profile", params).then(response => {
            setLoading(false);
            setSuccess(true);
            setAuth(prev => {
                return {
                    ...prev,
                    roles: ["active"]
                }
            });
            /*
                - navigate to dashboard or user profile? 
                - then prompt some status of a successfull complete profile
            */
           navigate("/profile")
        }).catch(error => {
            setLoading(false);
            setSuccess(false);
            const data = error.response.data
            setErrMsg([...errMsg, data.error?.message, JSON.stringify(data.errors), data.message])
            errRef.current.focus()
        });
    }

    return (
        <section>
            <h3>Welcome to the Point! Please complete your profile.</h3>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <Button type="submit" disabled={!validName || !validUsername}>Save</Button>
            </form>
        </section>
    );
}

export default CompleteProfile;