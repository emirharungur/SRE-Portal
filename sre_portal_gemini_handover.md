# SRE Portal: Teknik Mimari ve Proje Özeti (AI Handover Belgesi)

Bu belge, Vite + React altyapısıyla sıfırdan geliştirilen **SRE Portal** uygulamasının mimari dinamiklerini, mevcut durumunu ve veri akışını barındırmaktadır. Bu belgeyi asistanınıza (Gemini vb.) promp olarak sunarak projenin neresinde olduğunuzu anında kavratabilirsiniz.

## 1. Teknoloji Yığını ve Kütüphaneler
- **Çatı (Framework):** React (Vite üzerinden derlenir)
- **Stil (Styling):** Vanilla CSS ve Global CSS Variables (Kurumsal tema: Mavi renk uzayı ve Inter fontu). TailwindCSS kapalıdır, saf CSS ile yapılmıştır.
- **Yönlendirme:** `react-router-dom` (SPA yapısı)
- **İkonlar:** `lucide-react`
- **Grafikler:** `recharts` (Dashboard'daki Pasta/Pie Chartlar)
- **Bildirimler:** `react-hot-toast` (Ekranın sağ alt köşesindeki SRE uyarı pop-upları)
- **Tarih İşleme:** `date-fns` (Zaman aralığı filtrelemeleri için)

## 2. Global State ve Kimlik Doğrulama Katmanları (Context API)
Projede şu an Backend bulunmadığından her şey React Context'leri üzerinde "Mock" (Sahte) olarak yönetilmektedir:

### a) `AuthContext.jsx` (Sahte LDAP Simülasyonu)
- Kullanıcıların sisteme girmesi için kurgulanmıştır. LocalStorage kullanılarak oturum tarayıcıda tutulur.
- **Admin Hesabı:** username: `admin`, şifre: `admin` (SRE yetkilerine sahiptir, her talebi görür, sistem uyarılarını canlı olarak alır).
- **Read-Only Personel Hesabı:** username: `user`, şifre: `user` (Sadece yetkisi olan/kendisinin açtığı talepleri görür).

### b) `DataProvider.jsx` (Veri Merkezi)
- Uygulamanın çalışması için gerekli sahte veriler (`mockData.js`) uygulama başlarken bu Context içerisine yüklenir.
- RBAC (Role-Based Access Control) filtrelemesi burada yapılır. `useAuth` içerisindeki mevcut role göre `reports` ve `requests` objeleri bileşenlere akıtılır.
- Yeni bir talep açıldığında `addRequest()` fonksiyonu tetiklenir, `admin` iseniz size hemen toast bildirimi düşer.

## 3. Sayfalar ve Bileşenler (Pages & Components)
*   **`App.jsx`:** Tüm uygulamanın root katmanı. Oturum yoksa sadece `<Login />` döndürür, oturum varsa `Sidebar` ve uygulama içi yolları (Routes) gösterir.
*   **`components/Sidebar.jsx`:** Sol menü. Alt kısımda aktif olan oturumun ismini/departmanını ve çıkış butonunu barındırır.
*   **`pages/Dashboard.jsx`:** En çok analiz edilen ve iyileştirilen servislerin (`recharts` ile) gösterildiği, üst bilgi stat (sayıcı) kartlarının olduğu ekran. Kartlara tıklandığında detay listesi Modal içinde açılır.
*   **`pages/Reports.jsx` & `pages/Requests.jsx`:** Olayların ve taleplerin listelendiği gelişmiş tablolar. 
    - **Filtreleme:** Zaman Aralığı (Son 5 dk, Son 1 saat vb.) ile dinamik filtreleme yaparken, aynı anda her tablo kolonunun altındaki inputlar ile text (string) kelime filtresi yapılabilir.
    - Satırlara tıklandığında `<Modal>` tetiklenir ve `ReportDetail` veya `RequestDetail` bileşeni ekrana basılır.
*   **`pages/CreateRequest.jsx`:** Sidebar'dan "Talep Oluştur" dendiğinde açılır. Login olan kişinin yetkilerini (isim, departman) Context'ten alarak read-only inputlara koyar. Form kaydedildiğinde veri `DataProvider`'a akıtılır.

## 4. Sayfalar Arası İlişki (Deep Linking)
- `SRE Raporları` üzerinden herhangi bir rapora tıkladığınızda açılan pencerede "İlişkili Talep: REQ-X Görüntüle" linki vardır. 
- Bu link sizi `react-router-dom` aracılığıyla `/?id=REQ-X` şeklinde request listesine atar.
- Yönlenen sayfa adres çubuğundaki parametreyi yakalar ve o Modal'ı tetikler.

## 5. Gelecek Planı (Geliştirmeye Buradan Devam Edilecek)
İş bilgisayarına bu repoyu indirdiğinizde yapılacak sıradaki (Back-end) entegrasyonları şunlardır:
1. `mockData.js` tamamen devreden çıkartılacak.
2. Taleplerin çekilmesi listelenmesi ve güncellenmesi için **Remedy API** bağlanacak.
3. Raporların verileri için **Azure DevOps API** üzerinden çekim yapılacak.
4. Yeni girilen manuel SRE olayları / talep formları doğrudan kurulacak bir kurum içi veritabanı (Database) sistemine insert edilecek.

**Gemini'ye Not:** Tüm UI (Kullanıcı Arayüzü), Component, ve Context altyapısı production seviyesinde stabil olarak inşa edilmiştir. Değişim yaparken kütüphanelerin uyumluluğuna ve saf CSS mimarisini bozmamaya özen gösterin.
