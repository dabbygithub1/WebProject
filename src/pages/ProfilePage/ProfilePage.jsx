import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PersonalData from './components/PersonalData';
import Security from './components/Security';
import History from './components/History';
import Settings from './components/Settings';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalData />;
      case 'security':
        return <Security />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <PersonalData />;
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-main">
        <div className="profile-container">
          <h1 className="profile-title">Личный кабинет</h1>
          <p className="profile-subtitle">Управляйте своим профилем и настройками</p>
          
          <div className="profile-content">
            <div className="profile-tabs">
              <button 
                className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                Личные данные
              </button>
              <button 
                className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                Безопасность
              </button>
              <button 
                className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                История расчётов
              </button>
              <button 
                className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Настройки
              </button>
            </div>
            
            <div className="profile-tab-content">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;