import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HubIcon from '@mui/icons-material/Hub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event, newValue) => {
        navigate(newValue);
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
            <BottomNavigation value={location.pathname} onChange={handleChange}>
                <BottomNavigationAction label="Tasks" value="/" icon={<ListAltIcon />} />
                <BottomNavigationAction label="Obsidian" value="/graph" icon={<HubIcon />} />
                <BottomNavigationAction label="Profile" value="/profile" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;