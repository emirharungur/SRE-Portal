import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSreData } from '../context/DataProvider';
import Modal from '../components/Modal';
import RequestDetail from '../components/RequestDetail';
import { format } from 'date-fns';

const TIME_RANGES = {
  'all': 'Tümü',
  '5m': 'Son 5 Dakika',
  '15m': 'Son 15 Dakika',
  '1h': 'Son 1 Saat',
  '3h': 'Son 3 Saat',
  '6h': 'Son 6 Saat',
  '12h': 'Son 12 Saat',
  '1d': 'Son 1 Gün',
  '1w': 'Son 1 Hafta',
  '1M': 'Son 1 Ay',
  '1y': 'Son 1 Yıl',
};

const getRangeMs = (key) => {
  const m = 60 * 1000;
  const h = 60 * m;
  const d = 24 * h;
  const map = {
    '5m': 5 * m, '15m': 15 * m, '1h': 1 * h, '3h': 3 * h,
    '6h': 6 * h, '12h': 12 * h, '1d': 1 * d, '1w': 7 * d,
    '1M': 30 * d, '1y': 365 * d
  };
  return map[key] || 0;
};

const Requests = () => {
  const { requests } = useSreData();
  const [searchParams] = useSearchParams();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timeRange, setTimeRange] = useState('all');
  const [filters, setFilters] = useState({ id: '', user: '', department: '', subject: '', status: '' });

  useEffect(() => {
    const requestId = searchParams.get('id');
    if (requestId && requests.length > 0) {
      const foundRequest = requests.find(req => req.id === requestId);
      if (foundRequest) {
        setSelectedRequest(foundRequest);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, requests]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
  };

  const filteredRequests = requests.filter(req => {
    if (timeRange !== 'all') {
      const ms = getRangeMs(timeRange);
      if (Date.now() - new Date(req.date).getTime() > ms) return false;
    }

    if (filters.id && !req.id.toLowerCase().includes(filters.id)) return false;
    if (filters.user && !req.user.toLowerCase().includes(filters.user)) return false;
    if (filters.department && !req.department.toLowerCase().includes(filters.department)) return false;
    if (filters.subject && !req.subject.toLowerCase().includes(filters.subject)) return false;
    if (filters.status && !req.status.toLowerCase().includes(filters.status)) return false;
    
    return true;
  });

  const handleRowClick = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
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
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>SRE Analiz Talepleri</h1>
          <p>Ekipler tarafından oluşturulmuş SRE ekibi analiz ve operasyon talepleri.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>Zaman Aralığı</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', width: '200px' }}
          >
            {Object.entries(TIME_RANGES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>ID</div>
                <input name="id" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Kullanıcı</div>
                <input name="user" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Departman</div>
                <input name="department" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Konu</div>
                <input name="subject" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Tarih</div>
                <input disabled placeholder="Zaman aralığı seçin" style={{ width: '100%', padding: '0.25rem', backgroundColor: '#e2e8f0' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Durum</div>
                <input name="status" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => (
              <tr key={req.id} onClick={() => handleRowClick(req)} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 500, color: 'var(--color-primary-600)' }}>{req.id}</td>
                <td>{req.user}</td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{req.department}</td>
                <td>{req.subject}</td>
                <td>{formatDate(req.date)}</td>
                <td>
                  <span className={`status-badge ${req.status.toLowerCase().replace(' ', '-')}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>Bu filtrelere uygun talep bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
        <p style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Ayrıntıları ve talep detaylarını görmek için bir satıra tıklayın.</p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Talep Detayı: ${selectedRequest?.id}`}>
        <RequestDetail detail={selectedRequest} />
      </Modal>
    </div>
  );
};

export default Requests;
