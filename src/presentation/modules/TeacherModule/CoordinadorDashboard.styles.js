import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Divider, Stack, Button, TableContainer, Table, TableCell, TableRow } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const EmailText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ActionStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '30px',
  textTransform: 'none',
  fontSize: '1rem',
}));

export const PrimaryButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#1976d2',
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

export const TableHeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderTopRightRadius: theme.shape.borderRadius * 2,
  '& .MuiTypography-root': {
    color: 'inherit',
  }
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const GroupHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  cursor: 'pointer',
}));

export const IndentedCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));
