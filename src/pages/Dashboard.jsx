import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useSreData } from '../context/DataProvider';
import Modal from '../components/Modal';
import RequestDetail from '../components/RequestDetail';
import ReportDetail from '../components/ReportDetail';
import { format } from 'date-fns';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = () => {
  const { reports, requests, analyzedServicesData, improvedServicesData } = useSreData();
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [listModalConfig, setListModalConfig] = useState({ title: '', type: '', data: [] });
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const resolvedReports = reports.filter(r => r.status === 'Resolved');
  const openRequests = requests.filter(r => r.status === 'Open');

  const handleStatClick = (type) => {
    let title, data;
    if (type === 'allReports') {
      title = 'Tüm Olay Raporları';
      data = reports.map(r => ({ ...r, type: 'report' }));
    } else if (type === 'resolvedReports') {
      title = 'Çözülen Raporlar';
      data = resolvedReports.map(r => ({ ...r, type: 'report' }));
    } else if (type === 'openRequests') {
      title = 'Açık Analiz Talepleri';
      data = openRequests.map(r => ({ ...r, type: 'request' }));
    }
    
    setListModalConfig({ title, type, data });
    setIsListModalOpen(true);
  };

  const handleItemClick = (item) => {
    setSelectedDetail(item);
    setIsDetailModalOpen(true);
  };

  const formatDate = (isoString) => {
    try {
      return format(new Date(isoString), 'yyyy-MM-dd HH:mm');
    } catch {
      return isoString;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Halkbank SRE Portal - Güncel Sistem Durumu ve Tıklamalar</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card stat-card" onClick={() => handleStatClick('allReports')} style={{ cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Toplam Olay Raporu</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary-700)' }}>{reports.length}</div>
        </div>
        <div className="card stat-card" onClick={() => handleStatClick('resolvedReports')} style={{ cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Çözülen Raporlar</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-success)' }}>{resolvedReports.length}</div>
        </div>
        <div className="card stat-card" onClick={() => handleStatClick('openRequests')} style={{ cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Açık Analiz Talepleri</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-warning)' }}>{openRequests.length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary-800)', fontSize: '1.25rem' }}>En Çok Analiz Edilen Hizmetler</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%', height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analyzedServicesData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {analyzedServicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '50%' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {analyzedServicesData.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length], marginRight: '0.5rem' }}></span>
                    <span style={{ fontWeight: 500, width: '120px' }}>{item.name}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>%{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary-800)', fontSize: '1.25rem' }}>En Çok İyileştirilen Hizmetler</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
             <div style={{ width: '50%', height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={improvedServicesData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {improvedServicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '50%' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {improvedServicesData.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length], marginRight: '0.5rem' }}></span>
                    <span style={{ fontWeight: 500, width: '120px' }}>{item.name}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>%{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)} title={listModalConfig.title}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Takip Konusu</th>
                <th>Tarih</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {listModalConfig.data.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>Kayıt bulunamadı.</td></tr>
              )}
              {listModalConfig.data.map(item => (
                <tr key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 500, color: 'var(--color-primary-600)' }}>{item.id}</td>
                  <td>{item.title || item.subject}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Detayları görmek için listedeki bir elemana tıklayın.</p>
        </div>
      </Modal>

      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title={`Detay: ${selectedDetail?.id}`}>
        {selectedDetail?.type === 'request' ? (
          <RequestDetail detail={selectedDetail} />
        ) : (
          <ReportDetail detail={selectedDetail} />
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button 
            onClick={() => setIsDetailModalOpen(false)}
            style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-primary-600)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)' }}
          >
            Kapat
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
