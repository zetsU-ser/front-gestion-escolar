import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SchedulePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  overflowX: 'auto',
}));

const DIAS_SEMANA = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
const BLOQUES = [
  { id: 1, label: 'Bloque 1 (08:00 - 09:30)' },
  { id: 2, label: 'Bloque 2 (09:45 - 11:15)' },
  { id: 3, label: 'Bloque 3 (11:30 - 13:00)' },
  { id: 4, label: 'Bloque 4 (14:00 - 15:30)' }
];

export const VistaHorario = ({ cargasCurso, getDisplayData, onEliminar }) => {
  return (
    <SchedulePaper elevation={2}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Horario Semanal del Curso
      </Typography>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '15%', fontWeight: 'bold' }}>Bloque Horario</TableCell>
            {DIAS_SEMANA.map(dia => (
              <TableCell key={dia} align="center" sx={{ fontWeight: 'bold', width: '17%' }}>
                {dia}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {BLOQUES.map(bloque => (
            <TableRow key={bloque.id}>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                {bloque.label}
              </TableCell>
              {DIAS_SEMANA.map(dia => {
                // Buscar si existe una carga para este día y bloque
                const carga = cargasCurso.find(c => c.diaSemana === dia && c.bloqueHorario === bloque.id);
                
                if (!carga) {
                  return <TableCell key={`${dia}-${bloque.id}`} sx={{ borderRight: '1px solid #eee' }} />;
                }

                const data = getDisplayData(carga);
                return (
                  <TableCell key={carga.id} sx={{ borderRight: '1px solid #eee', bgcolor: '#e3f2fd', p: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '100%', minHeight: '80px', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">
                        {data.asignaturaStr}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {data.docenteStr}
                      </Typography>
                      <IconButton 
                        color="error" 
                        size="small" 
                        onClick={() => onEliminar(carga.id)}
                        sx={{ position: 'absolute', top: -4, right: -4 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SchedulePaper>
  );
};
