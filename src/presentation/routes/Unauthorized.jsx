import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" color="error">Acceso Denegado</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>No tienes los permisos necesarios para ver esta página.</Typography>
      <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/')}>Volver al Inicio</Button>
    </Box>
  );
};
