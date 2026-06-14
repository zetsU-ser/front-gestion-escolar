import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DetailWrapper, HeaderBox, StyledTableHeadRow, HeaderCell } from './TablaProfesor.styles';

const DIAS_SEMANA = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
const BLOQUES = [
  { id: 1, label: 'Bloque 1 (08:00 - 09:30)' },
  { id: 2, label: 'Bloque 2 (09:45 - 11:15)' },
  { id: 3, label: 'Bloque 3 (11:30 - 13:00)' },
  { id: 4, label: 'Bloque 4 (14:00 - 15:30)' }
];

export const VistaHorario = ({ cargasCurso, getDisplayData, onEliminar, titulo = "Horario Semanal del Curso" }) => {
  return (
    <DetailWrapper component={Paper} elevation={3}>
      <HeaderBox>
        <Typography variant="h6">
          {titulo}
        </Typography>
      </HeaderBox>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <StyledTableHeadRow>
            <HeaderCell sx={{ width: '15%' }}>Bloque Horario</HeaderCell>
            {DIAS_SEMANA.map(dia => (
              <HeaderCell key={dia} align="center" sx={{ width: '17%' }}>
                {dia}
              </HeaderCell>
            ))}
          </StyledTableHeadRow>
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
                      {onEliminar && (
                        <IconButton 
                          color="error" 
                          size="small" 
                          onClick={() => onEliminar(carga.id)}
                          sx={{ position: 'absolute', top: -4, right: -4 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DetailWrapper>
  );
};
