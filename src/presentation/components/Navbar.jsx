import React from 'react';
import { ListItem, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';
import {
  LogoText, LogoSpan, AppContainer, SidebarDrawer, 
  SidebarHeader, SidebarDivider, NavList, NavIcon, 
  NavText, LogoutList, LogoutListItemButton, LogoutIconWrapper, 
  LogoutText, MainContent
} from './Navbar.styles';

const DRAWER_WIDTH = 280;

// COMPONENT PATTERN
// renderiza la barra de navegación y panel lateral según el rol del usuario
export const Navbar = ({ children }) => {
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return <>{children}</>;

  // cierra la sesión del usuario actual
  const handleLogout = async () => {
    try {
      await authRepository.logout();
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const dashboardPath = isAdmin() ? '/admin' : isCoordinador() ? '/coordinador' : '/profesor';
  const isTeacher = !isAdmin() && !isCoordinador();

  // construye la estructura base de un enlace del menú
  const renderMenuItem = (text, path, icon) => (
    <ListItem disablePadding key={text}>
      <ListItemButton component={Link} to={path}>
        <NavIcon>
          {icon}
        </NavIcon>
        <NavText primary={text} />
      </ListItemButton>
    </ListItem>
  );

  // estructura principal de la navegación
  return (
    <AppContainer>
      <SidebarDrawer variant="permanent" $drawerWidth={DRAWER_WIDTH}>
        <SidebarHeader>
          <LogoText variant="h5" align="center" onClick={() => navigate(dashboardPath)}>
            COLEGIO <br /><LogoSpan component="span">MS-GA</LogoSpan>
          </LogoText>
        </SidebarHeader>
        <SidebarDivider />
        
        <NavList>
          {renderMenuItem('Dashboard', dashboardPath, <DashboardIcon />)}
          
          {isAdmin() && (
            <>
              {renderMenuItem('Personal', '/admin/personal', <GroupIcon />)}
              {renderMenuItem('Matricular Alumno', '/admin/alumnos', <SchoolIcon />)}
              {renderMenuItem('Mensajería', '/admin/mensajeria', <EmailIcon />)}
            </>
          )}

          {isCoordinador() && (
            <>
              {renderMenuItem('Gestión Académica', '/cursos', <ClassIcon />)}
              {renderMenuItem('Carga Académica', '/coordinador/carga-academica', <AssignmentIcon />)}
              {renderMenuItem('Mensajería', '/coordinador/mensajeria', <EmailIcon />)}
            </>
          )}

          {isTeacher && (
            <>
              {/* opciones específicas del rol docente */}
              {renderMenuItem('Asistencia', '/profesor/asistencia', <AssignmentIcon />)}
              {renderMenuItem('Evaluaciones', '/profesor/evaluaciones', <AssignmentIcon />)}
              {renderMenuItem('Mensajería', '/profesor/mensajeria', <EmailIcon />)}
            </>
          )}
        </NavList>

        <SidebarDivider />
        <LogoutList>
          <ListItem disablePadding>
            <LogoutListItemButton onClick={handleLogout}>
              <LogoutIconWrapper>
                <LogoutIcon />
              </LogoutIconWrapper>
              <LogoutText primary="Salir" />
            </LogoutListItemButton>
          </ListItem>
        </LogoutList>
      </SidebarDrawer>
      
      {/* renderiza el contenido central de la aplicación */}
      <MainContent component="main">
        {children}
      </MainContent>
    </AppContainer>
  );
};
