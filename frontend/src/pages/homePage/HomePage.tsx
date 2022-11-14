import GetStarted from "../authentication/GetStarted";

const HomePage: React.FC = () => {
    const style = { padding: "8px" };
    return (
        <div style={style}>
            <h1>React TS Home</h1>
            <p>Welcome to the homepage</p>
            <GetStarted />
        </div>
    );
}

export default HomePage;