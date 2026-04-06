import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSreData } from '../context/DataProvider';
import { useAuth } from '../context/AuthContext';

const CreateRequest = () => {
  const { addRequest } = useSreData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    department: '',
    service: '',
    subject: '',
    description: ''
  });

  // Pre-fill user and department from current session
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        user: currentUser.name,
        department: currentUser.department
      }));
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest(formData);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    marginTop: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    fontWeight: '600',
    color: 'var(--color-primary-900)',
    display: 'block'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1>Yeni SRE Analiz Talebi Oluştur</h1>
        <p>Ekibinizle ilgili inceleme başlatmak için aşağıdaki formu doldurun.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Talep Sahibi</label>
              <input required name="user" value={formData.user} onChange={handleChange} style={{...inputStyle, backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)'}} readOnly title="Oturumunuzdan otomatik alındı" />
            </div>
            <div>
              <label style={labelStyle}>Departman</label>
              <input required name="department" value={formData.department} onChange={handleChange} style={{...inputStyle, backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)'}} readOnly title="Oturumunuzdan otomatik alındı" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Analiz İstenilen Hizmet</label>
              <select required name="service" value={formData.service} onChange={handleChange} style={inputStyle}>
                <option value="">Seçiniz</option>
                <option value="Mobil Şube">Mobil Şube</option>
                <option value="Internet Şube">Internet Şube</option>
                <option value="ANKA">ANKA</option>
                <option value="Banksoft">Banksoft</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Talep Konusu</label>
              <input required name="subject" value={formData.subject} onChange={handleChange} style={inputStyle} placeholder="Örn: Login gecikmesi analizi" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Talep Açıklaması</label>
            <textarea 
              required 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} 
              placeholder="Sorunu ve istenilen analizi detaylı bir şekilde açıklayın."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ 
              padding: '0.75rem 2rem', 
              backgroundColor: 'var(--color-primary-600)', 
              color: 'white', 
              border: 'none', 
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Kaydet ve İlet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
