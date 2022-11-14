import { useState, useRef } from 'react';
import GoogleButton from 'react-google-button';
import axios from 'axios';

const GetStarted: React.FC = () => {
    const errRef = useRef<null | HTMLParagraphElement>(null);

    const [state, setState] = useState<string>('');
    const [authLink, setAuthLink] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSucess] = useState<boolean>(false);


    const loginwithGoogle = (event: React.MouseEvent<HTMLDivElement>) => {
        axios.get("/api/v1/auth/google/new").then((response) => {
            window.location.replace(response.data.url);
        });
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <GoogleButton onClick={loginwithGoogle}/>
        </section>
    );
}

export default GetStarted;