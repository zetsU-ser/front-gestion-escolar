import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Typography, Divider } from '@mui/material';

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

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontWeight: 'bold',
  borderRadius: '8px',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const CascadaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

export const AlumnoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.secondary.main}`,
}));
