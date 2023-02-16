import { useState } from 'react';
import './styles.css';
import BasicTable from './components/Table';
import OpportunityModal from './components/OpportunityModal';
import * as opportunities from './opportunities.json';

export default function App() {
  // Manage state for Modal and the currently selected opportunity
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState({});

  const data = opportunities.default;

  // Pull out the corresponding data based on the passed id
  const filteredData = id => {
    const filteredOpp = data.filter(oppObj => oppObj.oppId === id)[0];
    setSelectedOpportunity(filteredOpp);
  };

  // set the selected row to the selectedOpportunity state
  const handleData = rowData => {
    setSelectedOpportunity(rowData);
  };

  return (
    <div className='App'>
      <h2>
        <u>PILYTIX Scored Opportunities</u>
      </h2>
      <BasicTable data={data} handleData={handleData} handleModal={setIsModalOpen} />
      <OpportunityModal data={data} filterDataHandler={filteredData} modalData={selectedOpportunity} modalState={isModalOpen} handleModal={setIsModalOpen} />
    </div>
  );
}
