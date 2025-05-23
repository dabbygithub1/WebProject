import { useRef, useState, useEffect } from 'react';
import './Features.css';

const Features = () => {
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

  const features = [
    {
      icon: '/assets/images/zamochek.svg',
      title: 'Безопасно',
      description: 'Ваши данные надежно зашифрованы и недоступны третьим лицам'
    },
    {
      icon: '/assets/images/chemodan2.svg',
      title: 'Много профессий',
      description: 'Поддержка различных сфер деятельности и типов занятости'
    },
    {
      icon: '/assets/images/history.svg',
      title: 'История расчётов',
      description: 'Сохранение всех ваших расчетов с возможностью просмотра'
    },
    {
      icon: '/assets/images/nastroek.svg',
      title: 'Настройка',
      description: 'Персонализация настроек калькулятора'
    }
  ];

  return (
    <section className="features" ref={sectionRef}>
      <div className="features-container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-item ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="feature-icon">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;