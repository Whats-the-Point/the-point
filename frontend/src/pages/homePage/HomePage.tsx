import Button from "../../components/button/Button";
import { useNavigate } from 'react-router-dom';
import whatsThePoint from '../../assets/whats_the_point.svg'
import homePageVideo from '../../assets/homePage_video.mp4'
import "./homePage.css"

const HomePage: React.FC = () => {
    const style = { color: "#F2B429" };
    const navigate = useNavigate();

    return (
        <div className="main-home-page">
            <div className="footer">
                <img src={whatsThePoint} alt="Whats the point" />
                <Button onClick={() => navigate("/get-started")}>Get Started</Button>
            </div>
            <div className="homepage-video">
                <video hidden id="myVideo" autoPlay muted loop>
                    <source src={homePageVideo} />
                </video>

                <h1 className="text-over-video">
                    Your<span style={style}> Scoreboard</span> online.
                </h1>
            </div>
        </div>
    );
}

export default HomePage;