import { useState, FormEvent } from 'react';
import Modal from 'react-modal';
import { Container } from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import api from '../../api/patients';
import axios, { AxiosError } from 'axios';
import closeImg from '../../assets/close.svg';


interface NewPatientModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewPatientModal = ({ isOpen, onRequestClose }: NewPatientModalProps) => {

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [history, setHistory] = useState('');

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
  const changeGenderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  }
  const changeCpfHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  }
  const changeAgeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value));
  }
  const changeHistoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHistory(event.target.value);
  }

  async function handleCreateNewPatient(event: FormEvent) {
    const request = {
      'cpf': cpf,
      'name': name,
      'gender': gender,
      'age': age,
      'history': history
    }
    try {
      const response = await api.post("/patient", request);
      console.log(response);
    } catch (error) {
      const err = error as AxiosError
      if (err.response) {
        console.log(err.response.status)
        console.log(err.response.data)
      }
    }
  }

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
          id="cpf-input"
          label="CPF"
          onChange={changeCpfHandler}
        />
        <TextField
          id="name-input"
          label="Name"
          onChange={changeNameHandler}
        />
        <TextField
          id="gender-input"
          label="Patient Gender"
          onChange={changeGenderHandler}
        />
        <TextField
          id="age-input"
          label="Age"
          type="number"
          onChange={changeAgeHandler}
        />
        <TextField
          id="history-input"
          label="Patient History"
          onChange={changeHistoryHandler}
          multiline
        />

        <Button
          variant="contained"
          type="submit"
        >Record</Button>
        <Button
          variant="contained"
          onClick={onRequestClose}
        >Cancel</Button>
      </Container>
    </Modal>
  );
}