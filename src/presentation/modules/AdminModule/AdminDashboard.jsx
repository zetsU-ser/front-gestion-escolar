import { Box, Typography, Button, Stack } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { authRepository } from '../../../infrastructure/repositories/HttpAuthRepository';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authRepository.logout();
    navigate('/');
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" color="primary">Panel de Administrador</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Bienvenido, {currentUser?.email}</Typography>
      <Typography variant="body1">Rol detectado: {currentUser?.role}</Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => navigate('/usuarios')}>
          Gestión de Usuarios
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Stack>
    </Box>
  );
};

