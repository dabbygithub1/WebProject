import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'C:/SiteProject/calcora/src/components/Header/Header';
import Footer from 'C:/SiteProject/calcora/src/components/Footer/Footer';
import './ProfessionsPage.css';

const professions = [
  {
    id: 1,
    title: 'Разработчик программного обеспечения',
    salary: '1500 - 8000 BYN',
    description: 'Разработка и поддержка программных решений для бизнеса и пользователей',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 2,
    title: 'Специалист по данным',
    salary: '1800 - 9000 BYN',
    description: 'Анализ больших данных и создание моделей машинного обучения',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 3,
    title: 'Врач',
    salary: '1500 - 5000 BYN',
    description: 'Лечение пациентов и поддержание их здоровья',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 4,
    title: 'Учитель',
    salary: '1000 - 3500 BYN',
    description: 'Обучение и развитие учеников в образовательных учреждениях',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 5,
    title: 'Бухгалтер',
    salary: '1200 - 5000 BYN',
    description: 'Ведение финансовой отчетности и бухгалтерский учет',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 6,
    title: 'Юрист',
    salary: '1500 - 6000 BYN',
    description: 'Юридическое сопровождение и правовая защита интересов клиента',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 7,
    title: 'Дизайнер',
    salary: '1200 - 6000 BYN',
    description: 'Создание визуальных концепций и дизайн-решений',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 8,
    title: 'Продакт-менеджер',
    salary: '2000 - 7000 BYN',
    description: 'Управление продуктом на всех этапах его жизненного цикла',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 9,
    title: 'Медсестра/Медбрат',
    salary: '1000 - 2500 BYN',
    description: 'Уход за пациентами и содействие в лечебном процессе',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 10,
    title: 'HR-специалист',
    salary: '1200 - 7000 BYN',
    description: 'Управление персоналом и кадровое делопроизводство',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 11,
    title: 'Маркетолог',
    salary: '1500 - 5000 BYN',
    description: 'Продвижение товаров и услуг на рынке',
    icon: '/assets/icons/chemodanprofessions.svg'
  },
  {
    id: 12,
    title: 'Системный администратор',
    salary: '1500 - 8000 BYN',
    description: 'Обеспечение работоспособности IT-инфраструктуры',
    icon: '/assets/icons/chemodanprofessions.svg'
  }
];

const ProfessionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const navigate = useNavigate();
  
  const filteredProfessions = professions.filter(profession => 
    profession.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuggestProfession = () => {

    console.log('Suggesting new profession');
  };

  return (
    <div className="professions-page">
      <Header />
      <main className="professions-main">
        <h1 className="professions-title">Профессии и расчеты</h1>
        <p className="professions-subtitle">
          Выберите свою профессию для точного расчета зарплаты с учетом специфики вашей отрасли
        </p>

        <div className="search-section">
          <div className="search-container">
            <img src="/assets/icons/lupaprofessions.svg" alt="" className="search-icon" />
            <input
              type="text"
              placeholder="Поиск профессии..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-select">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-input"
            >
              <option value="Все категории">Все категории</option>
              <option value="IT">IT</option>
              <option value="Медицина">Медицина</option>
              <option value="Образование">Образование</option>
            </select>
            <img src="/assets/icons/vnizprofessions.svg" alt="" className="select-icon" />
          </div>
        </div>

        <div className="professions-grid">
          {filteredProfessions.map(profession => (
            <div key={profession.id} className="profession-card">
              <div className="profession-icon">
                <img src={profession.icon} alt="" />
              </div>
              <h3 className="profession-title">{profession.title}</h3>
              <p className="profession-salary">{profession.salary}</p>
              <p className="profession-description">{profession.description}</p>
              <Link to="/calculator" className="calculate-link-styled">
                Рассчитать зарплату
                <img 
                  src="/assets/icons/strelkaprofessions.svg" 
                  alt="->" 
                  className="calculate-link-arrow" 
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="suggest-section">
          <h2 className="suggest-title">Не нашли свою профессию?</h2>
          <p className="suggest-description">
            Мы постоянно расширяем наш каталог профессий. Напишите нам, и мы добавим вашу
            профессию в ближайшее время.
          </p>
          <button className="suggest-button" onClick={handleSuggestProfession}>
            Предложить профессию
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionsPage;