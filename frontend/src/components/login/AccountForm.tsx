'use client';

import React, { useState } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { LoginForm, RegisterForm } from './';
import { useAuth } from '../../hooks/useAuth';

export default function AccountForm() {
  const [tabValue, setTabValue] = useState(0);
  const { user, isAuthenticated, login } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAuthSuccess = async (token: string) => {
    const success = await login(token);
    if (success) {
      console.log('Authentication successful!');
    }
  };

  if (isAuthenticated && user) {
    window.location.reload();
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        {tabValue === 0 && <LoginForm onSuccess={handleAuthSuccess} />}

        {tabValue === 1 && <RegisterForm onSuccess={handleAuthSuccess} />}
      </Box>
    </Container>
  );
}
