import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const NavLink = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
  }
}));

/**
 * Átomo: ItemNavegacion
 * Enlace individual del Navbar. Recibe un texto y una ruta.
 * Usado en: NavbarCoordinador, NavbarAdmin
 */
export const ItemNavegacion = ({ texto, ruta }) => (
  <NavLink component={Link} to={ruta} color="inherit">
    {texto}
  </NavLink>
);
