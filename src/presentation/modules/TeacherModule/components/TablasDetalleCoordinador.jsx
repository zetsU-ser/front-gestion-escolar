import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useCollapsible } from '../../../shared/hooks/useCollapsible';
import { StyledTableContainer, TableHeaderBox, HeaderCell, GroupHeaderRow, IndentedCell } from '../CoordinadorDashboard.styles';

const GrupoCursos = ({ titulo, cursos, countAlumnos }) => {
  const { isOpen, toggle } = useCollapsible(true);
  if (cursos.length === 0) return null;

  return (
    <>
      <GroupHeaderRow onClick={toggle}>
        <TableCell colSpan={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" fontWeight="bold">{titulo} ({cursos.length})</Typography>
            <IconButton size="small">{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
          </Box>
        </TableCell>
      </GroupHeaderRow>
      {isOpen && cursos.map(c => (
        <TableRow key={c.id} hover>
          <IndentedCell>{c.nivel} {c.letra}</IndentedCell>
          <TableCell align="right"><Chip label={countAlumnos(c.id)} size="small" /></TableCell>
        </TableRow>
      ))}
    </>
  );
};

const GrupoAlumnos = ({ titulo, alumnos }) => {
  const { isOpen, toggle } = useCollapsible(true);
  if (alumnos.length === 0) return null;

  return (
    <>
      <GroupHeaderRow onClick={toggle}>
        <TableCell colSpan={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" fontWeight="bold">{titulo} ({alumnos.length})</Typography>
            <IconButton size="small">{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
          </Box>
        </TableCell>
      </GroupHeaderRow>
      {isOpen && alumnos.map(a => (
        <TableRow key={a.id} hover>
          <IndentedCell>{a.nombre} {a.apellido}</IndentedCell>
          <TableCell>{a.rut}</TableCell>
          <TableCell>{a.cursoObj ? `${a.cursoObj.nivel} ${a.cursoObj.letra}` : 'Sin Curso'}</TableCell>
          <TableCell>{a.nombreApoderado || 'No Registrado'}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

// VIEW PATTERN
// renderiza la vista de tablasdetallecoordinador
export const TablasDetalleCoordinador = ({ metrica, docentes, cursosBasica, cursosMedia, cursosOtros, countAlumnosCurso, alumnosBasica, alumnosMedia, alumnosOtros }) => {
  if (!metrica) return null;

  if (metrica === 'docentes') {
    return (
      <StyledTableContainer component={Paper}>
        <TableHeaderBox><Typography variant="h6">Detalle de Docentes</Typography></TableHeaderBox>
        <Table>
          <TableHead><TableRow><HeaderCell>Nombre Completo</HeaderCell><HeaderCell>Rol</HeaderCell><HeaderCell>Correo</HeaderCell><HeaderCell>Especialidad / Ramo</HeaderCell></TableRow></TableHead>
          <TableBody>
            {docentes.map(d => (
              <TableRow key={d.id} hover>
                <TableCell>{d.nombre} {d.apellido}</TableCell>
                <TableCell><Chip label={d.rol} size="small" color="secondary" /></TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>{d.especialidad || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }

  if (metrica === 'cursos') {
    return (
      <StyledTableContainer component={Paper}>
        <TableHeaderBox><Typography variant="h6">Desglose de Cursos Registrados</Typography></TableHeaderBox>
        <Table>
          <TableHead><TableRow><HeaderCell>Nombre del Curso</HeaderCell><HeaderCell align="right">Estudiantes Matriculados</HeaderCell></TableRow></TableHead>
          <TableBody>
            <GrupoCursos titulo="Educación Básica" cursos={cursosBasica} countAlumnos={countAlumnosCurso} />
            <GrupoCursos titulo="Educación Media" cursos={cursosMedia} countAlumnos={countAlumnosCurso} />
            <GrupoCursos titulo="Otros Niveles" cursos={cursosOtros} countAlumnos={countAlumnosCurso} />
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }

  if (metrica === 'alumnos') {
    return (
      <StyledTableContainer component={Paper}>
        <TableHeaderBox><Typography variant="h6">Distribución de Alumnos Matriculados</Typography></TableHeaderBox>
        <Table>
          <TableHead><TableRow><HeaderCell>Nombre del Alumno</HeaderCell><HeaderCell>RUT</HeaderCell><HeaderCell>Curso Asignado</HeaderCell><HeaderCell>Apoderado</HeaderCell></TableRow></TableHead>
          <TableBody>
            <GrupoAlumnos titulo="Educación Básica" alumnos={alumnosBasica} />
            <GrupoAlumnos titulo="Educación Media" alumnos={alumnosMedia} />
            <GrupoAlumnos titulo="Otros Niveles / Sin Asignar" alumnos={alumnosOtros} />
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }
  return null;
};
