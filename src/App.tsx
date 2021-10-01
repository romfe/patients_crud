import React, { useState } from 'react';
import Modal from 'react-modal';
import { PatientList } from './components/PatientList';
import { GlobalStyle } from './styles/global';
import { NewPatientModal } from './components/NewPatientModal';
import { EditPatientModal } from './components/EditPatientModal';
import Button from '@mui/material/Button';

Modal.setAppElement('#root');
function App() {

  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
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
