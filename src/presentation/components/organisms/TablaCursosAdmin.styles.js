import { styled } from '@mui/material/styles';
import { 
  Box, 
  TableContainer, 
  TableRow, 
  TableCell
} from '@mui/material';

export const DetailWrapper = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 3,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export const StyledTableHeadRow = styled(TableRow)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
}));

export const HeaderCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
}));
