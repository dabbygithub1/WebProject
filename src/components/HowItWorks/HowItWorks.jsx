import { useRef, useState, useEffect } from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      icon: '/assets/images/chelovechki.svg',
      title: 'Зарегистрируйся',
      description: 'Создайте личный кабинет для сохранения ваших расчетов'
    },
    {
      icon: '/assets/images/chemodan.svg',
      title: 'Выбери профессию',
      description: 'Укажите вашу сферу деятельности для точного расчета'
    },
    {
      icon: '/assets/images/listik.svg',
      title: 'Укажи дни и доход',
      description: 'Введите информацию о рабочих днях и больничных'
    },
    {
      icon: '/assets/images/raschet.svg',
      title: 'Получи расчёт',
      description: 'Получите детальный расчет с учетом всех нюансов'
    }
  ];

  return (
    <section className="how-it-works" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Как это работает</h2>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="step-icon">
                <img src={step.icon} alt={step.title} />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;