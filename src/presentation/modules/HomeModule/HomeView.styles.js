import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

export const HomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

export const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(6),
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 6),
  borderRadius: '24px',
  fontSize: '1.1rem',
}));
