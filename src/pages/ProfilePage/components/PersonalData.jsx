import { useState, useEffect } from 'react';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '../../../firebase';

const NOT_SPECIFIED_TEXT = 'Не указан';

const initializeProfileState = (data) => {
  return {
    uid: (data && typeof data.uid === 'string') ? data.uid : null,
    name: (data && typeof data.name === 'string') ? data.name : '', 
    email: (data && typeof data.email === 'string') ? data.email : '', 
    profession: (data && typeof data.profession === 'string') ? data.profession : '',
    phone: (data && typeof data.phone === 'string') ? data.phone : '',
    location: (data && typeof data.location === 'string') ? data.location : '',
  };
};

const PersonalData = ({ initialData, onProfileUpdate }) => { 
  
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState(() => initializeProfileState(initialData));
  const [originalUserData, setOriginalUserData] = useState(() => initializeProfileState(initialData));
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (initialData && typeof initialData === 'object') { 
      const newInitialState = initializeProfileState(initialData);

      if (!isEditing) {
        if (JSON.stringify(newInitialState) !== JSON.stringify(userData)) {
          setUserData(newInitialState);
        }

        if (JSON.stringify(newInitialState) !== JSON.stringify(originalUserData)) {

          setOriginalUserData(newInitialState);
        }
      }
    }
  }, [initialData, isEditing]); 

  const handleEdit = () => {

    setOriginalUserData({...userData}); 
    setIsEditing(true);

  };

  const handleSave = async () => {
    
    if (!userData || !userData.uid) {
      console.error("PersonalData (handleSave): Невозможно сохранить, отсутствует UID пользователя в userData.");
      setErrors({ form: "Ошибка: информация о пользователе не найдена для сохранения."});
      return;
    }

    const dataToUpdateInFirestore = {
      name: userData.name.trim(),
      profession: userData.profession.trim(),
      phone: userData.phone.trim(),
      location: userData.location.trim(),
      updatedAt: Timestamp.fromDate(new Date())
    };

    try {
      const userDocRef = doc(db, "users", userData.uid);
      await updateDoc(userDocRef, dataToUpdateInFirestore);
      console.log("PersonalData (handleSave): Данные успешно обновлены в Firestore.");

      const fullUpdatedUser = {
        ...userData, 
        ...dataToUpdateInFirestore 
      };
      
      localStorage.setItem('user', JSON.stringify(fullUpdatedUser));
      console.log("PersonalData (handleSave): localStorage обновлен:", fullUpdatedUser);
      
      setUserData(fullUpdatedUser); 
      setOriginalUserData(fullUpdatedUser); 

      if (onProfileUpdate) { 
        onProfileUpdate(fullUpdatedUser);
      }

      setIsEditing(false);
      setErrors({}); 
    } catch (error) {
      console.error("PersonalData (handleSave): Ошибка при обновлении данных в Firestore:", error);
      setErrors({ form: "Ошибка сохранения данных в базу."});
    }
  };

  const handleCancel = () => { setUserData({...originalUserData}); setIsEditing(false); setErrors({});};
  const handleChange = (e) => { const { name, value } = e.target; setUserData(prev => ({ ...prev, [name]: value }));};
  const displayValue = (value) => { return (value && typeof value === 'string' && value.trim() !== '') ? value : NOT_SPECIFIED_TEXT;};
  
  if (!initialData || !userData) { 
      return <p style={{ textAlign: 'center', padding: '20px' }}>Загрузка данных...</p>;
  }

  return (
    <div className="personal-data">
      {

      }
      <div className="section-header">
        <h2>Личные данные</h2>
        {!isEditing ? ( <button className="edit-button" onClick={handleEdit}>Редактировать</button>) 
        : ( <div className="edit-actions"><button className="cancel-button" onClick={handleCancel}>Отменить</button><button className="save-button" onClick={handleSave}>Сохранить</button></div>)}
      </div>
      {errors.form && <p className="error-message" style={{textAlign: 'center', color: 'red'}}>{errors.form}</p>} {/* Отображение ошибок */}

      {isEditing ? (
        <div className="edit-form">
          {}
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} placeholder="Введите ваше имя"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} placeholder="Введите ваш email" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="profession">Профессия</label>
            <input type="text" id="profession" name="profession" value={userData.profession} onChange={handleChange} placeholder="Укажите профессию"/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input type="tel" id="phone" name="phone" value={userData.phone} onChange={handleChange} placeholder="Укажите телефон"/>
          </div>
          <div className="form-group">
            <label htmlFor="location">Местоположение</label>
            <input type="text" id="location" name="location" value={userData.location} onChange={handleChange} placeholder="Укажите местоположение"/>
          </div>
        </div>
      ) : (
        <div className="user-info">
            {

            }
            <div className="user-avatar"><div className="avatar-placeholder"><img src="/assets/icons/chelovechekprofile.svg" alt="User avatar" className="avatar-icon" /></div></div>
          <div className="user-details-main">
            <h3 className="user-name">{displayValue(userData.name)}</h3>
            <p className="user-profession">{displayValue(userData.profession)}</p>
            <div className="user-contact-grid">
              <div className="info-item"><div className="info-icon-wrapper"><img className="info-icon" src="/assets/icons/emailprofile.svg" alt="Email icon" /></div><div className="info-text-content"><span className="info-label">Email</span><span className="info-value">{displayValue(userData.email)}</span></div></div>
              <div className="info-item"><div className="info-icon-wrapper"><img className="info-icon" src="/assets/icons/phoneprofile.svg" alt="Phone icon" /></div><div className="info-text-content"><span className="info-label">Телефон</span><span className="info-value">{displayValue(userData.phone)}</span></div></div>
              <div className="info-item"><div className="info-icon-wrapper"><img className="info-icon" src="/assets/icons/chemodanprofile.svg" alt="Profession icon" /></div><div className="info-text-content"><span className="info-label">Профессия</span><span className="info-value">{displayValue(userData.profession)}</span></div></div>
              <div className="info-item"><div className="info-icon-wrapper"><img className="info-icon" src="/assets/icons/geoprofile.svg" alt="Location icon" /></div><div className="info-text-content"><span className="info-label">Местоположение</span><span className="info-value">{displayValue(userData.location)}</span></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalData;