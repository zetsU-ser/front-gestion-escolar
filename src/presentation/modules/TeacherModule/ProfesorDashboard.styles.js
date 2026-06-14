import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Divider, Stack, Button } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  textAlign: 'center',
  maxWidth: 600,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ActionStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
}));

export const CaptionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  color: theme.palette.text.disabled,
}));
