import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TableContainer, TableHead, TableCell } from '@mui/material';

export const LoadingText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
}));

export const TablePaper = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

export const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const EmptyRowCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));
