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

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2, // Equivalent to borderRadius: 4
  textAlign: 'center',
  maxWidth: 600,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
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
