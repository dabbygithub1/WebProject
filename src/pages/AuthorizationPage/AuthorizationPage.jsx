import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, Timestamp, setDoc } from "firebase/firestore"; 
import { auth, db } from '../../firebase';
import Header from 'C:/SiteProject/calcora/src/components/Header/Header';
import Footer from 'C:/SiteProject/calcora/src/components/Footer/Footer';
import './AuthorizationPage.css';

const AuthorizationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      navigate('/profile');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUser = userCredential.user; 
      console.log('Пользователь Firebase авторизован (AuthPage):', firebaseUser);

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userDocRef);

      let userProfileData = {};
      if (docSnap.exists()) {
        userProfileData = docSnap.data();
        console.log("Данные профиля загружены из Firestore (AuthPage):", userProfileData);
      } else {
        console.warn("Документ пользователя не найден в Firestore. Создание базового профиля.");
        userProfileData = {
          name: firebaseUser.displayName || formData.name || '',
          email: firebaseUser.email,
          profession: '', phone: '', location: '',
          createdAt: Timestamp.fromDate(new Date())
        };
        await setDoc(userDocRef, { ...userProfileData, uid: firebaseUser.uid }); 
      }

      const userToStore = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userProfileData.name || firebaseUser.displayName || '',
        profession: userProfileData.profession || '',
        phone: userProfileData.phone || '',
        location: userProfileData.location || '',
      };
      
      localStorage.setItem('user', JSON.stringify(userToStore));
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка авторизации:', error.code, error.message);
      let firebaseErrorMessage = 'Ошибка входа.';
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          firebaseErrorMessage = 'Неверный email или пароль.';
          break;
        case 'auth/invalid-email':
          firebaseErrorMessage = 'Неверный формат email.';
          break;
        case 'auth/user-disabled':
          firebaseErrorMessage = 'Аккаунт отключен.';
          break;
        default:
          firebaseErrorMessage = 'Произошла непредвиденная ошибка. Попробуйте снова.';
      }
      setErrors(prev => ({ ...prev, firebase: firebaseErrorMessage }));
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Войти в аккаунт</h1>
          <p className="login-subtitle">
            Нет аккаунта? <Link to="/register" className="register-link">Зарегистрируйтесь</Link>
          </p>
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            {/* Пароль */}
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.password ? 'error' : ''}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  <img src="/assets/icons/glazok.svg" alt="" />
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            {/* Запомнить меня и Забыли пароль */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkbox-text">Запомнить меня</span>
              </label>
              <Link to="/forgot-password" className="forgot-password-link">Забыли пароль?</Link>
            </div>
            {errors.firebase && (
              <div className="error-message" style={{ textAlign: 'center', color: '#ef4444' }}>
                {errors.firebase}
              </div>
            )}
            <button type="submit" className="login-button">Войти</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorizationPage;
