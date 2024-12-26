import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 
// Add this near the top of your file, after the imports
axios.defaults.withCredentials = true;
// Create context
export const AuthContext = createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/verify');
        if (response.data.success) {
          setIsLoggedIn(true);
          setUserRole(response.data.user.role);
          setUserEmail(response.data.user.email);
          console.log(response.data.user.email);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserEmail(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/login', credentials);
      setIsLoggedIn(true);
      setUserRole(response.data.user.role);
      setUserEmail(response.data.user.email);
      console.log(response.data.user.email);
      console.log(response.data.user.role);
      alert('Logged in successfully');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      setIsLoggedIn(false);
      setUserRole(null);
      alert('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
      throw error;
    }
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userRole,
    userEmail,
    logout,
    login,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};