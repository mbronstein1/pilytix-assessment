import React from 'react';
import { Modal, Button, Box, Typography, Fade, Rating } from '@mui/material';
import './OpportunityModal.css';

const boxStyle = {
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
};

const OpportunityModal = ({ modalState, handleModal, modalData }) => {
  const stars = modalData.pilytixTier?.split(' ')[0];

  return (
    <Modal sx={modalStyle} open={modalState} onClose={() => handleModal(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Fade in={modalState}>
        <Box sx={boxStyle}>
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
              <Typography>${modalData.amount}</Typography>
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
              <Typography component='legend'>PILYTIX Tier</Typography>
              <Rating name='read-only' value={stars} readOnly />
              <Typography>{modalData.pilytixTier}</Typography>
            </div>
            <div className='content-containers'>
              <Typography>Rep Probability</Typography>
              <Typography>{modalData.repProbability}</Typography>
            </div>
            <div className='content-containers'>
              <Typography>PILYTIX Probability</Typography>
              <Typography>{modalData.pilytixProbability}</Typography>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OpportunityModal;
