import { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { StyledTableContainer, TableHeaderBox, HeaderCell, GroupHeaderRow, IndentedCell } from '../AdminDashboard.styles';

const GrupoCursos = ({ titulo, cursos, countAlumnos }) => {
  const [open, setOpen] = useState(true);
  if (cursos.length === 0) return null;
  return (
    <>
      <GroupHeaderRow onClick={() => setOpen(!open)}>
        <TableCell colSpan={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" fontWeight="bold">{titulo} ({cursos.length})</Typography>
            <IconButton size="small">{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
          </Box>
        </TableCell>
      </GroupHeaderRow>
      {open && cursos.map(c => (
        <TableRow key={c.id} hover>
          <IndentedCell>{c.nivel} {c.letra}</IndentedCell>
          <TableCell align="right"><Chip label={countAlumnos(c.id)} size="small" /></TableCell>
        </TableRow>
      ))}
    </>
  );
};

const GrupoAlumnos = ({ titulo, alumnos }) => {
  const [open, setOpen] = useState(true);
  if (alumnos.length === 0) return null;
  return (
    <>
      <GroupHeaderRow onClick={() => setOpen(!open)}>
        <TableCell colSpan={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" fontWeight="bold">{titulo} ({alumnos.length})</Typography>
            <IconButton size="small">{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
          </Box>
        </TableCell>
      </GroupHeaderRow>
      {open && alumnos.map(a => (
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
// renderiza la vista de tablasdetalleadmin
export const TablasDetalleAdmin = ({ metrica, personalFiltrado, cursosProps, alumnosProps }) => {
  if (!metrica) return null;

  if (metrica === 'personal') {
    return (
      <StyledTableContainer component={Paper}>
        <TableHeaderBox><Typography variant="h6">Detalle de Personal Registrado</Typography></TableHeaderBox>
        <Table>
          <TableHead><TableRow>
            <HeaderCell>Nombre Completo</HeaderCell>
            <HeaderCell>Rol</HeaderCell>
            <HeaderCell>Correo</HeaderCell>
            <HeaderCell>Especialidad / Ramo</HeaderCell>
          </TableRow></TableHead>
          <TableBody>
            {personalFiltrado.map(p => (
              <TableRow key={p.id} hover>
                <TableCell>{p.nombre} {p.apellido}</TableCell>
                <TableCell><Chip label={p.rol} size="small" color={p.rol === 'DOCENTE' ? 'secondary' : 'info'} /></TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.especialidad || 'N/A'}</TableCell>
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
          <TableHead><TableRow>
            <HeaderCell>Nombre del Curso</HeaderCell>
            <HeaderCell align="right">Estudiantes Matriculados</HeaderCell>
          </TableRow></TableHead>
          <TableBody>
            <GrupoCursos titulo="Educación Básica" cursos={cursosProps.cursosBasica} countAlumnos={cursosProps.countAlumnosCurso} />
            <GrupoCursos titulo="Educación Media" cursos={cursosProps.cursosMedia} countAlumnos={cursosProps.countAlumnosCurso} />
            <GrupoCursos titulo="Otros Niveles" cursos={cursosProps.cursosOtros} countAlumnos={cursosProps.countAlumnosCurso} />
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
          <TableHead><TableRow>
            <HeaderCell>Nombre del Alumno</HeaderCell>
            <HeaderCell>RUT</HeaderCell>
            <HeaderCell>Curso Asignado</HeaderCell>
            <HeaderCell>Apoderado</HeaderCell>
          </TableRow></TableHead>
          <TableBody>
            <GrupoAlumnos titulo="Educación Básica" alumnos={alumnosProps.alumnosBasica} />
            <GrupoAlumnos titulo="Educación Media" alumnos={alumnosProps.alumnosMedia} />
            <GrupoAlumnos titulo="Otros Niveles / Sin Asignar" alumnos={alumnosProps.alumnosOtros} />
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }
  
  return null;
};
