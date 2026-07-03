import { styled } from '@mui/material/styles';
import { Paper, Stack, Typography } from '@mui/material';

export const MetricStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

export const MetricCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== '$isSelected'
})(({ theme, $isSelected }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  textAlign: 'center',
  minWidth: '180px',
  flex: 1,
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  border: $isSelected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  }
}));

export const MetricIconContainer = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: theme.spacing(1),
}));

export const MetricValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.2rem',
  color: theme.palette.primary.main,
  lineHeight: 1.2,
}));

export const MetricTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  marginTop: theme.spacing(0.5),
}));
