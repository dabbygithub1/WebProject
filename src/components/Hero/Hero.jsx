import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title">
            Умный расчёт зарплаты<br />и больничных
          </h1>
          <p className="hero-subtitle">Быстро. Точно. Для всех профессий</p>
          <a href="/calculator" className="hero-cta">
            Начать расчёт
          </a>
        </div>

        <div className={`hero-illustration ${isVisible ? 'visible' : ''}`}>
          <div className="calculator-mockup">
            <div className="calculator-icon">
              <img className="calculimage" alt="" src="/assets/images/calculator.svg"/>
            </div>
            <div className="dollar-icon">
              <div className="dollar-circle">
                <span>$</span>
              </div>
            </div>
            <div className="mockup-line line1"></div>
            <div className="mockup-line line2"></div>
            <div className="mockup-line line3"></div>
            <div className="mockup-box box-danger"></div>
            <div className="mockup-box box-success"></div>
          </div>

          <div className="bg-circle bg-circle-purple"></div>
          <div className="bg-circle bg-circle-teal"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;