import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Chart as ChartJS } from 'chart.js/auto';
import { Typography, Box } from '@mui/material';
import plugin from '../Utils/chartPlugin';
import classes from './Chart.module.css';

// Stylings for the details element
const detailsStyles = {
  border: '1px black dotted',
  backgroundColor: 'rgb(102, 0, 153)',
  boxShadow: '5px 5px 5px purple',
  borderRadius: 5,
};

let display;

const BarChart = ({ pilytixFactors }) => {
  // Setting toggle state
  const [showDetails, setShowDetails] = useState(false);

  // Validation handling if there is no data
  if (pilytixFactors === null || pilytixFactors.length === 0) {
    display = <Typography style={{ textAlign: 'center' }}>There is no data</Typography>;
  } else {
    // Sort by name
    const sortedData = pilytixFactors.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
    // Pull out values from all objects in array for chart
    const factorValue = sortedData.map(factor => factor.weight.value);
    // Set the barData for ChartJS
    const barData = {
      labels: sortedData.map(factor => factor.name),
      datasets: [
        {
          data: factorValue,
        },
      ],
    };

    // Set options for ChartJS
    const barOptions = {
      // set the color based on whether the value is greater than or less than 0
      backgroundColor: function (context) {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return value > 0 ? 'rgb(1,255,0)' : 'rgb(255,0,0)';
      },
      scales: {
        // Customize y axis
        y: {
          ticks: {
            color: 'rgb(102, 0, 153)',
          },
          title: {
            display: true,
            text: 'Weighted Value',
            color: 'rgb(102, 0, 153)',
          },
          max: 3,
          min: -3,
        },
        // Customize x axis
        x: {
          ticks: {
            color: 'rgb(102, 0, 153)',
          },
          title: {
            display: true,
            text: 'Factors',
            color: 'rgb(102, 0, 153)',
          },
        },
      },
      // Removing legend
      plugins: {
        legend: {
          display: false,
        },
        customCanvasBackgroundColor: {
          color: 'rgb(207, 159, 255)',
        },
      },
    };

    display = <Bar data={barData} options={barOptions} plugins={[plugin]} />;
  }

  // Handle toggle state
  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={classes.chart}>
      {display}
      {/* Toggle block */}
      <FormGroup>
        <FormControlLabel control={<Switch onClick={handleToggle} />} label={`${showDetails ? 'Hide Details' : 'Show Details'}`} />
      </FormGroup>
      {/* Details block */}
      {pilytixFactors && showDetails && (
        <Box style={detailsStyles}>
          <ul>
            {pilytixFactors.map((opp, index) => (
              <li key={`opportunity-msg: ${opp.oppId}-${index}`}>
                <strong style={{ color: opp.weight.value > 0 ? 'rgb(1,255,0)' : 'rgb(255,0,0)' }}>{opp.name}:</strong>
                <Typography component='span' style={{ color: 'white' }}>
                  {' '}
                  {opp.message}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
};

export default BarChart;
