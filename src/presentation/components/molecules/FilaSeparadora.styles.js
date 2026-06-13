import { styled } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  TableRow, 
  TableCell
} from '@mui/material';

export const SeparatorRow = styled(TableRow)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.06)',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

export const SeparatorCell = styled(TableCell)(({ theme, isAbierto }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderBottom: isAbierto ? `1px solid ${theme.palette.divider}` : 'none',
}));

export const SeparatorContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const SeparatorTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const SeparatorTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
}));
