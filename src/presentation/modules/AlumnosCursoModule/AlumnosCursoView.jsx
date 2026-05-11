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
  // --- PARÁMETROS Y NAVEGACIÓN ---
  const { cursoId } = useParams(); // ID obtenido de la URL (p.ej: /alumnos-curso/5)
  const navigate = useNavigate();

  // --- GESTIÓN DE ESTADO ---
  // Datos del curso actual (Nivel y Letra) para el encabezado
  const [curso, setCurso] = useState(null);
  
  // Lista de alumnos que ya están matriculados en este curso
  const [asignaciones, setAsignaciones] = useState([]);
  
  // Control de apertura del selector de nuevos alumnos
  const [openSelector, setOpenSelector] = useState(false);
  
  // Hook que trae todos los alumnos del sistema para poder seleccionarlos
  const { alumnos } = useAlumnos();

  // --- LÓGICA DE NEGOCIO ---
  /**
   * Carga la información del curso y la lista de alumnos asignados.
   * Nota: Debido a limitaciones del backend, el filtrado se realiza en el frontend.
   */
  const cargarDatos = async () => {
    try {
      // 1. Obtener datos del curso para el título
      const cursos = await cursoRepository.getAll();
      const current = cursos.find(c => c.id === parseInt(cursoId));
      setCurso(current);

      // 2. Obtener asignaciones y filtrar por curso en el cliente
      const lista = await alumnoCursoRepository.getByCurso(cursoId);
      setAsignaciones(Array.isArray(lista) ? lista : []);
    } catch (err) {
      console.error("Error al cargar datos del curso:", err);
    }
  };

  // Efecto inicial: Carga los datos cuando el componente se monta o cambia el ID
  useEffect(() => {
    cargarDatos();
  }, [cursoId]);

  /**
   * Procesa la matrícula de un alumno en el curso actual.
   */
  const handleAsignar = async (alumnoId) => {
    try {
      await alumnoCursoRepository.asignar({
        alumno: { id: alumnoId },
        curso: { id: parseInt(cursoId) }
      });
      setOpenSelector(false); // Cierra el buscador
      cargarDatos(); // Refresca la tabla
    } catch (err) {
      alert("Error al asignar: " + err.message);
    }
  };

  /**
   * Elimina la asignación (matrícula) de un alumno del curso.
   */
  const handleDesvincular = async (id) => {
    if (window.confirm("¿Deseas quitar al alumno de este curso?")) {
      await alumnoCursoRepository.desvincular(id);
      cargarDatos();
    }
  };

  // Renderizado de seguridad mientras se obtienen los datos
  if (!curso) return <Typography sx={{ p: 4 }}>Cargando información del curso...</Typography>;

  return (
    <MainContainer>
      {/* NAVEGACIÓN SUPERIOR */}
      <BackButton startIcon={<ArrowBack />} onClick={() => navigate('/cursos')}>
        Volver a Cursos
      </BackButton>

      {/* CABECERA DINÁMICA */}
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

      {/* TABLA DE ALUMNOS MATRICULADOS */}
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

      {/* DIALOG SELECTOR: Solo muestra alumnos que NO están en el curso actual */}
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
            {/* Mensaje cuando todos los alumnos ya están matriculados */}
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
