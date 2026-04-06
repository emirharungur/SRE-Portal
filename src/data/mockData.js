export const analyzedServicesData = [
  { name: 'ANKA', value: 45 },
  { name: 'Banksoft', value: 30 },
  { name: 'Mobil Şube', value: 65 },
  { name: 'Internet Şube', value: 20 },
];

export const improvedServicesData = [
  { name: 'ANKA', value: 15 },
  { name: 'Banksoft', value: 10 },
  { name: 'Mobil Şube', value: 40 },
  { name: 'Internet Şube', value: 10 },
];

export const generateMockData = () => {
  const now = Date.now();
  const mins = (m) => m * 60 * 1000;
  const hours = (h) => h * 60 * 60 * 1000;
  const days = (d) => d * 24 * 60 * 60 * 1000;

  const mockRequests = [
    { 
      id: 'REQ-201', 
      user: 'Ahmet Yılmaz', 
      department: 'Dijital Kanallar', 
      subject: 'Ana sayfa yüklenme süresi optimizasyonu', 
      date: new Date(now - mins(10)).toISOString(), // 10 mins ago
      status: 'Open',
      service: 'Internet Şube',
      assignee: 'SRE Frontend Ekibi',
      description: 'Internet şube ilk açılışta 3.2 saniye sürüyor. Bundle analizinin yapılıp lazy load optimizasyonu talep ediliyor.'
    },
    { 
      id: 'REQ-202', 
      user: 'Ayşe Kaya', 
      department: 'Altyapı', 
      subject: 'Yeni sunucuların load balancer yapılandırması', 
      date: new Date(now - hours(2)).toISOString(), // 2 hours ago
      status: 'In Progress',
      service: 'ANKA',
      assignee: 'Mert Yılmaz',
      description: 'ANKA için eklenen 3 yeni nodun load balancer üzerine register edilip health-check ayarlarının SRE standartlarına çekilmesi.'
    },
    { 
      id: 'REQ-203', 
      user: 'Mehmet Demir', 
      department: 'Güvenlik', 
      subject: 'Mobil şube gateway hataları analizi', 
      date: new Date(now - days(2)).toISOString(), // 2 days ago
      status: 'Closed',
      service: 'Mobil Şube',
      assignee: 'Cemre S.',
      description: 'Mobil Şube gateway endpointlerinde artan 502 hatalarının root-cause seviyesinde incelenmesi talep ediliyor.'
    },
  ];

  const mockReports = [
    { 
      id: 'RPT-101', 
      title: 'Mobil Şube Giriş Gecikmesi', 
      date: new Date(now - mins(45)).toISOString(), // 45 mins ago
      status: 'Resolved', 
      impact: 'High', 
      service: 'Mobil Şube',
      creator: 'Sistem Uyarıları',
      timeFrame: '08:45 - 09:12',
      subject: 'Mobil Şube login aşamasında timeout ve bekleme',
      monitoringTools: ['Dynatrace', 'Elastic'],
      findings: 'Login servisine gelen anlık yük 3 katına çıktı. Cache sunucularından yanıt almak ortalama 4 saniyeye yükseldi.',
      rootCause: 'Database connection pool limitine ulaşıldı ve bekleyen istekler thread kuyruğunu doldurdu.',
      actionsTaken: 'Connection pool limiti geçici olarak artırıldı, timeout süreleri optimize edildi.',
      sreMembers: 'Burak O., Caner T.',
      relatedRequestId: 'REQ-203'
    },
    { 
      id: 'RPT-102', 
      title: 'FAST Transfer Servisi Kesintisi', 
      date: new Date(now - hours(4)).toISOString(), // 4 hours ago
      status: 'Investigating', 
      impact: 'Critical', 
      service: 'ANKA',
      creator: 'Sistem Uyarıları',
      timeFrame: '14:20 - Devam Ediyor',
      subject: 'FAST para gönderme işlemlerinin sıraya alınması',
      monitoringTools: ['AppDynamics', 'BMC Helix', 'Grafana Dashboards'],
      findings: 'TCMB gateway sunucularına TCP seviyesinde ping alınamıyor, kuyrukta bekleyen işlem sayısı 150.000\'i aştı.',
      rootCause: 'Harici kurum (TCMB) ağ geçidi kaynaklı gateway timeout.',
      actionsTaken: 'Retry mekanizmaları circuit-breaker ile kapatıldı. Trafik alternatif ağ geçitlerine yönlendirilmeye çalışılıyor.',
      sreMembers: 'Selin K., Mert Yılmaz',
      relatedRequestId: 'REQ-202'
    },
    { 
      id: 'RPT-103', 
      title: 'Kredi Kartı Ekstresi Görüntüleme Hatası', 
      date: new Date(now - days(5)).toISOString(), // 5 days ago
      status: 'Resolved', 
      impact: 'Medium', 
      service: 'Banksoft',
      creator: 'Müşteri Hizmetleri',
      timeFrame: '10:00 - 11:30',
      subject: 'Son döneme ait kredi kartı ekstrelerinin PDF oluşmaması',
      monitoringTools: ['Elastic', 'Zabbix'],
      findings: 'PDF generator worker uygulamasının memory limitine takılıp OOM (Out Of Memory) yediği saptandı.',
      rootCause: 'Önceki deploymentta unutulan memory leak barındıran PDF kütüphanesi.',
      actionsTaken: 'İlgili kütüphane bir önceki kararlı versiyona rollback yapıldı.',
      sreMembers: 'Kemal A.',
      relatedRequestId: null
    },
  ];

  return { mockRequests, mockReports };
};
