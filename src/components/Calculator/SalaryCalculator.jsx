import React, { useState } from 'react';
import { Calculator, ArrowRight, ChevronDown, ChevronUp, Info } from 'lucide-react';
import TaxBreakdown from './TaxBreakdown';
import SickLeaveCalculator from './SickLeaveCalculator';
import './SalaryCalculator.css';

const SalaryCalculator = () => {
  const [profession, setProfession] = useState('');
  const [grossSalary, setGrossSalary] = useState('');
  const [workDays, setWorkDays] = useState('22');
  const [sickDays, setSickDays] = useState('0');
  const [unionMember, setUnionMember] = useState(false);
  const [calculations, setCalculations] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const professions = [
    { id: 'software-dev', name: 'Разработчик программного обеспечения' },
    { id: 'teacher', name: 'Учитель' },
    { id: 'doctor', name: 'Врач' },
    { id: 'engineer', name: 'Инженер' },
    { id: 'accountant', name: 'Бухгалтер' },
    { id: 'designer', name: 'Дизайнер' },
    { id: 'manager', name: 'Менеджер' },
    { id: 'lawyer', name: 'Юрист' },
    { id: 'other', name: 'Другое' }
  ];

  const handleCalculation = () => {
    if (!grossSalary || !workDays) return;
    setIsCalculating(true);

    setTimeout(() => {
      const grossAmount = parseFloat(grossSalary);
      const sickDaysNum = parseInt(sickDays);
      const workDaysNum = parseInt(workDays);

      const incomeTax = grossAmount * 0.13;
      const socialSecurity = grossAmount * 0.01;
      const unionDues = unionMember ? grossAmount * 0.01 : 0;

      const totalDeductions = incomeTax + socialSecurity + unionDues;

      const employerFSZN = grossAmount * 0.34;
      const belgosstrakh = grossAmount * 0.006;

      const dailyRate = grossAmount / workDaysNum;
      let sickLeaveComp = 0;

      if (sickDaysNum > 0) {
        if (sickDaysNum <= 6) {
          sickLeaveComp = sickDaysNum * dailyRate * 0.8;
        } else {
          sickLeaveComp = (6 * dailyRate * 0.8) + ((sickDaysNum - 6) * dailyRate);
        }
      }

      const workingDaysComp = (workDaysNum - sickDaysNum) * dailyRate;
      const netSalary = grossAmount - totalDeductions;
      const totalComp = (workingDaysComp + sickLeaveComp) - (totalDeductions * (workingDaysComp / grossAmount));

      setCalculations({
        grossSalary: grossAmount,
        netSalary,
        incomeTax,
        socialSecurity,
        unionDues,
        employerFSZN,
        belgosstrakh,
        sickLeaveCompensation: sickLeaveComp,
        totalCompensation: totalComp
      });

      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="salary-calculator">
      <h1 className="calculator-title">
        Калькулятор зарплаты и налогов
      </h1>
      
      <div className="calculator-card">
        <div className="calculator-layout">
          <div className="form-section">
            <div className="form-fields">
              <div className="form-field">
                <label className="field-label">Профессия</label>
                <select 
                  className="select-field"
                  value={profession} 
                  onChange={(e) => setProfession(e.target.value)}
                >
                  <option value="">Выберите профессию</option>
                  {professions.map((prof) => (
                    <option key={prof.id} value={prof.id}>{prof.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="field-label">
                  Зарплата (брутто) BYN
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Например, 2000"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                />
              </div>

              <div className="field-grid">
                <div className="form-field">
                  <label className="field-label">Рабочих дней</label>
                  <input
                    type="number"
                    className="input-field"
                    value={workDays}
                    onChange={(e) => setWorkDays(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Дней на больничном</label>
                  <input
                    type="number"
                    className="input-field"
                    value={sickDays}
                    onChange={(e) => setSickDays(e.target.value)}
                  />
                </div>
              </div>

              <div className="checkbox-container">
                <input
                  id="union-member"
                  type="checkbox"
                  className="checkbox-field"
                  checked={unionMember}
                  onChange={(e) => setUnionMember(e.target.checked)}
                />
                <label htmlFor="union-member" className="checkbox-label">
                  Член профсоюза (1%)
                </label>
              </div>

              <button
                onClick={handleCalculation}
                disabled={isCalculating || !grossSalary}
                className={`calculate-button ${(isCalculating || !grossSalary) ? 'disabled' : ''}`}
              >
                {isCalculating ? (
                  <div className="loading-indicator">
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    <span>Расчет...</span>
                  </div>
                ) : (
                  <div className="button-content">
                    <Calculator className="button-icon" />
                    <span>Рассчитать</span>
                  </div>
                )}
              </button>

              <button
                className="advanced-button"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? 
                  <ChevronUp className="advanced-icon" /> : 
                  <ChevronDown className="advanced-icon" />
                }
                <span>
                  {showAdvanced ? 'Скрыть расширенные настройки' : 'Показать расширенные настройки'}
                </span>
              </button>

              {showAdvanced && (
                <div className="advanced-settings">
                  <h3 className="settings-title">Расширенные настройки</h3>
                  <SickLeaveCalculator />
                </div>
              )}
            </div>
          </div>

          <div className="results-section">
            {calculations ? (
              <div className="results-content">
                <div className="results-summary">
                  <h3 className="results-title">Результаты расчета</h3>
                  <div className="results-items">
                    <div className="result-item">
                      <span className="item-label">Брутто:</span>
                      <span className="item-value">{calculations.grossSalary.toLocaleString()} BYN</span>
                    </div>
                    <div className="result-item">
                      <span className="item-label">Нетто:</span>
                      <span className="item-value">{calculations.netSalary.toLocaleString()} BYN</span>
                    </div>
                    <div className="result-item">
                      <span className="item-label">Налог (13%):</span>
                      <span className="item-value">{calculations.incomeTax.toLocaleString()} BYN</span>
                    </div>
                    <div className="result-item">
                      <span className="item-label">ФСЗН (1%):</span>
                      <span className="item-value">{calculations.socialSecurity.toLocaleString()} BYN</span>
                    </div>
                    {unionMember && (
                      <div className="result-item">
                        <span className="item-label">Профсоюз (1%):</span>
                        <span className="item-value">{calculations.unionDues.toLocaleString()} BYN</span>
                      </div>
                    )}
                    <div className="result-item">
                      <span className="item-label">Работодатель ФСЗН (34%):</span>
                      <span className="item-value">{calculations.employerFSZN.toLocaleString()} BYN</span>
                    </div>
                    <div className="result-item">
                      <span className="item-label">Белгосстрах (0.6%):</span>
                      <span className="item-value">{calculations.belgosstrakh.toLocaleString()} BYN</span>
                    </div>
                    {parseInt(sickDays) > 0 && (
                      <div className="result-item">
                        <span className="item-label">Компенсация больничного:</span>
                        <span className="item-value">{calculations.sickLeaveCompensation.toLocaleString()} BYN</span>
                      </div>
                    )}
                    <div className="result-divider"></div>
                    <div className="result-total">
                      <span className="total-label">Итого к получению:</span>
                      <span className="total-value">{calculations.totalCompensation.toLocaleString()} BYN</span>
                    </div>
                  </div>
                </div>

                <TaxBreakdown
                  taxData={{
                    netSalary: calculations.netSalary,
                    incomeTax: calculations.incomeTax,
                    socialSecurity: calculations.socialSecurity,
                    unionDues: calculations.unionDues,
                    employerContributions: calculations.employerFSZN + calculations.belgosstrakh
                  }}
                />
              </div>
            ) : (
              <div className="placeholder-content">
                <Calculator className="placeholder-icon" />
                <p className="placeholder-title">Заполните данные слева и нажмите "Рассчитать"</p>
                <p className="placeholder-description">
                  Получите подробный расчет своей зарплаты с учетом налогов и отчислений
                </p>
                <div className="placeholder-arrow">
                  <ArrowRight className="arrow-icon" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="info-banner">
        <Info className="info-icon" />
        <p className="info-text">
          Данный калькулятор предоставляет приблизительные результаты на основе стандартных ставок налогов в Республике Беларусь.
          Для получения точных расчетов, учитывающих все индивидуальные особенности, обратитесь к профессиональному бухгалтеру или налоговому консультанту.
        </p>
      </div>
    </div>
  );
};

export default SalaryCalculator;