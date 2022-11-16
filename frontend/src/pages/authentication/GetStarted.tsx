import GoogleButton from '../../components/button/GoogleButton';
import axios from '../../middleware/api/axios';
import whats_the_point from '../../assets/whats_the_point.svg';
import './getStarted.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GetStarted: React.FC = () => {
    const navigate = useNavigate()
    const loginwithGoogle = (event: React.MouseEvent<HTMLDivElement>) => {
        axios.get("/api/v1/auth/google/new").then((response) => {
            window.location.replace(response.data.url);
        });
    }

    const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        navigate("/");
    }

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
                </div>
                <a className="go-back" onClick={goBack}>Go back</a>
            </div>
        </motion.div>
    );
}

export default GetStarted;