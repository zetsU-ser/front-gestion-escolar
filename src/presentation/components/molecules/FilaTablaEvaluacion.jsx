import { TableRow, TableCell } from '@mui/material';
import { InputNota } from '../atoms/InputNota';

/**
 * Molécula: FilaTablaEvaluacion
 * Fila para registrar las 3 evaluaciones obligatorias de un alumno.
 */
export const FilaTablaEvaluacion = ({
  alumno,
  notas, // array de 3 elementos o objeto {n1, n2, n3}
  onNotaChange,
  disabled
}) => {
  return (
    <TableRow>
      <TableCell>{alumno.rut}</TableCell>
      <TableCell><strong>{alumno.nombre} {alumno.apellido}</strong></TableCell>
      <TableCell>
        <InputNota
          value={notas.nota1 || ''}
          onChange={(val) => onNotaChange(alumno.id, 'nota1', val)}
          disabled={disabled}
        />
      </TableCell>
      <TableCell>
        <InputNota
          value={notas.nota2 || ''}
          onChange={(val) => onNotaChange(alumno.id, 'nota2', val)}
          disabled={disabled}
        />
      </TableCell>
      <TableCell>
        <InputNota
          value={notas.nota3 || ''}
          onChange={(val) => onNotaChange(alumno.id, 'nota3', val)}
          disabled={disabled}
        />
      </TableCell>
    </TableRow>
  );
};
