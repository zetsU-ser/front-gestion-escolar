import { styled } from '@mui/material/styles';
import { Stack, TextField, Paper, Typography } from '@mui/material';

export const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const SelectorStack = styled(Stack)(({ theme }) => ({
  flexWrap: 'wrap',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  minWidth: '200px',
}));
