import { useState } from 'react';

const PersonalData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Алексей Петров',
    profession: 'Программист',
    email: 'alexey@example.com',
    phone: '+375 29 123 45 67',
    location: 'Минск'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    
  };

  return (
    <div className="personal-data">
      <div className="section-header">
        <h2>Личные данные</h2>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEdit}>
            Редактировать
          </button>
        ) : (
          <button className="save-button" onClick={handleSave}>
            Сохранить
          </button>
        )}
      </div>

      <div className="user-info">
        <div className="user-avatar">
          <div className="avatar-placeholder">
            {userData.name.charAt(0)}
          </div>
        </div>
        
        <div className="user-details">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Имя</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Профессия</label>
                <input
                  type="text"
                  value={userData.profession}
                  onChange={(e) => setUserData({ ...userData, profession: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Местоположение</label>
                <input
                  type="text"
                  value={userData.location}
                  onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <>
              <h3 className="user-name">{userData.name}</h3>
              <p className="user-profession">{userData.profession}</p>
              <div className="user-contact-info">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{userData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Телефон:</span>
                  <span className="info-value">{userData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Местоположение:</span>
                  <span className="info-value">{userData.location}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalData;