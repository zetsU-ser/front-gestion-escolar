import { Paper, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DIAS_SEMANA, BLOQUES } from '../hooks/useCargaAcademicaViewModel';
import { 
  StyledTableContainer, TableHeaderBox, StyledTable, BloqueHeaderCell, 
  DiaHeaderCell, BloqueLabelCell, EmptyCargaCell, CargaCell, 
  CargaBox, DeleteIconButton 
} from './TablaHorario.styles';

// VIEW PATTERN
// renderiza la vista de tablahorario
export const TablaHorario = ({ cargasCurso, getDisplayData, handleEliminar }) => {
  return (
    <StyledTableContainer component={Paper} elevation={3}>
      <TableHeaderBox>
        <Typography variant="h6">Horario Semanal del Curso</Typography>
      </TableHeaderBox>
      <StyledTable>
        <TableHead>
          <TableRow>
            <BloqueHeaderCell>Bloque Horario</BloqueHeaderCell>
            {DIAS_SEMANA.map(dia => (
              <DiaHeaderCell key={dia}>{dia}</DiaHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {BLOQUES.map(bloque => (
            <TableRow key={bloque.id}>
              <BloqueLabelCell>{bloque.label}</BloqueLabelCell>
              {DIAS_SEMANA.map(dia => {
                const carga = cargasCurso.find(c => c.diaSemana === dia && String(c.bloqueHorario) === String(bloque.id));
                if (!carga) return <EmptyCargaCell key={`${dia}-${bloque.id}`} />;
                
                const data = getDisplayData(carga);
                return (
                  <CargaCell key={carga.id}>
                    <CargaBox>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">{data.asignaturaStr}</Typography>
                      <Typography variant="caption" color="textSecondary">{data.docenteStr}</Typography>
                      <DeleteIconButton color="error" size="small" onClick={() => handleEliminar(carga.id)}>
                        <DeleteIcon fontSize="small" />
                      </DeleteIconButton>
                    </CargaBox>
                  </CargaCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
