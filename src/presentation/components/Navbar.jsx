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

export const Navbar = () => {
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleLogout = async () => {
    try {
      await authRepository.logout();
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Ruta base según rol
  const dashboardPath = isAdmin() ? '/admin' : isCoordinador() ? '/coordinador' : '/profesor';

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoText
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate(dashboardPath)}
          >
            COLEGIO <LogoSpan component="span">MS-GA</LogoSpan>
          </LogoText>

          <NavContainer>
            <NavButton
              component={Link}
              to={dashboardPath}
              color="inherit"
            >
              Dashboard
            </NavButton>

            {isAdmin() && (
              <>
                <NavButton
                  component={Link}
                  to="/admin/personal"
                  color="inherit"
                >
                  Personal
                </NavButton>
                <NavButton
                  component={Link}
                  to="/admin/alumnos"
                  color="inherit"
                >
                  Matricular Alumno
                </NavButton>
                <NavButton
                  component={Link}
                  to="/admin/mensajeria"
                  color="inherit"
                >
                  Mensajería
                </NavButton>
              </>
            )}

            {isCoordinador() && (
              <>
                <NavButton
                  component={Link}
                  to="/cursos"
                  color="inherit"
                >
                  Gestión Académica
                </NavButton>
                <NavButton
                  component={Link}
                  to="/coordinador/carga-academica"
                  color="inherit"
                >
                  Carga Académica
                </NavButton>
                <NavButton
                  component={Link}
                  to="/coordinador/mensajeria"
                  color="inherit"
                >
                  Mensajería
                </NavButton>
              </>
            )}

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
