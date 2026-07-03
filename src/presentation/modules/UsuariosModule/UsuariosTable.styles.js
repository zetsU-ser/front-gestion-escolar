import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TableContainer, TableHead, TableCell, Divider, Alert, CircularProgress, Table, TableRow, TableBody } from '@mui/material';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));



export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
}));

export const TablePaper = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

export const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const EmptyRowCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
}));
