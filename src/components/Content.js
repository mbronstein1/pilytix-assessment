import React from 'react';
import { Typography, Rating } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

const gaugeColors = ['rgb(255, 0, 0)', 'rgb(255,255,0)', 'rgb(1,255,0)'];

const gaugeStyle = {
  width: 200,
  maxWidth: '90%',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  borderRadius: '5px',
  marginInline: 'auto',
  marginTop: 15,
};

const Content = ({ label, data, rating, percent }) => {
  return (
    <div className='content-containers'>
      <Typography>{label}</Typography>
      {rating && <Rating name='read-only' value={rating} readOnly />}
      {data && <Typography>{data}</Typography>}
      {percent && <GaugeChart style={gaugeStyle} colors={gaugeColors} percent={percent} animate={false} />}
    </div>
  );
};

export default Content;
