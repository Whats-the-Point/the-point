import React from 'react';
import google_icon from '../../assets/Google_icon.svg';
import "./googleButton.css";

interface Props {
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const GoogleButton: React.FC<Props> = ({ onClick }) => {
    return (
        <div className='google_button' onClick={onClick}>
           <img src={google_icon} alt="Whats the point" /> 
            Sign in with Google
        </div>
    );
};

export default GoogleButton;