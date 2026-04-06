import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Requests from './pages/Requests';
import CreateRequest from './pages/CreateRequest';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <>
        <Login />
        <Toaster />
      </>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
