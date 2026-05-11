import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Divider, Stack, Button } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
}));

export const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  textAlign: 'center',
  maxWidth: 700,
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const EmailText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
}));

export const ActionStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
}));

export const ManagementButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '30px',
  textTransform: 'none',
  fontSize: '1.1rem',
  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
}));
