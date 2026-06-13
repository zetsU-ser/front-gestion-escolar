import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { FilaTablaEvaluacion } from '../molecules/FilaTablaEvaluacion';

/**
 * Organismo: TablaEvaluaciones
 * Renderiza la matriz completa de calificaciones de un curso.
 */
export const TablaEvaluaciones = ({
  alumnos,
  estadoNotas, // Objeto { alumnoId: { nota1, nota2, nota3 } }
  onNotaChange,
  disabled
}) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '12px', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Registro de Calificaciones (1.0 - 7.0)
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>RUT</TableCell>
            <TableCell>Alumno</TableCell>
            <TableCell>Evaluación 1</TableCell>
            <TableCell>Evaluación 2</TableCell>
            <TableCell>Evaluación 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No hay alumnos matriculados en este curso.</TableCell>
            </TableRow>
          ) : (
            alumnos.map(alumno => {
              const notas = estadoNotas[alumno.id] || { nota1: '', nota2: '', nota3: '' };
              return (
                <FilaTablaEvaluacion
                  key={alumno.id}
                  alumno={alumno}
                  notas={notas}
                  onNotaChange={onNotaChange}
                  disabled={disabled}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
