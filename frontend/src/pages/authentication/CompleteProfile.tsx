import './completeProfile.css'
import Button from "../../components/button/Button";
import useAuth from '../../middleware/hooks/useAuth';
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

const USERNAME_REGEX = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
interface PostParams {
    first_name: string;
    last_name: string;
    username: string;
}

const CompleteProfile: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [validUsername, setValidUsername] = useState<boolean>(false);
    const [validFirstName, setValidFirstName] = useState<boolean>(false);
    const [validLastName, setValidLastName] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
        setErrMsg([]);
    }, [username])

    useEffect(() => {
        if (firstName === "") {
            setValidFirstName(false)
        } else {
            setValidFirstName(true);
        }
    }, [firstName])

    useEffect(() => {
        if (lastName === "") {
            setValidLastName(false)
        } else {
            setValidLastName(true);
        }
    }, [lastName])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params: PostParams = {
            first_name: firstName,
            last_name: lastName,
            username: username
        }
        setIsLoading(true);

        axiosPrivate.post("/api/v1/user/complete-profile", params).then(response => {
            setIsLoading(false);
            setSuccess(true);
            setAuth({
                user: auth.user,
                accessToken: auth.accessToken,
                role: "active"
            });
            navigate("/profile")
        }).catch(error => {
            setIsLoading(false);
            setSuccess(false);
            const data = error.response.data
            setErrMsg([...errMsg, data.error?.message, JSON.stringify(data.errors), data.message])
            errRef.current.focus()
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            transition={{
                duration: 0.6,
            }}
            animate={{ opacity: 1 }}
        >
            <h3>Welcome to the Point! Please complete your profile.</h3>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            {isLoading ? <p>Loading...</p> : ""}
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
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <Button type="submit" disabled={!validFirstName || !validLastName || !validUsername}>Save</Button>
            </form>
        </motion.div>
    );
}

export default CompleteProfile;