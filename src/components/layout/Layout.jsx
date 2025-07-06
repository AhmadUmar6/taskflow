import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          pt: '80px', // Increased padding top for better spacing
          pb: '72px', // Increased padding bottom for better spacing
          display: 'flex',
        }}
      >
        <Outlet />
      </Box>
      <BottomNav />
    </Box>
  );
};

export default Layout;