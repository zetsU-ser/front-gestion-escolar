import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));



export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#ffffff',
}));

export const SendButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontWeight: 'bold',
  borderRadius: '8px',
}));
