import React from 'react';
import "./button.css";

interface Props {
    children: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    secondary?: boolean;
}

const Button: React.FC<Props> = ({ onClick, children, secondary }) => {
    return (
        <button className={`${secondary ? "secondary" : ""}`} type="button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;