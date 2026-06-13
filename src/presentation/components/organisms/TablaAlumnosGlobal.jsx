import { Table, TableBody, TableRow, Paper } from '@mui/material';
import { FilaAlumnoGlobal } from '../molecules/FilaAlumnoGlobal';
import { TablePaper, StyledTableHeader, HeaderCell, EmptyRowCell } from '../../modules/AlumnosModule/AlumnosTable.styles';

// define el componente organismo TablaAlumnosGlobal que agrupa múltiples filas
export const TablaAlumnosGlobal = ({ alumnos, onEdit, onDelete }) => {
  return (
    <TablePaper component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <StyledTableHeader>
          <TableRow>
            <HeaderCell>RUT</HeaderCell>
            <HeaderCell>Nombre Completo</HeaderCell>
            <HeaderCell>Apoderado</HeaderCell>
            <HeaderCell>Email Apoderado</HeaderCell>
            <HeaderCell>Teléfono</HeaderCell>
            <HeaderCell align="right">Acciones</HeaderCell>
          </TableRow>
        </StyledTableHeader>
        <TableBody>
          {alumnos.length === 0 ? (
            <TableRow>
              {/* muestra un mensaje si no hay alumnos registrados */}
              <EmptyRowCell colSpan={6} align="center">
                No hay alumnos registrados.
              </EmptyRowCell>
            </TableRow>
          ) : (
            // itera sobre el arreglo de alumnos para renderizar cada fila
            alumnos.map((alumno) => (
              <FilaAlumnoGlobal
                key={alumno.id}
                alumno={alumno}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TablePaper>
  );
};
