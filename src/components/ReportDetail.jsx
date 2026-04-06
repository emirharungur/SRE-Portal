import React from 'react';
import { Link } from 'react-router-dom';

const ALL_MONITORING_TOOLS = ['Dynatrace', 'AppDynamics', 'Elastic', 'BMC Helix', 'Zabbix', 'Grafana Dashboards'];

const ReportDetail = ({ detail }) => {
  if (!detail) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{detail.title}</h3>
        <span className={`status-badge ${detail.status.toLowerCase().replace(' ', '-')}`}>{detail.status}</span>
        <span className={`impact-badge ${detail.impact?.toLowerCase()}`} style={{ marginLeft: '1rem' }}>Etki: {detail.impact}</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Sorunun Zaman Aralığı:</strong>
          <span>{detail.timeFrame || detail.date}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Sorun Konusu:</strong>
          <span>{detail.subject || detail.title}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>SRE Ekip Üyeleri:</strong>
          <span>{detail.sreMembers || 'Belirtilmedi'}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>İlişkili Talep:</strong>
          {detail.relatedRequestId ? (
            <Link to={`/requests?id=${detail.relatedRequestId}`} style={{ display: 'inline-flex', alignItems: 'center', fontWeight: '600' }}>
              {detail.relatedRequestId} Görüntüle ➜
            </Link>
          ) : (
            <span>Yok</span>
          )}
        </div>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>İzleme Ürünleri:</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {ALL_MONITORING_TOOLS.map(tool => {
            const isSelected = detail.monitoringTools?.includes(tool);
            return (
              <span key={tool} style={{ 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.75rem',
                borderRadius: '4px',
                border: isSelected ? '1px solid var(--color-primary-500)' : '1px solid var(--color-border)',
                backgroundColor: isSelected ? 'var(--color-primary-50)' : 'transparent',
                color: isSelected ? 'var(--color-primary-700)' : '#cbd5e1'
              }}>
                {isSelected ? '✓ ' : ''}{tool}
              </span>
            )
          })}
        </div>
      </div>

      <div style={{ marginTop: '1rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-primary-800)' }}>Yakalanan Bulgular:</strong>
        <p style={{ lineHeight: 1.6 }}>{detail.findings || 'Bulgu belirtilmemiş.'}</p>
      </div>

      <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-error)', marginBottom: '1rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#991b1b' }}>Sorunun Kök Nedeni (Root Cause):</strong>
        <p style={{ lineHeight: 1.6, color: '#7f1d1d' }}>{detail.rootCause || 'Belirtilmemiş.'}</p>
      </div>

      <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-success)' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#166534' }}>Alınan Aksiyonlar:</strong>
        <p style={{ lineHeight: 1.6, color: '#14532d' }}>{detail.actionsTaken || 'Alınan aksiyon belirtilmemiş.'}</p>
      </div>
    </div>
  );
};

export default ReportDetail;
