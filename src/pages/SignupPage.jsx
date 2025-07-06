import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Container, Box, Typography, TextField, Button, Alert, Link, Paper, CircularProgress } from '@mui/material';

// ...other imports
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { DEFAULT_AVATAR } from '../constants/avatars'; // Import the default avatar

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Firebase Auth profile
            await updateProfile(user, { displayName: name });

            // Use the imported constant for the user document
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: name,
                email: email,
                avatarConfig: DEFAULT_AVATAR // Use the static default avatar
            });

            navigate('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already in use.');
            } else {
                setError('Failed to create an account. Please try again.');
            }
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: '900', color: 'primary.main' }}>
                       TaskFlow
                    </Typography>
                     <Typography component="h2" variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                        Create your account
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    
                    <Box component="form" onSubmit={handleSignup} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Link component={RouterLink} to="/login" variant="body2">
                                {"Already have an account? Log In"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignupPage;