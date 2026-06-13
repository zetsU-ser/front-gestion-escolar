import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';

// define el componente FilaPersonal para renderizar a un usuario
export const FilaPersonal = ({ usuario }) => {
  let especificacion = usuario.email; // guarda el email por defecto
  if (usuario.rol === 'DOCENTE') {
    especificacion = usuario.asignatura || 'Sin asignatura asignada'; // si es docente, usa la asignatura
  }
  
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
