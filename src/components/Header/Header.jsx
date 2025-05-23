import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <a href="/" className="header-logo">Calcora</a>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Открыть меню">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="/" className="nav-item nav-item-active">
            <span>Главная</span>
          </a>
          <a href="/calculator" className="nav-item">
            <img className="calcshapkaicon" alt="" src="/assets/icons/calculatorshapka.svg" />
            <span>Калькулятор</span>
          </a>
          <a href="/professions" className="nav-item">
            <img className="profshapkaicon" alt="" src="/assets/icons/chemodanshapka.svg" />
            <span>Профессии</span>
          </a>
          <a href="/contacts" className="nav-item">
            <img className="kontshapkaicon" alt="" src="/assets/icons/phoneshapka.svg" />
            <span>Контакты</span>
          </a>
          <a href="/about" className="nav-item">
            <img className="infoshapkaicon" alt="" src="/assets/icons/infoshapka.svg" />
            <span>О нас</span>
          </a>
        </div>

        <div className="header-auth">
          <a href="/login" className="login-button">Войти</a>
          <a href="/register" className="register-button">Зарегистрироваться</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;