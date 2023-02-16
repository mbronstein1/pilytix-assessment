import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarChart from './BarChart';
import LineChart from './LineChart';

// Create TabPanel UI component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='span'>{children}</Typography>
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

// Accessibility for Tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

let pilytixFactors;

const OppTabs = ({ oppData }) => {
  const [value, setValue] = useState(0);
  // set pilytixFactors variable depending on whether either arrays are not null, or one or the other is null so all of the factors can be displayed in the same chart
  if (oppData.pilytixFactorsIncreasingWin && oppData.pilytixFactorsDecreasingWin) {
    pilytixFactors = [...oppData.pilytixFactorsIncreasingWin, ...oppData.pilytixFactorsDecreasingWin];
  } else if (oppData.pilytixFactorsIncreasingWin && oppData.pilytixFactorsDecreasingWin === null) {
    pilytixFactors = oppData.pilytixFactorsIncreasingWin;
  } else {
    pilytixFactors = oppData.pilytixFactorsDecreasingWin;
  }

  // Monitor value for tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs textColor='secondary' indicatorColor='secondary' variant='fullWidth' value={value} onChange={handleChange} aria-label='basic tabs example' centered>
        <Tab label='Probability History' {...a11yProps(0)} />
        <Tab label='PILYTIX Win Factors' {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <LineChart probHistory={oppData.probabilityHistory} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BarChart pilytixFactors={pilytixFactors} />
      </TabPanel>
    </Box>
  );
};

export default OppTabs;
