import { Toolbar, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';
import { 
  StyledAppBar, 
  LogoText, 
  LogoSpan, 
  NavContainer, 
  NavButton, 
  LogoutButton 
} from './Navbar.styles';

/**
 * COMPONENTE: Navbar
 * Barra de navegación superior con navegación condicional basada en roles.
 * Utiliza Glassmorphism para un diseño premium.
 */
export const Navbar = () => {
  // --- CONSUMO DE CONTEXTO ---
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  const navigate = useNavigate();

  // No renderizar si no hay sesión activa (Pantalla de Login)
  if (!currentUser) return null;

  // --- MANEJADORES ---
  
  const handleLogout = async () => {
    try {
      await authRepository.logout();
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Determinar la ruta base según el rol
  const dashboardPath = isAdmin() ? '/admin' : isCoordinador() ? '/coordinador' : '/profesor';

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGOTIPO / TÍTULO */}
          <LogoText
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate(dashboardPath)}
          >
            COLEGIO <LogoSpan component="span">MS-GA</LogoSpan>
          </LogoText>

          {/* MENÚ DE NAVEGACIÓN DINÁMICO */}
          <NavContainer>
            <NavButton 
              component={Link} 
              to={dashboardPath} 
              color="inherit"
            >
              Dashboard
            </NavButton>

            {/* ENLACES PARA ADMINISTRADOR */}
            {isAdmin() && (
              <NavButton 
                component={Link} 
                to="/usuarios" 
                color="inherit"
              >
                Personal
              </NavButton>
            )}

            {/* ENLACES PARA COORDINADOR */}
            {isCoordinador() && (
              <>
                <NavButton 
                  component={Link} 
                  to="/alumnos" 
                  color="inherit"
                >
                  Matrículas
                </NavButton>
                <NavButton 
                  component={Link} 
                  to="/cursos" 
                  color="inherit"
                >
                  Cursos
                </NavButton>
              </>
            )}

            {/* BOTÓN DE CIERRE DE SESIÓN */}
            <LogoutButton 
              onClick={handleLogout} 
              variant="outlined" 
              color="error"
              size="small"
            >
              Salir
            </LogoutButton>
          </NavContainer>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
