import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  textAlign: 'center',
  minWidth: '180px',
  flex: 1,
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  }
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.2rem',
  color: theme.palette.primary.main,
  lineHeight: 1.2,
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  marginTop: theme.spacing(0.5),
}));

// define el componente TarjetaMetrica para mostrar un valor numérico
export const TarjetaMetrica = ({ valor, titulo, icono, onClick }) => (
  <MetricCard elevation={2} onClick={onClick}> {/* ejecuta onClick al presionar */}
    {icono && <Typography sx={{ fontSize: '2rem', mb: 1 }}>{icono}</Typography>} {/* muestra icono si existe */}
    <MetricValue variant="h4">{valor}</MetricValue> {/* muestra el valor numérico gigante */}
    <MetricLabel variant="body2">{titulo}</MetricLabel> {/* muestra el título o descripción */}
  </MetricCard>
);
