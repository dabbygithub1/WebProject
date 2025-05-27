import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ContactsPage.css';

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <Header />
      <main className="contacts-main">
        <h1 className="contacts-title">Контакты</h1>
        <p className="contacts-subtitle">
          Мы всегда готовы помочь вам с расчетом зарплаты и ответить на любые вопросы 
          о нашем сервисе
        </p>

        <div className="contact-info">
          <h2 className="info-title">Наши контакты</h2>
          <div className="info-list">
            <div className="info-item">
              <div className="info-icon">
                <img src="/assets/images/email.svg" alt="" />
              </div>
              <div className="info-content">
                <div className="info-label">Email для связи</div>
                <div className="info-value">
                    vladpashkevich88@gmail.com
                </div>
                <p className="info-description">
                  Напишите нам на email для получения подробной консультации по работе 
                  сервиса или по вопросам сотрудничества. Мы отвечаем в течение 24 часов 
                  в рабочие дни.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <img src="/assets/images/phone.svg" alt="" />
              </div>
              <div className="info-content">
                <div className="info-label">Телефон</div>
                <div className="info-value">
                  +375 (29) 237-19-27
                </div>
                <p className="info-description">
                  Позвоните нам для быстрой консультации по работе калькулятора или 
                  если у вас возникли сложности с расчетами. Мы на связи с 9:00 до 
                  18:00 по будним дням.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <img src="/assets/icons/infoshapka.svg" alt="" />
              </div>
              <div className="info-content">
                <div className="info-label">Время работы</div>
                <div className="info-value">Пн-Пт: 9:00 - 18:00</div>
                <p className="info-description">
                  В это время наши специалисты готовы оказать вам максимально 
                  оперативную поддержку по всем вопросам использования сервиса.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactsPage;