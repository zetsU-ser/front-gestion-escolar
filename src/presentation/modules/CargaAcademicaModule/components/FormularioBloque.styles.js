import { styled } from '@mui/material/styles';
import { Paper, TextField, Button, Stack } from '@mui/material';

export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
}));

export const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  minWidth: '200px',
}));

export const FlexTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
}));

export const FormGroupStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '30px',
  textTransform: 'none',
  fontWeight: 'bold',
}));
