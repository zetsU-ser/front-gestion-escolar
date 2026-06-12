import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

/**
 * Organismo: TablaHorario
 * Renderiza el horario semanal del profesor en solo lectura.
 */
export const TablaHorario = ({ horarioData, getDisplayData }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '12px', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Mi Horario Semanal
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Día</TableCell>
            <TableCell>Bloque</TableCell>
            <TableCell>Curso</TableCell>
            <TableCell>Asignatura</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horarioData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No tienes carga académica asignada.</TableCell>
            </TableRow>
          ) : (
            horarioData.map(carga => {
              const data = getDisplayData(carga);
              return (
                <TableRow key={carga.id}>
                  <TableCell><strong>{data.diaStr}</strong></TableCell>
                  <TableCell>{data.bloqueStr}</TableCell>
                  <TableCell>{data.cursoStr}</TableCell>
                  <TableCell>{data.asignaturaStr}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
