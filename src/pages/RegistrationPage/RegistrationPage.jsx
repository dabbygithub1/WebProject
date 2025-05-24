import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Header from 'C:/ProjectWeb/calcora/src/components/Header/Header';
import Footer from 'C:/ProjectWeb/calcora/src/components/Footer/Footer';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
      hasNumber: /\d/.test(password)
    };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    const passwordRequirements = validatePassword(formData.password);
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (!passwordRequirements.minLength || !passwordRequirements.hasCase || !passwordRequirements.hasNumber) {
      newErrors.password = 'Пароль не соответствует требованиям';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необходимо согласие с условиями';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Пользователь зарегистрирован:", user);
      navigate('/dashboard'); // перенаправление после регистрации
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
      setErrors(prev => ({ ...prev, firebase: error.message }));
    }
  };

  const passwordRequirements = validatePassword(formData.password);

  return (
    <div className="registration-page">
      <Header />
      <main className="registration-container">
        <div className="registration-form-wrapper">
          <h1 className="registration-title">Создать аккаунт</h1>
          <p className="registration-subtitle">
            Уже есть аккаунт? <Link to="/login" className="login-link">Войдите</Link>
          </p>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

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
              <div className="password-requirements">
                <div className={`requirement ${passwordRequirements.minLength ? 'met' : ''}`}>
                  Минимум 8 символов
                </div>
                <div className={`requirement ${passwordRequirements.hasCase ? 'met' : ''}`}>
                  Строчные и прописные буквы
                </div>
                <div className={`requirement ${passwordRequirements.hasNumber ? 'met' : ''}`}>
                  Минимум 1 цифра
                </div>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Подтверждение пароля</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src="/assets/icons/glazok.svg"
                    alt={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  />
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span className="checkbox-text">
                  Я соглашаюсь с <Link to="/terms" className="terms-link">правилами пользования</Link> и{' '}
                  <Link to="/privacy" className="terms-link">политикой конфиденциальности</Link>
                </span>
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>

            {errors.firebase && <div className="error-message">{errors.firebase}</div>}

            <button type="submit" className="register-button">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
