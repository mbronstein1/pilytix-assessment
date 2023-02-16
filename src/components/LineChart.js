import React from 'react';
import { Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

let display;

const LineChart = ({ probHistory }) => {
  if (probHistory === null || probHistory.length === 0) {
    display = <Typography style={{ textAlign: 'center' }}>There is no data</Typography>;
  } else {
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
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              return `${value * 100}%`;
            },
          },
          min: 0,
          max: 1,
          title: {
            display: true,
            text: 'Probability',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Days Ago',
          },
        },
      },
    };

    display = <Line data={lineData} options={lineOptions} plugins={[plugin]} />;
  }
  return <Box>{display}</Box>;
};

export default LineChart;
