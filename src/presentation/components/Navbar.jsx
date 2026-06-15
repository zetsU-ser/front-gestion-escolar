import React from 'react';
import { Toolbar, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
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
  StyledAppBar,
  LogoText,
  LogoSpan,
  NavContainer,
  LogoutButton
} from './Navbar.styles';

const DRAWER_WIDTH = 280;

/**
 * Plantilla (Template): NavigationLayout (antes Navbar)
 * Gestiona el layout completo de la aplicación dependiendo del rol.
 * - Docentes: Navbar superior.
 * - Admin/Coordinador: Sidebar lateral persistente.
 */
export const Navbar = ({ children }) => {
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return <>{children}</>;

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

  const renderMenuItem = (text, path, icon) => (
    <ListItem disablePadding key={text}>
      <ListItemButton component={Link} to={path}>
        <ListItemIcon sx={{ color: 'primary.main' }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ color: 'text.secondary', fontWeight: 'medium' }} />
      </ListItemButton>
    </ListItem>
  );

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
  };

  // LAYOUT PARA TODOS: Sidebar lateral permanente
  return (
    <Box sx={{ display: 'flex', ...backgroundStyle }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogoText variant="h5" align="center" sx={{ cursor: 'pointer' }} onClick={() => navigate(dashboardPath)}>
            COLEGIO <br /><LogoSpan component="span" sx={{ fontSize: '1.2rem' }}>MS-GA</LogoSpan>
          </LogoText>
        </Box>
        <Divider sx={{ mb: 2, mx: 2 }} />
        
        <List sx={{ flexGrow: 1, px: 2 }}>
          {renderMenuItem('Dashboard', dashboardPath, <DashboardIcon />)}
          
          {isAdmin() && (
            <>
              {renderMenuItem('Personal', '/admin/personal', <GroupIcon />)}
              {renderMenuItem('Matricular Alumno', '/admin/alumnos', <SchoolIcon />)}
              {renderMenuItem('Mensajería', '/admin/mensajeria', <EmailIcon />)}
              {renderMenuItem('Calificaciones', '/profesor/evaluaciones', <AssignmentIcon />)}
              {renderMenuItem('Asistencia', '/profesor/asistencia', <AssignmentIcon />)}
              {renderMenuItem('Carga Académica', '/coordinador/carga-academica', <AssignmentIcon />)}
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
              {/* Para Asistencia y Evaluaciones requerimos el curso y asignatura, los mandamos al dashboard para que elijan */}
              {renderMenuItem('Asistencia', '/profesor/asistencia', <AssignmentIcon />)}
              {renderMenuItem('Evaluaciones', '/profesor/evaluaciones', <AssignmentIcon />)}
              {renderMenuItem('Mensajería', '/profesor/mensajeria', <EmailIcon />)}
            </>
          )}
        </List>

        <Divider sx={{ mx: 2, mb: 2 }} />
        <List sx={{ px: 2, pb: 4 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'error.light' } }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" sx={{ color: 'error.main', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
};
