import Button from "../../components/button/Button";
import { useNavigate } from 'react-router-dom';
import whats_the_point from '../../assets/whats_the_point.svg'
import "./homePage.css"

const HomePage: React.FC = () => {
    const style = { color: "#F2B429" };
    const navigate = useNavigate();

    return (
        <div>
            <div className="footer">
                <img src={whats_the_point} alt="Whats the point" />
                <Button onClick={() => navigate("/get-started")}>Get Started</Button>
            </div>
            <h1 className="title">
                Your<span style={style}> &nbsp;Scoreboard&nbsp;</span> online.
            </h1>
        </div>
    );
}

export default HomePage;