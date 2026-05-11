import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { ArrowBack, PersonAdd, Delete } from '@mui/icons-material';
import { alumnoCursoRepository, cursoRepository } from '../../../infrastructure/repositories/HttpCursosRepository';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { 
  MainContainer, 
  BackButton, 
  HeaderPaper, 
  HeaderStack, 
  TitleText, 
  TablePaper, 
  StyledTableHead, 
  WhiteTableCell, 
  EmptyRowCell 
} from './AlumnosCursoView.styles';

export const AlumnosCursoView = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);
  const [openSelector, setOpenSelector] = useState(false);
  const { alumnos } = useAlumnos();

  const cargarDatos = async () => {
    try {
      const cursos = await cursoRepository.getAll();
      const current = cursos.find(c => c.id === parseInt(cursoId));
      setCurso(current);

      const lista = await alumnoCursoRepository.getByCurso(cursoId);
      setAsignaciones(Array.isArray(lista) ? lista : []);
    } catch (err) {
      console.error("Error al cargar datos del curso:", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [cursoId]);

  const handleAsignar = async (alumnoId) => {
    try {
      await alumnoCursoRepository.asignar({
        alumno: { id: alumnoId },
        curso: { id: parseInt(cursoId) }
      });
      setOpenSelector(false); // Cierre buscador
      cargarDatos(); // Actualizacion tabla
    } catch (err) {
      alert("Error al asignar: " + err.message);
    }
  };

  const handleDesvincular = async (id) => {
    if (window.confirm("¿Deseas quitar al alumno de este curso?")) {
      await alumnoCursoRepository.desvincular(id);
      cargarDatos();
    }
  };
  if (!curso) return <Typography sx={{ p: 4 }}>Cargando información del curso...</Typography>;

  return (
    <MainContainer>
      <BackButton startIcon={<ArrowBack />} onClick={() => navigate('/cursos')}>
        Volver a Cursos
      </BackButton>
      <HeaderPaper elevation={2}>
        <HeaderStack direction="row">
          <Box>
            <TitleText variant="h4">
              {curso.nivel} {curso.letra}
            </TitleText>
            <Typography color="textSecondary">Lista de Alumnos Matriculados</Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<PersonAdd />} 
            onClick={() => setOpenSelector(true)}
          >
            Matricular Alumno
          </Button>
        </HeaderStack>
      </HeaderPaper>
      <TablePaper component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <WhiteTableCell>RUT</WhiteTableCell>
              <WhiteTableCell>Nombre Alumno</WhiteTableCell>
              <WhiteTableCell>Apoderado</WhiteTableCell>
              <WhiteTableCell align="right">Acciones</WhiteTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {asignaciones.length === 0 ? (
              <TableRow>
                <EmptyRowCell colSpan={4} align="center">
                  No hay alumnos asignados a este curso todavía.
                </EmptyRowCell>
              </TableRow>
            ) : (
              asignaciones.map((asig) => (
                <TableRow key={asig.id}>
                  <TableCell>{asig.alumno?.rut}</TableCell>
                  <TableCell>{asig.alumno?.nombre} {asig.alumno?.apellido}</TableCell>
                  <TableCell>{asig.alumno?.nombreApoderado}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDesvincular(asig.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TablePaper>
      <Dialog open={openSelector} onClose={() => setOpenSelector(false)} fullWidth maxWidth="xs">
        <DialogTitle>Seleccionar Alumno para Matricular</DialogTitle>
        <DialogContent dividers>
          <List>
            {alumnos
              .filter(a => !asignaciones.some(asig => asig.alumno?.id === a.id))
              .map((alumno) => (
                <Box key={alumno.id}>
                  <ListItemButton onClick={() => handleAsignar(alumno.id)}>
                    <ListItemText 
                      primary={`${alumno.nombre} ${alumno.apellido}`} 
                      secondary={`RUT: ${alumno.rut}`}
                    />
                  </ListItemButton>
                  <Divider />
                </Box>
              ))}
            {alumnos.filter(a => !asignaciones.some(asig => asig.alumno?.id === a.id)).length === 0 && (
              <Typography sx={{ p: 2, textAlign: 'center' }} color="textSecondary">
                No hay más alumnos disponibles para asignar.
              </Typography>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
};
