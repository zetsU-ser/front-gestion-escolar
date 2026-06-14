import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Paper, Card, Divider } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
}));

export const EmptyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  border: '2px dashed #ccc',
  background: 'transparent',
}));

export const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  background: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

export const CourseIdText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const CardActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
}));
