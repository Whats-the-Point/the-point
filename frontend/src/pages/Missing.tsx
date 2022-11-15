import { Link } from "react-router-dom"

const Missing = () => {
    const renewalToken = localStorage.getItem("renewalToken") || "";

    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
            { renewalToken !== ""
                ? <Link to="/profile">Go back to profile</Link>
                : <Link to="/">Visit Our Homepage</Link>
            }
            </div>
        </article>
    )
}

export default Missing