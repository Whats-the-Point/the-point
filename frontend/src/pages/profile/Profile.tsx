import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import useAuth from "../../middleware/hooks/useAuth";
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';

const Profile: React.FC = () => {
    const { auth, setAuth } = useAuth();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [shortSlug, setShortSlug] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()

    useEffect(() => {
        axiosPrivate.get("/api/v1/user").then(response => {
            console.log(response);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setShortSlug(response.data.short_slug);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        axiosPrivate.delete("/api/v1/session").then(response => {
            localStorage.clear();
            setAuth({});
            navigate("/");
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <h3>Hello {firstName} {lastName}!</h3>
            <p>Email: {email}</p>
            <p>ID: {shortSlug}</p>
            <p>Username: {username}</p>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Profile
