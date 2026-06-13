import { TableRow, TableCell } from '@mui/material';
import { SelectorEstado } from '../atoms/SelectorEstado';
import { CheckboxJustificar } from '../atoms/CheckboxJustificar';

/**
 * Molécula: FilaTablaAlumno
 * Fila para registrar asistencia de un alumno.
 */
export const FilaTablaAlumno = ({
  alumno,
  estado,
  justificado,
  onEstadoChange,
  onJustificarChange,
  disabled
}) => {
  return (
    <TableRow>
      <TableCell>{alumno.rut}</TableCell>
      <TableCell><strong>{alumno.nombre} {alumno.apellido}</strong></TableCell>
      <TableCell>
        <SelectorEstado
          value={estado}
          onChange={(val) => onEstadoChange(alumno.id, val)}
          disabled={disabled}
        />
      </TableCell>
      <TableCell>
        <CheckboxJustificar
          checked={justificado}
          onChange={(val) => onJustificarChange(alumno.id, val)}
          disabled={disabled || estado === 'PRESENTE'}
        />
      </TableCell>
    </TableRow>
  );
};
