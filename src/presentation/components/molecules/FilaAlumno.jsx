import { TableRow, TableCell } from '@mui/material';

/**
 * Molécula: FilaAlumno
 * Renderiza una fila genérica para un alumno con RUT y Nombre, permitiendo
 * inyectar controles de asistencia o evaluaciones a través de 'children'.
 */
export const FilaAlumno = ({ alumno, children }) => {
  return (
    <TableRow hover>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{alumno.rut}</TableCell>
      <TableCell sx={{ fontWeight: 'medium' }}>
        {alumno.nombre} {alumno.apellido}
      </TableCell>
      {children}
    </TableRow>
  );
};
