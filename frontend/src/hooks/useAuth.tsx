import { useState, useEffect } from 'react';
import apolloClient from '../lib/apollo-client';
import { AuthService } from '../services/auth.service';
import { User } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);

    if (AuthService.isAuthenticated()) {
      try {
        const currentUser = await AuthService.getCurrentUser(apolloClient);
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear it
          AuthService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (_token: string) => {
    try {
      const currentUser = await AuthService.getCurrentUser(apolloClient);
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      AuthService.logout();
    }
    return false;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  };
};
