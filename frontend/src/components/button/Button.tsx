import React from 'react';
import "./button.css";
import { motion } from 'framer-motion';

interface Props {
    children: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    secondary?: boolean;
    extraClass?: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
    animateWidth?: string;
}

const Button: React.FC<Props> = ({ animateWidth, extraClass, type, disabled, onClick, children, secondary }) => {
    return (
        animateWidth ?
            <motion.button transition={{duration: 0.1}} animate={{width: animateWidth}} type={type ? type : "button"} disabled={disabled ? true : false} className={`${extraClass} ${secondary ? "secondary" : ""}`} onClick={onClick}>
                {children}
            </motion.button>
            :
            <button type={type ? type : "button"} disabled={disabled ? true : false} className={`${extraClass} ${secondary ? "secondary" : ""}`} onClick={onClick}>
                {children}
            </button>
    );
};

export default Button;