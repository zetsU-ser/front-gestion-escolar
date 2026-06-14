import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';

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
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
}));

export const SchedulePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  overflowX: 'auto',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const EmptyStatePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
