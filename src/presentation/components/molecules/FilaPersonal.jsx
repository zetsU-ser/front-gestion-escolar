import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';

// define el componente FilaPersonal para renderizar a un usuario
export const FilaPersonal = ({ usuario }) => {
  let especificacion = usuario.email; // guarda el email por defecto
  if (usuario.rol === 'DOCENTE') {
    const ASIGNATURAS = {
      1: "Matemáticas",
      2: "Lenguaje y Comunicación",
      3: "Historia y Geografía",
      4: "Ciencias Naturales",
      5: "Inglés"
    };
    especificacion = usuario.asignatura_id ? ASIGNATURAS[usuario.asignatura_id] : 'Sin asignatura asignada';
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
