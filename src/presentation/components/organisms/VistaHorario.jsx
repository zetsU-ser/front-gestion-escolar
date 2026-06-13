import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SchedulePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  overflowX: 'auto',
}));

/**
 * Organismo: VistaHorario
 * Muestra el horario del curso seleccionado.
 */
export const VistaHorario = ({ cargasCurso, getDisplayData, onEliminar }) => {
  return (
    <SchedulePaper elevation={2}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Horario del Curso (Bloques Configurados)
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Día</TableCell>
            <TableCell>Bloque</TableCell>
            <TableCell>Asignatura</TableCell>
            <TableCell>Docente</TableCell>
            <TableCell align="right">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cargasCurso.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No hay asignaciones en el horario de este curso.</TableCell>
            </TableRow>
          ) : (
            cargasCurso.map(carga => {
              const data = getDisplayData(carga);
              return (
                <TableRow key={carga.id}>
                  <TableCell><strong>{data.diaStr}</strong></TableCell>
                  <TableCell>{data.bloqueStr}</TableCell>
                  <TableCell>{data.asignaturaStr}</TableCell>
                  <TableCell>{data.docenteStr}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => onEliminar(carga.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </SchedulePaper>
  );
};
