import { Container } from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export function InputForm() {
  //const [gender, setGender] = useState('');
  const recordHandle = () => {
    //record logic
  }
  return (
    <Container>
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
        onClick={recordHandle}
      >Record</Button>

    </Container>
  );
}