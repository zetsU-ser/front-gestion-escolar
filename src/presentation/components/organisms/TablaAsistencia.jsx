import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { FilaTablaAlumno } from '../molecules/FilaTablaAlumno';

/**
 * Organismo: TablaAsistencia
 * Renderiza la matriz completa de asistencia de un curso.
 */
export const TablaAsistencia = ({
  alumnos,
  estadoAsistencia, // Objeto { alumnoId: { estado, justificado } }
  onEstadoChange,
  onJustificarChange,
  disabled
}) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '12px', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Listado de Alumnos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>RUT</TableCell>
            <TableCell>Alumno</TableCell>
            <TableCell>Asistencia</TableCell>
            <TableCell>Justificación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No hay alumnos matriculados en este curso.</TableCell>
            </TableRow>
          ) : (
            alumnos.map(alumno => {
              const asis = estadoAsistencia[alumno.id] || { estado: 'PRESENTE', justificado: false };
              return (
                <FilaTablaAlumno
                  key={alumno.id}
                  alumno={alumno}
                  estado={asis.estado}
                  justificado={asis.justificado}
                  onEstadoChange={onEstadoChange}
                  onJustificarChange={onJustificarChange}
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
