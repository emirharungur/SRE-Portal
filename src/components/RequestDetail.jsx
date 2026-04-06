import React from 'react';

const RequestDetail = ({ detail }) => {
  if (!detail) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{detail.subject || detail.title}</h3>
        <span className={`status-badge ${detail.status.toLowerCase().replace(' ', '-')}`}>{detail.status}</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Talep Sahibi:</strong>
          <span>{detail.user || 'Belirtilmedi'}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Departman:</strong>
          <span>{detail.department || 'Belirtilmedi'}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Atanan Kişi / Ekip:</strong>
          <span>{detail.assignee || 'Belirtilmedi'}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Talep Oluşturulma Tarihi:</strong>
          <span>{detail.date}</span>
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Analiz İstenilen Hizmet:</strong>
          <span style={{ fontWeight: 600 }}>{detail.service || 'Belirtilmedi'}</span>
        </div>
      </div>

      <div style={{ marginTop: '1rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-primary-800)' }}>Talep Açıklaması:</strong>
        <p style={{ lineHeight: 1.6 }}>{detail.description}</p>
      </div>
    </div>
  );
};

export default RequestDetail;
