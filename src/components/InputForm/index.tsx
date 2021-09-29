import { Container } from './styles';
import TextField from '@material-ui/core/TextField';
export function InputForm() {
  return (
    <Container>
      <TextField
        id="name-input"
        label="Name"
        value="Name"
      />
    </Container>
  );
}