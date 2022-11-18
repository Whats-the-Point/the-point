import './getStarted.css';
import GoogleButton from '../../components/iconButtons/GoogleButton';
import whats_the_point from '../../assets/whats_the_point.svg';
import { motion } from 'framer-motion';
import { useLoginMutation } from '../../middleware/context/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const GetStarted: React.FC = () => {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [persist, setPersist] = useState<boolean>(false)


    const loginwithGoogle = (event: React.MouseEvent<HTMLDivElement>) => {
        login(null).unwrap().then((response) => {
            window.location.replace(response.url);
        });
    }

    const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        navigate("/");
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist.toString());
    }, [persist])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            transition={{
                duration: 0.6,
            }}
            animate={{ opacity: 1 }}
            className='main-section'
        >
            <div className='content-section'>
                <img src={whats_the_point} alt="Whats the point" />
                <div className='content-section-text'>
                    <h2 className='content-section-text-h2'>Hey, there</h2>
                    <p>Welcome to your personal scoreboard online. Invite your friends and keep track of your scores.</p>
                    <GoogleButton onClick={loginwithGoogle} />
                    <div className="persistCheck">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                    </div>
                </div>
                <a className="go-back" onClick={goBack}>Go back</a>
            </div>
        </motion.div>
    );
}

export default GetStarted;