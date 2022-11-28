import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { motion } from 'framer-motion';
import "./profile.css"
import useAuth from "../../middleware/hooks/useAuth";
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';

const Profile: React.FC = () => {
    const { auth, setAuth } = useAuth();
    const [firstName, setFirstName] = useState<string>(auth.user?.first_name);
    const [lastName, setLastName] = useState<string>(auth.user?.last_name);
    const [username, setUsername] = useState<string>(auth.user?.username);
    const [email, setEmail] = useState<string>(auth.user?.email);
    const [shortSlug, setShortSlug] = useState<string>(auth.user?.short_slug);
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setFirstName(auth.user?.first_name)
        setLastName(auth.user?.last_name)
        setUsername(auth.user?.username)
        setEmail(auth.user?.email)
        setShortSlug(auth.user?.short_slug)
    }, [auth.user]);

    const logoutHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axiosPrivate.delete("/api/v1/session").then(response => {
            localStorage.clear()
            setAuth({});
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            transition={{
                duration: 0.6,
            }}
            animate={{ opacity: 1 }}
            className="profile-div"
        >
            <h3>Hello {firstName} {lastName}!</h3>
            <p>Email: {email}</p>
            <p>ID: {shortSlug}</p>
            <p>Username: {username}</p>
            <Button onClick={logoutHandle}>Logout</Button>
        </motion.div>
    )
}

export default Profile
