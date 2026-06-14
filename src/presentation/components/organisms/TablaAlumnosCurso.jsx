import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableRow,
  TableCell
} from '@mui/material';
import { FilaAlumnoCurso } from '../molecules/FilaAlumnoCurso';
import { 
  TablePaper, 
  StyledTableHead, 
  WhiteTableCell, 
  EmptyRowCell 
} from '../../modules/AlumnosCursoModule/AlumnosCursoView.styles';

// define el organismo para la tabla de alumnos asignados a un curso
export const TablaAlumnosCurso = ({ asignaciones = [], onDesvincular }) => {
  return (
    <TablePaper component={Paper}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <WhiteTableCell>RUT</WhiteTableCell>
            <WhiteTableCell>Nombre Alumno</WhiteTableCell>
            <WhiteTableCell>Apoderado</WhiteTableCell>
            <WhiteTableCell align="right">Acciones</WhiteTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {asignaciones.length === 0 ? (
            <TableRow>
              <EmptyRowCell colSpan={4} align="center">
                No hay alumnos asignados a este curso todavía.
              </EmptyRowCell>
            </TableRow>
          ) : (
            asignaciones.map((asig) => ( // renderiza la molécula fila por cada alumno
              <FilaAlumnoCurso 
                key={asig.id} 
                asignacion={asig} 
                onDesvincular={onDesvincular} 
              />
            ))
          )}
        </TableBody>
      </Table>
    </TablePaper>
  );
};
