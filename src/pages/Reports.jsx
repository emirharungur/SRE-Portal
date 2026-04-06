import React, { useState } from 'react';
import { useSreData } from '../context/DataProvider';
import Modal from '../components/Modal';
import ReportDetail from '../components/ReportDetail';
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

const Reports = () => {
  const { reports } = useSreData();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timeRange, setTimeRange] = useState('all');
  const [filters, setFilters] = useState({ id: '', title: '', status: '', impact: '', date: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
  };

  const filteredReports = reports.filter(r => {
    // Time filter
    if (timeRange !== 'all') {
      const ms = getRangeMs(timeRange);
      if (Date.now() - new Date(r.date).getTime() > ms) return false;
    }

    // Column text filters
    if (filters.id && !r.id.toLowerCase().includes(filters.id)) return false;
    if (filters.title && !r.title.toLowerCase().includes(filters.title)) return false;
    if (filters.status && !r.status.toLowerCase().includes(filters.status)) return false;
    if (filters.impact && !r.impact?.toLowerCase().includes(filters.impact)) return false;
    
    return true;
  });

  const handleRowClick = (report) => {
    setSelectedReport(report);
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
          <h1>SRE Raporları</h1>
          <p>Dijital bankacılık sistemlerinde yaşanılan olayların SRE detay analizleri.</p>
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
                <div style={{ marginBottom: '0.5rem' }}>Tanım</div>
                <input name="title" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Tarih</div>
                {/* Date text filter not strictly needed if we have Time Range, but user asked for "Her bir kolona göre" */}
                <input disabled placeholder="Zaman aralığını kullanın" style={{ width: '100%', padding: '0.25rem', backgroundColor: '#e2e8f0' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Etki</div>
                <input name="impact" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
              <th>
                <div style={{ marginBottom: '0.5rem' }}>Durum</div>
                <input name="status" onChange={handleFilterChange} placeholder="Filtrele..." style={{ width: '100%', padding: '0.25rem' }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id} onClick={() => handleRowClick(report)} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 500, color: 'var(--color-primary-600)' }}>{report.id}</td>
                <td>{report.title}</td>
                <td>{formatDate(report.date)}</td>
                <td>
                  <span className={`impact-badge ${report.impact.toLowerCase()}`}>
                    {report.impact}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${report.status.toLowerCase().replace(' ', '-')}`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>Bu filtrelere uygun rapor bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
        <p style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Ayrıntıları, kök nedenleri ve ilişkili talepleri görmek için bir rapora tıklayın.</p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Rapor Detayı: ${selectedReport?.id}`}>
        <ReportDetail detail={selectedReport} />
      </Modal>
    </div>
  );
};

export default Reports;
