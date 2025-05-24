import React, { useState } from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import './SickLeaveCalculator.css';

const SickLeaveCalculator = () => {
  const [workExperience, setWorkExperience] = useState('6');
  const [sickLeaveType, setSickLeaveType] = useState('common');
  const [childDisabled, setChildDisabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Helper function to return correct word form based on number
  const getYearText = (years) => {
    if (years === 1) return 'год';
    if (years >= 2 && years <= 4) return 'года';
    return 'лет';
  };

  // Render different sick leave information based on selected type
  const renderSickLeaveInfo = () => {
    switch (sickLeaveType) {
      case 'child-care':
        return (
          <>
            <li className="sick-leave-item">Уход за ребенком до 14 лет - до 14 дней</li>
            {childDisabled && (
              <li className="sick-leave-item">Ребенок-инвалид - 100%, до 120 дней в год</li>
            )}
          </>
        );
      case 'work-injury':
        return (
          <li className="sick-leave-item">Производственная травма - 100% независимо от стажа</li>
        );
      case 'common':
      default:
        return (
          <>
            <li className="sick-leave-item">Стаж &lt; 5 лет — выплата 60%</li>
            <li className="sick-leave-item">Стаж 5–8 лет — 80%</li>
            <li className="sick-leave-item">Стаж &gt; 8 лет — 100%</li>
          </>
        );
    }
  };

  return (
    <div className="sick-leave-calculator">
      <div className="experience-slider">
        <div className="slider-header">
          <label className="slider-label">
            Стаж работы: 
            <span className="experience-value">{workExperience} {getYearText(parseInt(workExperience))}</span>
          </label>
          <div className="tooltip-container">
            <button 
              className="help-button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle size={16} />
            </button>
            {showTooltip && (
              <div className="tooltip">
                Стаж работы влияет на размер выплаты при больничном
              </div>
            )}
          </div>
        </div>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            className="slider"
          />
          <div className="slider-marks">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
          </div>
        </div>
      </div>

      <div className="sick-leave-types">
        <label className="types-label">Тип больничного:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="common"
              checked={sickLeaveType === 'common'}
              onChange={() => setSickLeaveType('common')}
              className="radio-input"
            />
            <span className="radio-text">Общее заболевание</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              value="work-injury"
              checked={sickLeaveType === 'work-injury'}
              onChange={() => setSickLeaveType('work-injury')}
              className="radio-input"
            />
            <span className="radio-text">Производственная травма</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              value="child-care"
              checked={sickLeaveType === 'child-care'}
              onChange={() => setSickLeaveType('child-care')}
              className="radio-input"
            />
            <span className="radio-text">Уход за ребенком</span>
          </label>
        </div>
      </div>

      {sickLeaveType === 'child-care' && (
        <div className="child-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={childDisabled}
              onChange={(e) => setChildDisabled(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-text">Ребенок с инвалидностью</span>
          </label>
        </div>
      )}

      <div className="info-card">
        <div className="info-header">
          <AlertCircle size={18} />
          <h4 className="info-title">Информация о больничном в РБ:</h4>
        </div>
        <ul className="info-list">
          <li className="sick-leave-item">Первые 6 дней - 80% от средней зарплаты</li>
          <li className="sick-leave-item">С 7-го дня - 100%</li>
          {renderSickLeaveInfo()}
        </ul>
      </div>
    </div>
  );
};

export default SickLeaveCalculator;