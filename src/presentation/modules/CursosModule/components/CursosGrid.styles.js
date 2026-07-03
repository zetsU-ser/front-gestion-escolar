import { styled } from '@mui/material/styles';
import { TableContainer, Box, TableCell, TableRow, Paper, Button } from '@mui/material';

export const CursosTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
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

export const EmptyStatePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  width: '100%',
}));

export const GroupHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  cursor: 'pointer',
}));

export const IndentedCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
