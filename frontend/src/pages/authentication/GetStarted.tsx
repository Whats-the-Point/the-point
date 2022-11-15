import GoogleButton from '../../components/button/GoogleButton';
import axios from '../../middleware/api/axios';
import whats_the_point from '../../assets/whats_the_point.svg';
import './getStarted.css';
import { useNavigate } from 'react-router-dom';

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
        <div className='main-section'>
            <div className='content-section'>
                <img src={whats_the_point} alt="Whats the point" />
                <h2>Hey, there</h2>
                <p>Welcome to your personal scoreboard online. Invite your friends and keep track of your scores.</p>
                <GoogleButton onClick={loginwithGoogle} />
                <a className="go-back" onClick={goBack}>Go back</a>
            </div>
        </div>
    );
}

export default GetStarted;