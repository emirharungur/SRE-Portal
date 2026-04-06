import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockData, analyzedServicesData, improvedServicesData } from '../data/mockData';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [allReports, setAllReports] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    // Generate initial dynamic mock data
    const { mockRequests, mockReports } = generateMockData();
    setAllRequests(mockRequests);
    setAllReports(mockReports);
  }, []);

  const addRequest = (newRequest) => {
    const requestWithMeta = {
      ...newRequest,
      id: `REQ-${200 + allRequests.length + 1}`,
      date: new Date().toISOString(),
      status: 'Open',
      assignee: 'Atanmadı'
    };
    
    setAllRequests(prev => [requestWithMeta, ...prev]);

    // Admin bildirim yönetimi (Gerçek dünyada Websocket vb ile admin seanslarına gider. 
    // Mock'ta eğer ekleyen admin değilse, adminin görmesi için sahte log/toast kurgusu yapılır.
    // Ancak burada basitçe currentUser'un sadece ekleyen kişi olduğunu bildiğimiz için, 
    // eylemi yapan kişi admin ise görebilir. Normal userlar eklediğinde bu bildirimi göremez.)
    if (currentUser?.role === 'admin') {
      toast.success('Yeni bir SRE Analiz talebiniz mevcuttur', {
        position: 'bottom-right',
        duration: 5000,
        icon: '🚨'
      });
    } else {
      toast.success('Talebiniz SRE ekibine başarıyla iletildi.');
    }
  };

  // RBAC Filtering Logic (Data scoping based on Role)
  let visibleRequests = allRequests;
  let visibleReports = allReports;

  if (currentUser?.role === 'read-only') {
    visibleRequests = allRequests.filter(req => 
      req.user === currentUser.name || req.department === currentUser.department
    );
    // Genelde read-only kendi departmanı ile alakalı raporları göremeden kısıtlanabilir,
    // ancak istenende sadece analiz talepleri limitlenmişti. Biz genelde hepsine bir scoping uygulayabiliriz 
    // lakin biz logine sadık kalarak, admin her şeyi read_only ise limited requests'i görüyor diyoruz.
  }

  return (
    <DataContext.Provider value={{
      reports: visibleReports,
      requests: visibleRequests,
      addRequest,
      analyzedServicesData,
      improvedServicesData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSreData = () => useContext(DataContext);
