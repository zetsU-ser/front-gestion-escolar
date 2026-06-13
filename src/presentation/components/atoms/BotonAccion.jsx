import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '30px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
}));

/**
 * Átomo: BotonAccion
 * Botón estilizado reutilizable con soporte de estado loading.
 * Usado en: FormularioCrearCurso, FormularioAsignacionBloque, Dashboards
 */
export const BotonAccion = ({
  children,
  onClick,
  loading = false,
  startIcon,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  disabled = false,
  ...rest
}) => (
  <StyledButton
    type={type}
    variant={variant}
    color={color}
    onClick={onClick}
    disabled={loading || disabled}
    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
    {...rest}
  >
    {children}
  </StyledButton>
);
