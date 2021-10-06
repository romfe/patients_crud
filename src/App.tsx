import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from './api/patients';
import { PatientList } from './components/PatientList';
import { GlobalStyle } from './styles/global';
import { NewPatientModal } from './components/NewPatientModal';
import { EditPatientModal } from './components/EditPatientModal';
import Button from '@mui/material/Button';

Modal.setAppElement('#root');
function App() {

  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const [patients, setPatients] = useState("");

  const retrievePatients = async () => {
    const response = await api.get("/patients");
    return response.data;
  }
  const handleCloseNewPatientModal = () => {
    setIsNewPatientModalOpen(false);
  }
  const handleCloseEditPatientModal = () => {
    setIsEditPatientModalOpen(false);
  }
  const handleOpenNewPatientModal = () => {
    setIsNewPatientModalOpen(true);
  }
  const handleOpenEditPatientModal = () => {
    setIsEditPatientModalOpen(true);
  }

  const getAllPatients = async () => {
    const allPatients = await retrievePatients();
    if (allPatients) setPatients(allPatients);
  }

  //useEffect(() => {getAllPatients();}, []);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpenNewPatientModal}
      >New Patient</Button>
      <PatientList />
      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onRequestClose={handleCloseNewPatientModal}
      />
      <EditPatientModal
        isOpen={isEditPatientModalOpen}
        onRequestClose={handleCloseEditPatientModal}
      />
      <GlobalStyle />
    </div>
  );
}

export default App;
