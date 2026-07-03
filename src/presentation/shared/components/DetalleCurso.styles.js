import { styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';

export const DetallePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

export const DetalleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const TituloCurso = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const FechaTexto = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
}));
