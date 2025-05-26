import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; 
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setIsLoggedIn(false); 
      setIsMobileMenuOpen(false);
      navigate('/'); 
      console.log("Пользователь вышел, localStorage очищен.");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "Главная", icon: null },
    { path: "/calculator", label: "Калькулятор", icon: "/assets/icons/calculatorshapka.svg", iconClass: "calcshapkaicon" },
    { path: "/professions", label: "Профессии", icon: "/assets/icons/chemodanshapka.svg", iconClass: "profshapkaicon" },
    { path: "/contacts", label: "Контакты", icon: "/assets/icons/phoneshapka.svg", iconClass: "kontshapkaicon" },
    { path: "/about", label: "О нас", icon: "/assets/icons/infoshapka.svg", iconClass: "infoshapkaicon" },
  ];

  return (
    <nav className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="header-logo">Calcora</Link>

        <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-expanded={isMobileMenuOpen} aria-label="Открыть меню">
          <span style={isMobileMenuOpen ? {transform: 'rotate(45deg) translate(5px, 5px)'} : {}}></span>
          <span style={isMobileMenuOpen ? {opacity: 0} : {}}></span>
          <span style={isMobileMenuOpen ? {transform: 'rotate(-45deg) translate(5px, -5px)'} : {}}></span>
        </button>

        <div className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-item ${location.pathname === link.path ? 'nav-item-active' : ''}`}
            >
              {link.icon && <img className={link.iconClass} alt="" src={link.icon} />}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="header-auth">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="login-button">Мой профиль</Link>
              <button onClick={handleLogout} className="register-button">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button">Войти</Link>
              <Link to="/register" className="register-button">Зарегистрироваться</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;