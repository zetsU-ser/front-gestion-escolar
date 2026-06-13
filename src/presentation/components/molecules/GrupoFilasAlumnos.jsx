import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { FilaSeparadora } from './FilaSeparadora';

// define el componente GrupoFilasAlumnos para renderizar los alumnos por grupo
export const GrupoFilasAlumnos = ({ titulo, alumnos = [], isAbierto, onToggle }) => {
  if (alumnos.length === 0) return null; // si no hay alumnos en este grupo, no renderiza nada

  return (
    <>
      <FilaSeparadora 
        titulo={titulo} 
        cantidad={alumnos.length} // pasa la cantidad de alumnos
        colSpan={3} 
        isAbierto={isAbierto} 
        onClick={onToggle} // delega la acción de abrir/cerrar
      />
      
      {isAbierto && alumnos.map(a => ( // mapea los alumnos si la sección está abierta
        <TableRow key={a.id} hover>
          <TableCell>{a.nombre} {a.apellido}</TableCell>
          <TableCell>{a.rut}</TableCell>
          <TableCell>
            {a.cursoObj ? `${a.cursoObj.nivel} ${a.cursoObj.letra}` : 'Sin Curso'}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
