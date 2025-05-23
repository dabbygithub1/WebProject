import { useEffect } from 'react';
import Header from 'C:/SiteProject/calcora/src/components/Header/Header';
import Hero from 'C:/SiteProject/calcora/src/components/Hero/Hero';
import HowItWorks from 'C:/SiteProject/calcora/src/components/HowItWorks/HowItWorks';
import Features from 'C:/SiteProject/calcora/src/components/Features/Features';
import CallToAction from 'C:/SiteProject/calcora/src/components/CallToAction/CallToAction';
import Footer from 'C:/SiteProject/calcora/src/components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  useEffect(() => {

    document.title = 'Calcora - Умный расчёт зарплаты';
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;