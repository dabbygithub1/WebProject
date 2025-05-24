import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // путь может отличаться, если firebase.js находится в src/
import Header from 'C:/ProjectWeb/calcora/src/components/Header/Header';
import Footer from 'C:/ProjectWeb/calcora/src/components/Footer/Footer';
import './AuthorizationPage.css';

const AuthorizationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log('Пользователь авторизован:', user);
      navigate('/professions'); // перенаправление на главную страницу или другой маршрут
    } catch (error) {
      console.error('Ошибка авторизации:', error.message);
      setErrors(prev => ({ ...prev, firebase: error.message }));
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
          
          <form onSubmit={handleSubmit} className="login-form">
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
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

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
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img 
                    src="/assets/icons/glazok.svg" 
                    alt={showPassword ? 'Скрыть пароль' : 'Показать пароль'} 
                  />
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

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
              <Link to="/forgot-password" className="forgot-password-link">
                Забыли пароль?
              </Link>
            </div>

            {errors.firebase && <div className="error-message">{errors.firebase}</div>}

            <button type="submit" className="login-button">
              Войти
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorizationPage;
