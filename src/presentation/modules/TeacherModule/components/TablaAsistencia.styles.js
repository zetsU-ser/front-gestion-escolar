import { styled } from '@mui/material/styles';
import { TableContainer, Box, TableRow, TableCell, Button } from '@mui/material';

export const AsistenciaTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
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

export const HeaderRow = styled(TableRow)(({ theme }) => ({
  // Heredará el gris suave del tema global para menor carga visual
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  // Heredará el color de texto secundario del tema global
}));

export const RutCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: 'nowrap',
}));

export const NombreCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  textTransform: 'none',
  fontWeight: 'bold',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));
