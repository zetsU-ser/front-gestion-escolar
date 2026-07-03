import { Paper, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { TablePaper, StyledTableHead, WhiteTableCell, EmptyRowCell } from '../AlumnosCursoView.styles';

// VIEW PATTERN
// renderiza la vista de tablaasignaciones
export const TablaAsignaciones = ({ asignaciones, handleDesvincular }) => {
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
              <EmptyRowCell colSpan={4} align="center">No hay alumnos asignados a este curso todavía.</EmptyRowCell>
            </TableRow>
          ) : (
            asignaciones.map((asig) => (
              <TableRow hover key={asig.id}>
                <TableCell>{asig.alumno?.rut}</TableCell>
                <TableCell>{asig.alumno?.nombre} {asig.alumno?.apellido}</TableCell>
                <TableCell>{asig.alumno?.nombreApoderado}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDesvincular(asig.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TablePaper>
  );
};
