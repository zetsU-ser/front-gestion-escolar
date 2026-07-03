import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DIAS_SEMANA, BLOQUES } from '../hooks/useProfesorDashboardViewModel';
import { 
  StyledTableContainer, TableHeaderBox, StyledTable, HeaderCell, 
  BloqueHeaderCell, DiaHeaderCell, BloqueLabelCell, EmptyCargaCell, 
  CargaCell, CargaBox 
} from '../ProfesorDashboard.styles';

// VIEW PATTERN
// renderiza la vista de tablasdetalleprofesor
export const TablasDetalleProfesor = ({ metrica, misCursos, miHorario, countAlumnos, getDisplayData }) => {
  if (!metrica) return null;

  if (metrica === 'horario') {
    return (
      <StyledTableContainer component={Paper}>
        <TableHeaderBox><Typography variant="h6">Horario Semanal Docente</Typography></TableHeaderBox>
        <StyledTable>
          <TableHead>
            <TableRow>
              <BloqueHeaderCell>Bloque Horario</BloqueHeaderCell>
              {DIAS_SEMANA.map(dia => <DiaHeaderCell key={dia}>{dia}</DiaHeaderCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {BLOQUES.map(bloque => (
              <TableRow key={bloque.id}>
                <BloqueLabelCell>{bloque.label}</BloqueLabelCell>
                {DIAS_SEMANA.map(dia => {
                  const carga = miHorario.find(c => {
                    const matchDia = String(c.diaSemana).toUpperCase() === dia.toUpperCase();
                    const matchBloqueId = Number(c.bloqueHorario) === Number(bloque.id);
                    const matchBloqueTexto = bloque.label.includes(String(c.bloqueHorario));
                    return matchDia && (matchBloqueId || matchBloqueTexto);
                  });
                  if (!carga) return <EmptyCargaCell key={`${dia}-${bloque.id}`} />;
                  const data = getDisplayData(carga);
                  return (
                    <CargaCell key={carga.id}>
                      <CargaBox>
                        <Typography variant="body2" fontWeight="bold" color="primary.main">{data.asignaturaStr}</Typography>
                        <Typography variant="caption" color="textSecondary">{data.docenteStr}</Typography>
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
  }

  if (metrica === 'cursos') {
    return (
      <StyledTableContainer component={Paper}>
        <TableHeaderBox><Typography variant="h6">Mis Cursos Asignados</Typography></TableHeaderBox>
        <Table>
          <TableHead><TableRow><HeaderCell>Nombre del Curso</HeaderCell><HeaderCell>Estudiantes Matriculados</HeaderCell></TableRow></TableHead>
          <TableBody>
            {misCursos.length === 0 ? (
              <TableRow><TableCell colSpan={2} align="center">No hay registros disponibles.</TableCell></TableRow>
            ) : (
              misCursos.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.nivel} {c.letra}</TableCell>
                  <TableCell>{countAlumnos(c.id)} Registros</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }
  return null;
};
