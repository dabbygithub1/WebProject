import { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="settings-section">
      <h2>Настройки</h2>
      <div className="settings-content">
        <div className="notifications-section">
          <h3>Уведомления</h3>
          <p className="section-description">
            Настройте как вы хотите получать уведомления
          </p>

          <div className="notification-options">
            <div className="notification-option">
              <div className="option-info">
                <h4>Email уведомления</h4>
                <p>Получать уведомления на email</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notification-option">
              <div className="option-info">
                <h4>Браузерные уведомления</h4>
                <p>Получать уведомления в браузере</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.browser}
                  onChange={() => handleNotificationChange('browser')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;