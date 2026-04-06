import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary-800)', margin: 0, fontSize: '1.75rem' }}>SRE Portal</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem', fontSize: '0.875rem' }}>Kurumsal LDAP Girişi (Mock)</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>Kurumsal Kullanıcı Adı</label>
            <input 
              required
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="admin veya user"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>Parola</label>
            <input 
              required
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Kullanıcı adı ile aynı (admin/user)"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              marginTop: '0.5rem',
              padding: '0.875rem', 
              backgroundColor: 'var(--color-primary-600)', 
              color: 'white', 
              border: 'none', 
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Kurumsal Giriş
          </button>
        </form>

        <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'center', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <strong>Test Hesapları:</strong><br />
          Admin Yetkisi için: <br/>Kullanıcı Adı: <code>admin</code> Şifre: <code>admin</code><br /><br />
          Read-Only Yetki için: <br/>Kullanıcı Adı: <code>user</code> Şifre: <code>user</code>
        </div>
      </div>
    </div>
  );
};

export default Login;
