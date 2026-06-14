import { TablaProfesor } from './TablaProfesor';
import { FilaAlumno } from '../molecules/FilaAlumno';
import { TableCell, Typography } from '@mui/material';
import { InputNota } from '../atoms/InputNota';
import { calcularPromedio } from '../../../application/utils/promediosUtil';

/**
 * Organismo: TablaEvaluaciones
 * Renderiza la matriz completa de calificaciones de un curso utilizando estructuras reutilizables.
 */
export const TablaEvaluaciones = ({
  alumnos,
  estadoNotas, // Objeto { alumnoId: { nota1, nota2, nota3 } }
  onNotaChange,
  disabled
}) => {
  const headers = ['RUT', 'Alumno', 'Evaluación 1', 'Evaluación 2', 'Evaluación 3', 'Promedio Final'];

  return (
    <TablaProfesor
      titulo="Registro de Calificaciones (1.0 - 7.0)"
      headers={headers}
      isEmpty={alumnos.length === 0}
      colSpanEmpty={headers.length}
    >
      {alumnos.map(alumno => {
        const notas = estadoNotas[alumno.id] || { nota1: '', nota2: '', nota3: '' };
        return (
          <FilaAlumno key={alumno.id} alumno={alumno}>
            <TableCell>
              <InputNota
                value={notas.nota1}
                onChange={(val) => onNotaChange(alumno.id, 'nota1', val)}
                disabled={disabled}
              />
            </TableCell>
            <TableCell>
              <InputNota
                value={notas.nota2}
                onChange={(val) => onNotaChange(alumno.id, 'nota2', val)}
                disabled={disabled}
              />
            </TableCell>
            <TableCell>
              <InputNota
                value={notas.nota3}
                onChange={(val) => onNotaChange(alumno.id, 'nota3', val)}
                disabled={disabled}
              />
            </TableCell>
            <TableCell align="center">
              <Typography 
                fontWeight="bold" 
                color={
                  calcularPromedio([notas.nota1, notas.nota2, notas.nota3]) < 4.0 && calcularPromedio([notas.nota1, notas.nota2, notas.nota3]) !== '-' 
                    ? 'error.main' 
                    : 'primary.main'
                }
              >
                {calcularPromedio([notas.nota1, notas.nota2, notas.nota3])}
              </Typography>
            </TableCell>
          </FilaAlumno>
        );
      })}
    </TablaProfesor>
  );
};
