import { TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TablePaper, StyledTableHeader, HeaderCell, EmptyRowCell, StyledTable } from '../AlumnosTable.styles';
import { calcularEdad } from '../../../../application/utils/dateUtils';

// VIEW PATTERN
// renderiza la vista de alumnosgrid
export const AlumnosGrid = ({ alumnosFiltrados, handleOpen, handleEliminar }) => {
  return (
    <TablePaper component={Paper}>
      <StyledTable>
        <StyledTableHeader>
          <TableRow>
            <HeaderCell>RUT</HeaderCell>
            <HeaderCell>Nombre Completo</HeaderCell>
            <HeaderCell>Edad</HeaderCell>
            <HeaderCell>Apoderado</HeaderCell>
            <HeaderCell>Email Apoderado</HeaderCell>
            <HeaderCell>Teléfono</HeaderCell>
            <HeaderCell align="right">Acciones</HeaderCell>
          </TableRow>
        </StyledTableHeader>
        <TableBody>
          {alumnosFiltrados.length === 0 ? (
            <TableRow>
              <EmptyRowCell colSpan={7} align="center">No hay alumnos registrados.</EmptyRowCell>
            </TableRow>
          ) : (
            alumnosFiltrados.map((alumno) => (
              <TableRow key={alumno.id} hover>
                <TableCell>{alumno.rut}</TableCell>
                <TableCell>{alumno.nombre} {alumno.apellido}</TableCell>
                <TableCell>{alumno.edad ? alumno.edad : calcularEdad(alumno.fechaNacimiento)}</TableCell>
                <TableCell>{alumno.nombreApoderado}</TableCell>
                <TableCell>{alumno.emailApoderado}</TableCell>
                <TableCell>{alumno.telefonoApoderado}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(alumno)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleEliminar(alumno.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </TablePaper>
  );
};
