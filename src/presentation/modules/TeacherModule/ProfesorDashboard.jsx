import { Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { authRepository } from '../../../infrastructure/repositories/HttpAuthRepository';
import { useNavigate } from 'react-router-dom';

export const ProfesorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authRepository.logout();
    navigate('/');
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" color="primary">Panel de Profesor</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Bienvenido, {currentUser?.email}</Typography>
      <Typography variant="body1">Rol detectado: {currentUser?.role}</Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 4 }} onClick={handleLogout}>Cerrar Sesión</Button>
    </Box>
  );
};
