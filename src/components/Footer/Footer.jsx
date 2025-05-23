import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-company">
            <h3 className="footer-title">Calcora</h3>
            <p className="footer-description">
              Современный сервис для расчёта зарплаты с учетом 
              больничных и других факторов.
            </p>
          </div>
          
          <div className="footer-contacts">
            <h3 className="footer-title">Контакты</h3>
            <ul className="contacts-list">
              <li>
                <a href="mailto:vladpashkevich88@gmail.com" className="contact-link">
                  <img className="pochtaicon9" alt="" src="/assets/images/email.svg" />
                  <span>vladpashkevich88@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+375292371927" className="contact-link">
                  <img className="telicon9" alt="" src="/assets/images/phone.svg" />
                  <span>+375 (29) 237-19-27</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 Calcora. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;