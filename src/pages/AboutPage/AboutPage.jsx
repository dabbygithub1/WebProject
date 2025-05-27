import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AboutPage.css';

const AboutPage = () => {
  const location = useLocation();
  
  useEffect(() => {
    document.title = 'О нас - Calcora';
  }, []);

  return (
    <div className="about-page">
      <Header />
      <main className="about-main">
        <section className="about-hero">
          <h1 className="about-title">О нас</h1>
          <p className="about-description">
            Calcora — это современный сервис для точного расчета заработной платы с учетом
            больничных и других факторов, созданный группой профессионалов в сфере финансов и
            разработки программного обеспечения.
          </p>
        </section>

        <section className="mission-section">
          <h2 className="section-title">Наша миссия</h2>
          <div className="mission-content">
            <p className="mission-text">
              Мы стремимся создать самый точный, удобный и доступный инструмент для расчета
              заработной платы, который поможет миллионам людей лучше понимать свои финансы и
              принимать более обоснованные финансовые решения.
            </p>
            <div className="mission-divider"></div>
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title">Наши ценности</h2>
          <div className="values-grid">
            {[
              {
                icon: '/assets/images/bezopasnostcontacts.svg',
                title: 'Безопасность',
                description: 'Мы гарантируем сохранность ваших данных и не передаем их третьим лицам.'
              },
              {
                icon: '/assets/images/tochnostcontacts.svg',
                title: 'Точность',
                description: 'Наши алгоритмы расчета постоянно обновляются в соответствии с изменениями в законодательстве.'
              },
              {
                icon: '/assets/images/technocontacts.svg',
                title: 'Технологичность',
                description: 'Мы используем современные технологии для обеспечения высокой производительности и удобства использования.'
              },
              {
                icon: '/assets/images/speedcontacts.svg',
                title: 'Скорость',
                description: 'Получайте результаты расчетов мгновенно, экономя свое время и силы.'
              },
              {
                icon: '/assets/images/dostupnostcontacts.svg',
                title: 'Доступность',
                description: 'Наш сервис разработан для пользователей любого уровня подготовки и профессиональной сферы.'
              },
              {
                icon: '/assets/images/supportcontacts.svg',
                title: 'Поддержка',
                description: 'Наша команда поддержки готова помочь вам с любыми вопросами по использованию сервиса.'
              }
            ].map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <img src={value.icon} alt={value.title} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">Готовы начать?</h2>
            <p className="cta-description">
              Присоединяйтесь к сотням тысяч пользователей, которые уже оценили
              преимущества Calcora
            </p>
            <Link to="/register" className="cta-button">
              Начать бесплатно
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;