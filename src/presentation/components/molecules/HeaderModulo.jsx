import React from 'react';
import { Box, Typography } from '@mui/material';

// define el componente HeaderModulo para el título, perfil del usuario y acciones
export const HeaderModulo = ({ titulo, correo, nombre = "Administrador", action }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 4,
      gap: 3,
      width: '100%'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flex: 1 }}> {/* agrupa el título y acciones y permite que el texto baje si es muy largo */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'left' }}>
          {titulo}
        </Typography>
        {action}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0, justifyContent: 'flex-end' }}> {/* caja para agrupar nombre, correo y avatar a la derecha */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
            {nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {correo}
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};
