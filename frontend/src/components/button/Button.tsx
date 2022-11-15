import React from 'react';
import "./button.css";

interface Props {
    children: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    secondary?: boolean;
    extraClass?: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
}

const Button: React.FC<Props> = ({ extraClass, type, disabled, onClick, children, secondary }) => {
    return (
        <button type={type ? type : "button"} disabled={disabled ? true : false} className={`${extraClass} ${secondary ? "secondary" : ""}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;