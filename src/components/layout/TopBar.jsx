import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar as MuiAvatar, Box, Badge, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useNotifications } from '../../contexts/NotificationContext'; // Import notification hook
import Avatar from 'react-nice-avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const NotificationTypeIcon = ({ type }) => {
    switch(type) {
        case 'error': return <ErrorIcon color="error" sx={{mr: 1}} />;
        case 'warning': return <WarningIcon color="warning" sx={{mr: 1}} />;
        default: return <CheckCircleIcon color="info" sx={{mr: 1}} />;
    }
};

const TopBar = () => {
    const { userData } = useUser();
    const { notifications, unreadCount } = useNotifications();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.paper' }}
        >
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: '900', color: 'primary.main' }}>
                    TaskFlow
                </Typography>

                {/* --- NOTIFICATION BUTTON AND DROPDOWN --- */}
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon sx={{ color: 'black' }} />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{ mt: '45px', '& .MuiMenu-list': { maxHeight: 400 } }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <MenuItem key={notif.id} onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <NotificationTypeIcon type={notif.type} />
                                </ListItemIcon>
                                <ListItemText primary={notif.message} />
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem onClick={handleMenuClose}>No new notifications</MenuItem>
                    )}
                </Menu>
                
                <IconButton component={Link} to="/profile" sx={{ p: 0, ml: 2 }}>
                    {userData?.avatarConfig ? (
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                            <Avatar style={{ width: 40, height: 40 }} {...userData.avatarConfig} />
                        </Box>
                    ) : (
                        <MuiAvatar alt={userData?.displayName || 'User'}>{userData?.displayName?.charAt(0).toUpperCase()}</MuiAvatar>
                    )}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;