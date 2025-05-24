// C:/ProjectWeb/calcora/src/pages/CalculatorPage/CalculatorPage.jsx

import React from 'react';
import SalaryCalculator from '../../components/Calculator/SalaryCalculator';
import Header from 'C:/SiteProject/calcora/src/components/Header/Header';
import Footer from 'C:/SiteProject/calcora/src/components/Footer/Footer';
import './CalculatorPage.css';

const CalculatorPage = () => {
   return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <SalaryCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
