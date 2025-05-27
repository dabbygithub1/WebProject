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
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const loadUserFromStorage = () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return null;
    }
    try {
      const userDataFromStorage = JSON.parse(userString);
      console.log("ProfilePage (loadUserFromStorage): Данные из localStorage:", userDataFromStorage);
      return {
        uid: userDataFromStorage.uid,
        name: userDataFromStorage.name || '',
        email: userDataFromStorage.email || '',
        profession: userDataFromStorage.profession || '',
        phone: userDataFromStorage.phone || '',
        location: userDataFromStorage.location || '',
      };
    } catch (error) {
      console.error("ProfilePage: Failed to parse user data from localStorage", error);
      localStorage.removeItem('user');
      navigate('/login');
      return null; 
    }
  };
  
  useEffect(() => {
    const loadedUser = loadUserFromStorage();
    if (loadedUser) {
        setCurrentUser(loadedUser);
    }

  }, []); 

  const handleProfileUpdate = (updatedUserData) => {
    console.log("ProfilePage (handleProfileUpdate): Получены обновленные данные:", updatedUserData);
    setCurrentUser(updatedUserData); 
  };


  const renderContent = () => {
    if (!currentUser && activeTab === 'personal') {
      return <p style={{ textAlign: 'center', padding: '20px' }}>Загрузка данных профиля...</p>;
    }
    switch (activeTab) {
      case 'personal':
        return <PersonalData initialData={currentUser} onProfileUpdate={handleProfileUpdate} />;
      case 'security':
        return <Security />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <PersonalData initialData={currentUser} onProfileUpdate={handleProfileUpdate} />;
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