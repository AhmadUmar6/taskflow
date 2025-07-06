import React from 'react';
import { signOut, updateProfile, updatePassword } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../contexts/UserContext';
import {
    Container, Box, Typography, Button, Paper, Divider,
    List, ListItemButton, ListItemText, ListItemIcon, Modal, TextField,
    Snackbar, Alert, Grid, IconButton, Stack, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from 'react-nice-avatar';
import { AVATAR_OPTIONS } from '../constants/avatars'; // Import the STATIC list

const ProfilePage = () => {
    // State and context hooks
    const { userData, loading: userLoading } = useUser();
    const [loading, setLoading] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(null); // 'name', 'password', or 'avatar'
    const [newName, setNewName] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

    // Handlers
    const handleUpdateField = async (field, value, successMessage) => {
        setLoading(true);
        try {
            const userDocRef = doc(db, "users", userData.uid);
            await updateDoc(userDocRef, { [field]: value });
            if (field === 'displayName') {
                await updateProfile(auth.currentUser, { displayName: value });
            }
            setSnackbar({ open: true, message: successMessage, severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: `Failed to update ${field}.`, severity: 'error' });
        }
        setLoading(false);
        setOpenModal(null);
    };

    const handleUpdatePassword = async () => {
        if (newPassword.length < 6) {
            setSnackbar({ open: true, message: 'Password must be at least 6 characters.', severity: 'warning' });
            return;
        }
        setLoading(true);
        try {
            await updatePassword(auth.currentUser, newPassword);
            setSnackbar({ open: true, message: 'Password updated successfully!', severity: 'success' });
            setNewPassword('');
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to update password. Please log in again.', severity: 'error' });
        }
        setLoading(false);
        setOpenModal(null);
    };

    const modalStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 400 }, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 24, p: 4 };

    if (userLoading) {
        return <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', ml: '30px' }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ ml: '35px', mt: '20px' }}>
            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, width: '100%', borderRadius: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{ width: 120, height: 120, mb: 2, borderRadius: '50%', overflow: 'hidden', bgcolor: 'grey.200' }}>
                               {userData && <Avatar style={{ width: 120, height: 120 }} {...userData.avatarConfig} />}
                            </Box>
                            <IconButton onClick={() => setOpenModal('avatar')} size="small" sx={{ position: 'absolute', bottom: 10, right: -5, bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.200' } }}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{userData?.displayName}</Typography>
                        <Typography variant="body1" color="text.secondary">{userData?.email}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItemButton onClick={() => { setNewName(userData.displayName); setOpenModal('name'); }}><ListItemIcon><EditIcon /></ListItemIcon><ListItemText primary="Change Display Name" /></ListItemButton>
                        <ListItemButton onClick={() => setOpenModal('password')}><ListItemIcon><VpnKeyIcon /></ListItemIcon><ListItemText primary="Change Password" /></ListItemButton>
                    </List>
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Button variant="contained" color="error" onClick={() => signOut(auth)} startIcon={<LogoutIcon />}>Logout</Button>
                    </Box>
                </Paper>

                {/* Modals */}
                <Modal open={openModal === 'name'} onClose={() => setOpenModal(null)}>
                    <Box sx={modalStyle}><Typography variant="h6">Change Name</Typography><TextField margin="normal" fullWidth label="New Name" value={newName} onChange={(e) => setNewName(e.target.value)} /><Stack direction="row" spacing={2} sx={{ mt: 2 }}><Button onClick={() => handleUpdateField('displayName', newName, 'Name updated!')} variant="contained" disabled={loading}>{loading ? <CircularProgress size={24} /> : "Save"}</Button><Button onClick={() => setOpenModal(null)}>Cancel</Button></Stack></Box>
                </Modal>
                <Modal open={openModal === 'password'} onClose={() => setOpenModal(null)}>
                     <Box sx={modalStyle}><Typography variant="h6">Change Password</Typography><TextField margin="normal" fullWidth label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><Stack direction="row" spacing={2} sx={{ mt: 2 }}><Button onClick={handleUpdatePassword} variant="contained" disabled={loading}>{loading ? <CircularProgress size={24} /> : "Save"}</Button><Button onClick={() => setOpenModal(null)}>Cancel</Button></Stack></Box>
                </Modal>
                <Modal open={openModal === 'avatar'} onClose={() => setOpenModal(null)}>
                    <Box sx={{...modalStyle, width: {xs: '90%', sm: 600}, maxHeight: '80vh', overflowY: 'auto' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}><Typography variant="h6">Choose Avatar</Typography><IconButton onClick={() => setOpenModal(null)}><CloseIcon /></IconButton></Stack>
                        <Grid container spacing={1}>
                            {AVATAR_OPTIONS.map((config) => (<Grid item xs={4} sm={3} key={config.id} sx={{ display: 'flex', justifyContent: 'center' }}><IconButton onClick={() => handleUpdateField('avatarConfig', config, 'Avatar updated!')} sx={{ p: 0.5, borderRadius: '50%' }}><Avatar style={{ width: '5rem', height: '5rem' }} {...config} /></IconButton></Grid>))}
                        </Grid>
                    </Box>
                </Modal>
                <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert></Snackbar>
            </Container>
        </Box>
    );
};

export default ProfilePage;