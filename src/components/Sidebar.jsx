import { NavLink } from 'react-router-dom';
import { Home, FileText, Activity, PlusCircle, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>SRE Portal</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 400, marginTop: '0.25rem', color: '#93c5fd' }}>
            {currentUser?.role === 'admin' ? 'Admin Arayüzü' : 'Kullanıcı Arayüzü'}
          </span>
        </h2>
      </div>
      <nav className="sidebar-nav" style={{ flex: 1 }}>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/reports" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FileText size={20} />
          <span>SRE Raporları</span>
        </NavLink>
        <NavLink to="/requests" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Activity size={20} />
          <span>Analiz Talepleri</span>
        </NavLink>
        <NavLink to="/create-request" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <PlusCircle size={20} />
          <span>Talep Oluştur</span>
        </NavLink>
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
           <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-primary-50)', borderRadius: '50%', color: 'var(--color-primary-600)' }}>
             <User size={20} />
           </div>
           <div>
             <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{currentUser?.name}</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{currentUser?.department}</div>
           </div>
         </div>
         <button 
           onClick={logout}
           className="nav-item" 
           style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef2f2', color: '#dc2626' }}>
            <LogOut size={16} />
            <span style={{ marginLeft: '0.5rem', fontWeight: 500 }}>Güvenli Çıkış</span>
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
