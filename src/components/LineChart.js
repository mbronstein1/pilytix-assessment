import React from 'react';
import { Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import plugin from '../Utils/chartPlugin';
import classes from './Chart.module.css';

let display;

const LineChart = ({ probHistory }) => {
  // Validation handling if there is no data
  if (probHistory === null || probHistory.length === 0) {
    display = <Typography style={{ textAlign: 'center' }}>There is no data</Typography>;
  } else {
    // Set line chart data for ChartJS
    const lineData = {
      labels: probHistory.map(history => history.daysAgo),
      datasets: [
        {
          label: 'PILYTIX Probability',
          data: probHistory.map(history => history.pilytixProb),
          backgroundColor: 'rgb(102, 0, 153)',
          borderColor: 'rgb(102, 0, 153)',
          borderWidth: 2,
        },
        {
          label: 'Rep Probability',
          data: probHistory.map(history => history.repProb),
          backgroundColor: 'rgb(230, 230, 250)',
          borderColor: 'rgb(230, 230, 250)',
          borderWidth: 2,
        },
      ],
    };

    const lineOptions = {
      plugins: {
        customCanvasBackgroundColor: {
          color: 'rgb(207, 159, 255)',
        },
      },
      scales: {
        y: {
          // Allows to customize yAxis ticks
          ticks: {
            callback: function (value, index, ticks) {
              return `${value * 100}%`;
            },
            color: 'rgb(102, 0, 153)',
          },
          min: 0,
          max: 1,
          // sets yAxis title
          title: {
            display: true,
            text: 'Probability',
            color: 'rgb(102, 0, 153)',
          },
        },
        x: {
          ticks: {
            color: 'rgb(102, 0, 153)',
          },
          // sets xAxis title
          title: {
            display: true,
            text: 'Days Ago',
            color: 'rgb(102, 0, 153)',
          },
        },
      },
    };

    display = <Line data={lineData} options={lineOptions} plugins={[plugin]} />;
  }

  return <div className={classes.chart}>{display}</div>;
};

export default LineChart;
