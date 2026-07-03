import { styled } from '@mui/material/styles';
import { TableContainer, Box, Table, TableCell, IconButton, TableRow, TableBody } from '@mui/material';

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

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 800,
}));

export const BloqueHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  width: '15%',
}));

export const DiaHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  width: '17%',
  textAlign: 'center',
}));

export const BloqueLabelCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[100],
}));

export const EmptyCargaCell = styled(TableCell)(({ theme }) => ({
  borderRight: '1px solid #eee',
}));

export const CargaCell = styled(TableCell)(({ theme }) => ({
  borderRight: '1px solid #eee',
  backgroundColor: '#e3f2fd',
  padding: theme.spacing(1),
}));

export const CargaBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  minHeight: '80px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

export const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -4,
  right: -4,
}));
