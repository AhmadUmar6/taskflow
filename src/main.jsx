// In src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext'; 
import { NotificationProvider } from './contexts/NotificationContext'; // Import it


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <UserProvider> 
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);