import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Groups as GroupsIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { 
  CursosTableContainer, HeaderBox, HeaderCell, EmptyStatePaper, 
  GroupHeaderRow, IndentedCell, ActionButton 
} from './CursosGrid.styles';

const GrupoCursosGestion = ({ titulo, cursos, countAlumnos, onDelete, onNavigate }) => {
  const [open, setOpen] = useState(true);
  if (cursos.length === 0) return null;

  return (
    <>
      <GroupHeaderRow onClick={() => setOpen(!open)}>
        <TableCell colSpan={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" fontWeight="bold">{titulo} ({cursos.length})</Typography>
            <IconButton size="small">{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
          </Box>
        </TableCell>
      </GroupHeaderRow>
      {open && cursos.map(c => (
        <TableRow key={c.id} hover>
          <IndentedCell>{c.nivel} {c.letra}</IndentedCell>
          <TableCell><Chip label={countAlumnos(c.id)} size="small" /></TableCell>
          <TableCell align="right">
            <ActionButton startIcon={<GroupsIcon />} size="small" variant="outlined" onClick={() => onNavigate(`/alumnos-curso/${c.id}`)}>Ver Alumnos</ActionButton>
            <IconButton color="error" onClick={() => onDelete(c.id)} size="small"><DeleteIcon /></IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

// VIEW PATTERN
// renderiza la vista de cursosgrid
export const CursosGrid = ({ cursos, cursosBasica, cursosMedia, cursosOtros, countAlumnos, handleDelete, navigate }) => {
  if (cursos.length === 0) {
    return (
      <EmptyStatePaper>
        <Typography color="textSecondary">No hay cursos creados todavía.</Typography>
      </EmptyStatePaper>
    );
  }

  return (
    <CursosTableContainer>
      <HeaderBox>
        <Typography variant="h6">Listado de Cursos Registrados</Typography>
      </HeaderBox>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>Nombre del Curso</HeaderCell>
            <HeaderCell>Estudiantes Matriculados</HeaderCell>
            <HeaderCell align="right">Acciones</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <GrupoCursosGestion titulo="Educación Básica" cursos={cursosBasica} countAlumnos={countAlumnos} onDelete={handleDelete} onNavigate={navigate} />
          <GrupoCursosGestion titulo="Educación Media" cursos={cursosMedia} countAlumnos={countAlumnos} onDelete={handleDelete} onNavigate={navigate} />
          <GrupoCursosGestion titulo="Otros Niveles" cursos={cursosOtros} countAlumnos={countAlumnos} onDelete={handleDelete} onNavigate={navigate} />
        </TableBody>
      </Table>
    </CursosTableContainer>
  );
};
