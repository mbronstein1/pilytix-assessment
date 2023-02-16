import { useState } from 'react';
import './styles.css';
import BasicTable from './components/Table';
import OpportunityModal from './components/OpportunityModal';
import * as opportunities from './opportunities.json';

export default function App() {
  // Manage state for Modal, the selected opportunity, and the ID for 'next/previous' functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState({});

  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  const filteredData = id => {
    const filteredOpp = data.filter(oppObj => oppObj.oppId === id)[0];
    setSelectedOpportunity(filteredOpp);
  };

  const handleData = rowData => {
    setSelectedOpportunity(rowData);
    console.log(rowData);
  };

  return (
    <div className='App'>
      <h2>PILYTIX Scored Opportunities</h2>
      <BasicTable data={data} handleData={handleData} handleModal={setIsModalOpen} />
      <OpportunityModal data={data} filterDataHandler={filteredData} modalData={selectedOpportunity} modalState={isModalOpen} handleModal={setIsModalOpen} />
    </div>
  );
}
