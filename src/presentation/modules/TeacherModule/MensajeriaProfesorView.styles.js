import { styled } from '@mui/material/styles';
import { Paper, Button, Box } from '@mui/material';

export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '30px',
  textTransform: 'none',
  fontWeight: 'bold',
}));
