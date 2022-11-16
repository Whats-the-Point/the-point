import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    className: string;
    children: string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    animateWidth?: string;
}

const IconButton: React.FC<Props> = ({ animateWidth, icon, className, onClick, children }) => {
    return (
        animateWidth ?
            <motion.div transition={{ duration: 0.1 }} animate={{ width: animateWidth }} className={className} onClick={onClick}>
                <img src={icon} alt="Whats the point" />
                {children}
            </motion.div>
            :
            <div className={className} onClick={onClick}>
                <img src={icon} alt="Whats the point" />
                {children}
            </div>
    )
};

export default IconButton;