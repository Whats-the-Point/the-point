import React from 'react';
import plusIcon from '../../assets/plus_icon.svg';
import "./sideBarButton.css";
import IconButton from './IconButton';

interface Props {
    open: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    animateWidth?: string;
}

const SideBarButton: React.FC<Props> = ({ animateWidth, open, onClick }) => {
    return (
        <>
            <IconButton animateWidth={animateWidth} onClick={onClick} className={'sideBar-button'} icon={plusIcon}>
                {open ? "Add match" : ""}
            </IconButton>
        </>
    );
};

export default SideBarButton;