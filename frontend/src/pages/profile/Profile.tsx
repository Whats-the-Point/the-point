import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { motion } from 'framer-motion';
import "./profile.css"
import { useLogoutMutation } from '../../middleware/context/authApiSlice'
import { logOut, selectCurrentUser } from '../../services/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Profile: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [shortSlug, setShortSlug] = useState<string>('');
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch()

    useEffect(() => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
        setUsername(user?.username)
        setEmail(user?.email)
        setShortSlug(user?.short_slug)
    }, [user]);

    const logoutHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            logout(null).unwrap()
            dispatch(logOut())
            navigate("/");
        } catch (err) {
            console.log(err)
        }
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
