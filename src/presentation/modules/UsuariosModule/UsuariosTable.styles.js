import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TableContainer, TableHead, TableCell } from '@mui/material';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
}));

export const TablePaper = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

export const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const EmptyRowCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));
