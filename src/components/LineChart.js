import React from 'react';
import { Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

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

    // define custom plugin for ChartJS provided by ChartJS to change chart background color
    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
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
          },
          min: 0,
          max: 1,
          // sets yAxis title
          title: {
            display: true,
            text: 'Probability',
          },
        },
        x: {
          // sets xAxis title
          title: {
            display: true,
            text: 'Days Ago',
          },
        },
      },
    };

    display = <Line data={lineData} options={lineOptions} plugins={[plugin]} />;
  }
  return <Box sx={{ width: '80%', marginInline: 'auto' }}>{display}</Box>;
};

export default LineChart;
