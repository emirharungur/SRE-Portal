import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load user from localStorage for persistence during refreshes
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sre_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const MOCK_USERS = {
    'admin': { username: 'admin', name: 'SRE Admin', department: 'SRE', role: 'admin' },
    'user': { username: 'user', name: 'Ahmet Yılmaz', department: 'Dijital Kanallar', role: 'read-only' },
  };

  const login = (username, password) => {
    // Mock LDAP verification
    if (MOCK_USERS[username] && password === username) {
      const u = MOCK_USERS[username];
      setCurrentUser(u);
      localStorage.setItem('sre_auth', JSON.stringify(u));
      toast.success(`Hoş geldiniz, ${u.name}!`);
      return true;
    } else {
      toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sre_auth');
    toast('Çıkış yapıldı.', { icon: '👋' });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
