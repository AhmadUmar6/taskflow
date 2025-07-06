import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { Container, Box, Typography, TextField, Button, Alert, Divider, Link, Paper, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

// Add these imports at the top
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError("Failed to log in. Please check your email and password.");
            console.error(err);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user document already exists
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Create user document in Firestore if it's a new user
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    avatarConfig: { // A default avatar
                        sex: 'man',
                        faceColor: '#AC6651',
                        earSize: 'small',
                        hairStyle: 'mohawk',
                        hatStyle: 'none',
                        eyeStyle: 'oval',
                        glassesStyle: 'none',
                        noseStyle: 'short',
                        mouthStyle: 'smile',
                        shirtStyle: 'short',
                        shirtColor: '#77311D',
                        bgColor: 'linear-gradient(45deg, #d6b379 0%, #bf6e4e 100%)',
                    }
                });
            }
            navigate('/');
        } catch (err) {
            setError("Failed to sign in with Google.");
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
                        Welcome Back!
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    
                    <Box component="form" onSubmit={handleEmailLogin} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                            autoComplete="current-password"
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
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                        </Button>
                        <Divider sx={{ my: 2 }}>OR</Divider>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            Sign In with Google
                        </Button>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Link component={RouterLink} to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;