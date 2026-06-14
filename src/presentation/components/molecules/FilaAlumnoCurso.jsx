import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

// define el componente molécula para mostrar una fila individual de alumno matriculado
export const FilaAlumnoCurso = ({ asignacion, onDesvincular }) => {
  return (
    <TableRow hover>
      <TableCell>{asignacion.alumno?.rut}</TableCell>
      <TableCell>{asignacion.alumno?.nombre} {asignacion.alumno?.apellido}</TableCell>
      <TableCell>{asignacion.alumno?.nombreApoderado}</TableCell>
      <TableCell align="right">
        <IconButton 
          color="error" 
          onClick={() => onDesvincular(asignacion.id)} // maneja el borrado de la asignación
          size="small"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
