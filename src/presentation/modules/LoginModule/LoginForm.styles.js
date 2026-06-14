import { styled } from '@mui/material/styles';
import { Paper, Avatar, Typography, Alert, Box, Button, Container, TextField, CircularProgress } from '@mui/material';

export const LoginPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(12),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(5px)',
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  width: 56,
  height: 56,
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
  borderRadius: theme.spacing(1),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '1.1rem',
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
}));

export const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
}));

export const BackButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(4),
  left: theme.spacing(4),
  textTransform: 'none',
  color: theme.palette.text.secondary,
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
