import { useState, useEffect } from 'react';
import apolloClient from '../lib/apollo-client';
import { UserService } from '../services/user.service';
import { User } from '../types/user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);

    if (UserService.isAuthenticated()) {
      try {
        const currentUser = await UserService.getCurrentUser(apolloClient);
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear it
          UserService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        UserService.logout();
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
      const currentUser = await UserService.getCurrentUser(apolloClient);
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      UserService.logout();
    }
    return false;
  };

  const logout = () => {
    UserService.logout();
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
