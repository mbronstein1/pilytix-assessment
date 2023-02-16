import React from 'react';
import { Modal, Button, Typography, Fade, Rating, Card } from '@mui/material';
import GaugeChart from 'react-gauge-chart';
import './OpportunityModal.css';

// Stylings
const cardStyle = {
  backgroundColor: 'white',
  width: '90%',
  height: '750px',
  padding: '40px',
  boxSizing: 'border-box',
  overflowY: 'auto',
  overflowX: 'hidden',
};

const modalStyle = {
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  overflowY: 'auto',
};

const gaugeColors = ['rgb(255, 0, 0)', 'rgb(255,255,0)', 'rgb(1,255,0)'];

const gaugeStyle = {
  width: 250,
  maxWidth: '90%',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  borderRadius: '5px',
  marginInline: 'auto',
  marginTop: 15,
};

let currentId;

const OpportunityModal = ({ data, modalState, handleModal, modalData, filterDataHandler }) => {
  const stars = modalData.pilytixTier?.split(' ')[0];
  currentId = modalData.oppId;

  // Handle next and previous opportunities from Modal
  const handleOppChange = e => {
    if (e.target.name === 'next') {
      currentId = currentId + 1 > 10 ? 1 : currentId + 1;
    } else {
      currentId = currentId - 1 <= 0 ? data.length : currentId - 1;
    }
    filterDataHandler(currentId);
  };

  return (
    <Modal sx={modalStyle} open={modalState} onClose={() => handleModal(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Fade in={modalState}>
        <Card sx={cardStyle}>
          <div className='box-header'>
            <Typography id='modal-modal-title' variant='p' component='h2'>
              {modalData.oppName}
            </Typography>
            <Button onClick={() => handleModal(false)}>X</Button>
            <Typography className='sales-rep' variant='p' component='h3'>
              Sales Rep: {modalData.salesRepName}
            </Typography>
          </div>
          <div className='box-content'>
            <div className='content-containers'>
              <Typography>Amount</Typography>
              <Typography>${modalData.amount?.toFixed(2)}</Typography>
            </div>
            <div className='content-containers'>
              <Typography>Product</Typography>
              <Typography>{modalData.product}</Typography>
            </div>
            <div className='content-containers'>
              <Typography>Stage</Typography>
              <Typography>{modalData.stage}</Typography>
            </div>
            <div className='content-containers'>
              <Typography>PILYTIX Tier</Typography>
              <Rating name='read-only' value={+stars} readOnly />
              <Typography>{modalData.pilytixTier}</Typography>
            </div>
            <div className='content-containers'>
              <Typography>Rep Probability</Typography>
              <GaugeChart id='gauge-chart2' style={gaugeStyle} colors={gaugeColors} percent={modalData.repProbability} animate={false} />
            </div>
            <div className='content-containers'>
              <Typography>PILYTIX Probability</Typography>
              <GaugeChart id='gauge-chart2' style={gaugeStyle} colors={gaugeColors} percent={modalData.pilytixProbability} animate={false} />
            </div>
          </div>
          {/* Tabs for charts */}
          <div className='button-control'>
            <Button name='previous' onClick={handleOppChange}>
              Previous
            </Button>
            <Button name='next' onClick={handleOppChange}>
              Next
            </Button>
          </div>
        </Card>
      </Fade>
    </Modal>
  );
};

export default OpportunityModal;
