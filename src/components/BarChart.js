import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Chart as ChartJS } from 'chart.js/auto';

const detailsStyles = {
  border: '1px black dotted',
  backgroundColor: 'rgb(102, 0, 153)',
  boxShadow: '5px 5px 5px purple',
  borderRadius: 5,
};

let display;

const BarChart = ({ oppData }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (oppData === null || oppData.length === 0) {
    display = <p style={{ textAlign: 'center' }}>There is no data</p>;
  } else {
    const sortedData = oppData.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
    const factorValue = sortedData.map(factor => factor.weight.value);
    const barData = {
      labels: sortedData.map(factor => factor.name),
      datasets: [
        {
          data: factorValue,
        },
      ],
    };

    const barOptions = {
      backgroundColor: function (context) {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return value > 0 ? 'rgb(1,255,0)' : 'rgb(255,0,0)';
      },
      scales: {
        y: {
          max: 3,
          min: -3,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    display = <Bar data={barData} options={barOptions} />;
  }

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      {display}
      <FormGroup>
        <FormControlLabel control={<Switch onClick={handleToggle} />} label={`${showDetails ? 'Hide Details' : 'Show Details'}`} />
      </FormGroup>
      {oppData && showDetails && (
        <div style={detailsStyles}>
          <ul>
            {oppData.map((opp, index) => (
              <li key={`opportunity-msg: ${opp.oppId}-${index}`}>
                <strong style={{ color: opp.weight.value > 0 ? 'rgb(1,255,0)' : 'rgb(255,0,0)' }}>{opp.name}:</strong>
                <span style={{ color: 'white' }}> {opp.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BarChart;
