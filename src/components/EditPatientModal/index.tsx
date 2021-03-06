import { FormEvent } from 'react';
import Modal from 'react-modal';
import { Container } from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';

import closeImg from '../../assets/close.svg';


interface EditPatientModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  //adicionar as props que vão receber os dados
}
async function handleCreateNewPatient(event: FormEvent) {
  //TODO
}

export const EditPatientModal = ({ isOpen, onRequestClose }: EditPatientModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreateNewPatient}>
        <TextField
          id="name-input"
          label="Name"
        />
        <TextField
          id="age-input"
          label="Age"
          type="number"
        />
        <TextField
          id="history-input"
          label="Patient History"
          multiline
        />
        <TextField
          id="gender-input"
          label="Patient Gender"
        />
        <Button
          variant="contained"
          type="submit"
        >Update</Button>
        <Button
          variant="contained"
          onClick={onRequestClose}
        >Cancel</Button>
      </Container>
    </Modal>
  );
}