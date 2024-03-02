import React, { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState('bar');

  const handleChartChange = (chartType) => {
    setSelectedChart(chartType);
  };
  return (
    <div className='dash-container'>
      <h1 className='title-container'>Data Visualization Dashboard</h1>
      <div className='option-container'>
        <select  value={selectedChart} onChange={(e) => handleChartChange(e.target.value)}>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
      </div>
      {selectedChart === 'bar' && <BarChart />}
      {selectedChart === 'pie' && <PieChart />}
      {selectedChart === 'line' && <LineChart />}
      {selectedChart === 'doughnut' && <DoughnutChart />}
    </div>
  );
};

export default Dashboard;
