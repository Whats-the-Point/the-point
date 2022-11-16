import React from 'react';
import google_icon from '../../assets/Google_icon.svg';
import "./googleButton.css";
import IconButton from './IconButton';

interface Props {
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const GoogleButton: React.FC<Props> = ({ onClick }) => {
    return (
        <>
            <IconButton onClick={onClick} className={'google_button'} icon={google_icon}>
                Sign in with Google
            </IconButton>
        </>
    );
};

export default GoogleButton;