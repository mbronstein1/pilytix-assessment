import React from 'react';
import { Modal, Button, Typography, Fade, Card } from '@mui/material';
import OppTabs from './OppTabs';
import './OpportunityModal.css';
import Content from './Content';
import { useSwipeable } from 'react-swipeable';

// Stylings
const overFlow = {
  overflowY: 'auto',
};

let currentId;

const OpportunityModal = ({ data, modalState, handleModal, modalData, filterDataHandler }) => {
  // Store the stars number in a variable for the Rating component
  const stars = +modalData.pilytixTier?.split(' ')[0];
  currentId = modalData.oppId;

  // Swipe functionality for next and previous opps
  const swipeHandler = useSwipeable({
    onSwipedLeft: () => {
      currentId = currentId + 1 > 10 ? 1 : currentId + 1;
      filterDataHandler(currentId);
    },
    onSwipedRight: () => {
      currentId = currentId - 1 <= 0 ? data.length : currentId - 1;
      filterDataHandler(currentId);
    },
    trackMouse: true,
  });

  // Handle next and previous opportunities from Modal
  const handleOppChange = e => {
    if (e.target.name === 'next') {
      currentId = currentId + 1 > 10 ? 1 : currentId + 1;
    } else {
      currentId = currentId - 1 <= 0 ? data.length : currentId - 1;
    }
    filterDataHandler(currentId);
  };

  // Keydown functionality for next and previous opps
  const handleKeyChange = e => {
    if (e.keyCode === 39) {
      currentId = currentId + 1 > 10 ? 1 : currentId + 1;
    }
    if (e.keyCode === 37) {
      currentId = currentId - 1 <= 0 ? data.length : currentId - 1;
    }
    filterDataHandler(currentId);
  };

  return (
    <Modal
      onKeyDown={handleKeyChange}
      {...swipeHandler}
      className='modal-container'
      open={modalState}
      onClose={() => handleModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Fade in={modalState}>
        <Card className='card-container' sx={overFlow}>
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
            <Content label='Amount' data={`$${modalData.amount?.toFixed(2)}`} />
            <Content label='Product' data={modalData.product} />
            <Content label='Stage' data={modalData.stage} />
            <Content label='PILYTIX Tier' rating={stars} data={modalData.pilytixTier} />
            <Content label='Rep Probability' percent={modalData.repProbability} />
            <Content label='PILYTIX Probability' percent={modalData.pilytixProbability} />
          </div>
          {/* Tabs for charts */}
          <OppTabs oppData={modalData} />
          <div className='button-control'>
            <Button name='previous' onClick={handleOppChange}>
              Previous
            </Button>
            <div style={{ marginInline: '20px', textAlign: 'center' }}>
              <p>Swipe, use arrow keys, or click buttons to navigate between adjacent opportunity cards</p>
            </div>
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
