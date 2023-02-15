import React from 'react';
import { Modal, Button, Box, Typography, Fade } from '@mui/material';
import './OpportunityModal.css';

const boxStyle = {
  backgroundColor: 'white',
  width: '80%',
  height: '700px',
};

const modalStyle = {
  height: '100%',
  display: 'grid',
  placeItems: 'center',
};

const OpportunityModal = ({ modalState, handleModal, modalData }) => {
  return (
    <Modal sx={modalStyle} open={modalState} onClose={() => handleModal(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Fade in={modalState}>
        <Box sx={boxStyle}>
          <div className='box-header'>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Button onClick={() => handleModal(false)}>X</Button>
          </div>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OpportunityModal;
