import { useState } from 'react';
import './styles.css';
import BasicTable from './components/Table';
import OpportunityModal from './components/OpportunityModal';

export default function App() {
  // Manage state for Modal, the selected opportunity, and the ID for 'next/previous' functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState({});
  const [selectedId, setSelectedId] = useState();
  // current opportunity id = useState()
  //setCurrent opp id = e.target.click
  // ++ or --
  // filter opp array where opp id = next id

  const handleData = rowData => {
    setSelectedOpportunity(rowData);
    setSelectedId(rowData.oppId);
    console.log(rowData);
  };

  return (
    <div className='App'>
      <h2>PILYTIX Scored Opportunities</h2>
      <BasicTable handleData={handleData} handleModal={setIsModalOpen} />
      <OpportunityModal modalData={selectedOpportunity} modalState={isModalOpen} handleModal={setIsModalOpen} />
    </div>
  );
}
