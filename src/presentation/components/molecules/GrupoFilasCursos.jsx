import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { FilaSeparadora } from './FilaSeparadora';

// define el componente GrupoFilasCursos para renderizar un grupo colapsable
export const GrupoFilasCursos = ({ titulo, cursos = [], countAlumnos, isAbierto, onToggle }) => {
  if (cursos.length === 0) return null; // si no hay cursos, no renderiza nada

  return (
    <>
      <FilaSeparadora 
        titulo={titulo} 
        cantidad={cursos.length} // pasa la cantidad total de cursos al separador
        colSpan={2} 
        isAbierto={isAbierto} 
        onClick={onToggle} // pasa la función para abrir/cerrar
      />
      
      {isAbierto && cursos.map(c => ( // si está abierto, renderiza cada curso
        <TableRow key={c.id} hover>
          <TableCell>{c.nivel} {c.letra}</TableCell>
          <TableCell align="right" sx={{ color: 'text.secondary' }}>
            <Chip label={countAlumnos(c.id)} size="small" /> {/* muestra la cantidad de alumnos */}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
