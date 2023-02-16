import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarChart from './BarChart';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

let pilytixFactors;

const OppTabs = ({ oppData }) => {
  const [value, setValue] = useState(0);
  if (oppData.pilytixFactorsIncreasingWin && oppData.pilytixFactorsDecreasingWin) {
    pilytixFactors = [...oppData.pilytixFactorsIncreasingWin, ...oppData.pilytixFactorsDecreasingWin];
    console.log(pilytixFactors);
  } else if (oppData.pilytixFactorsIncreasingWin && oppData.pilytixFactorsDecreasingWin === null) {
    pilytixFactors = oppData.pilytixFactorsIncreasingWin;
  } else {
    pilytixFactors = oppData.pilytixFactorsDecreasingWin;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs textColor='secondary' indicatorColor='secondary' variant='fullWidth' value={value} onChange={handleChange} aria-label='basic tabs example' centered>
        <Tab label='Probability History' {...a11yProps(0)} />
        <Tab label='PILYTIX Factors Increasing Win' {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BarChart oppData={pilytixFactors} />
      </TabPanel>
    </div>
  );
};

export default OppTabs;
