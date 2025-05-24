import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './TaxBreakdown.css';

const TaxBreakdown = ({ taxData }) => {
  const data = [
    { name: 'Чистая зарплата', value: taxData.netSalary, color: '#4F46E5' },
    { name: 'Подоходный налог (13%)', value: taxData.incomeTax, color: '#EF4444' },
    { name: 'Взнос в ФСЗН (1%)', value: taxData.socialSecurity, color: '#10B981' },
  ];

  if (taxData.unionDues && taxData.unionDues > 0) {
    data.push({ name: 'Профсоюзные взносы (1%)', value: taxData.unionDues, color: '#F59E0B' });
  }

  const totalGross = taxData.netSalary + taxData.incomeTax + taxData.socialSecurity + (taxData.unionDues || 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-name">{payload[0].name}</p>
          <p className="tooltip-value">{payload[0].value.toLocaleString()} BYN</p>
          <p className="tooltip-percent">
            {((payload[0].value / totalGross) * 100).toFixed(1)}% от брутто
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tax-breakdown">
      <h3 className="breakdown-title">Структура зарплаты и налогов</h3>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1000}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke={entry.color} 
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="legend-grid">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="color-marker" 
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="legend-info">
              <div className="legend-name">{item.name}</div>
              <div className="legend-value">{item.value.toLocaleString()} BYN</div>
              <div className="legend-percent">{((item.value / totalGross) * 100).toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="employer-section">
        <h4 className="employer-title">Отчисления работодателя:</h4>
        <div className="employer-item">
          <div className="color-marker" style={{ backgroundColor: '#7C3AED' }}></div>
          <div className="legend-info">
            <div className="legend-name">ФСЗН (34%) + Белгосстрах (0.6%)</div>
            <div className="legend-value">{taxData.employerContributions.toLocaleString()} BYN</div>
            <div className="legend-percent">{((taxData.employerContributions / totalGross) * 100).toFixed(1)}% от брутто</div>
          </div>
        </div>
        <p className="employer-note">
          Эти суммы оплачивает работодатель сверх вашей зарплаты и не влияют на размер выплаты.
        </p>
      </div>
    </div>
  );
};

export default TaxBreakdown;