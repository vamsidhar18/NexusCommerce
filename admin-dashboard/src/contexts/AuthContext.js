import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // For demo purposes, we'll simulate a valid admin user
      const mockUser = {
        id: '1',
        username: 'admin',
        email: 'admin@ecommerce.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      };
      setUser(mockUser);
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    try {
      // Demo mode - accepts multiple demo credentials
      const validCredentials = [
        { user: 'admin', pass: 'admin123', role: 'ADMIN' },
        { user: 'demo', pass: 'demo123', role: 'ADMIN' },
        { user: 'guest', pass: 'guest123', role: 'ADMIN' }
      ];
      
      const validLogin = validCredentials.find(cred => 
        credentials.identifier === cred.user && credentials.password === cred.pass
      );
      
      if (validLogin) {
        const mockToken = 'demo-jwt-token-' + Date.now();
        const mockUser = {
          id: '1',
          username: validLogin.user,
          email: `${validLogin.user}@nexuscommerce.demo`,
          firstName: validLogin.user.charAt(0).toUpperCase() + validLogin.user.slice(1),
          lastName: 'User',
          role: validLogin.role
        };
        
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setUser(mockUser);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid credentials. Try: admin/admin123, demo/demo123, or guest/guest123' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};