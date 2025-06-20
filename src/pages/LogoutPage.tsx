import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';
import { Box, CircularProgress, Typography } from '@mui/material';

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout
    dispatch(logout());
    
    // Redirect after a short delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '50vh'
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">Logging out...</Typography>
    </Box>
  );
};

export default LogoutPage;