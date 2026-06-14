import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';

// define el componente FilaPersonal para renderizar a un usuario
export const FilaPersonal = ({ usuario }) => {
  const especificacion = usuario.email; // guarda el email por defecto
  
  return (
    <TableRow hover>
      <TableCell>{usuario.nombre} {usuario.apellido}</TableCell>
      <TableCell>
        <Chip 
          label={usuario.rol} // muestra el rol en un chip
          size="small" 
          color={usuario.rol === 'DOCENTE' ? 'secondary' : 'info'} // cambia el color según el rol
        />
      </TableCell>
      <TableCell>{especificacion}</TableCell>
    </TableRow>
  );
};
