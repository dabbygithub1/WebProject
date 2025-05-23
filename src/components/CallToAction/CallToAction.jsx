import { useRef, useState, useEffect } from 'react';
import './CallToAction.css';

const CallToAction = () => {
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

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta-container">
        <div className={`cta-content ${isVisible ? 'visible' : ''}`}>
          <h2 className="cta-title">Готовы рассчитать вашу зарплату?</h2>
          <p className="cta-description">
            Получите точный расчет с учетом всех нюансов вашей профессии, включая 
            больничные и отпускные
          </p>
          <a href="/calculator" className="cta-button">
            Начать бесплатный расчет
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;