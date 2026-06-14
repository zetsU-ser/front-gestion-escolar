import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack, PersonAdd } from '@mui/icons-material';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useAsignacionesAlumnos } from '../../../application/use-cases/useAsignacionesAlumnos';
import { useAlumnosCurso } from '../../../application/use-cases/useAlumnosCurso';
import { TablaAlumnosCurso } from '../../components/organisms/TablaAlumnosCurso';
import { ModalMatricularAlumno } from '../../components/organisms/ModalMatricularAlumno';
import { 
  MainContainer, 
  BackButton, 
  HeaderPaper, 
  HeaderStack, 
  TitleText 
} from './AlumnosCursoView.styles';

// vista principal para gestionar los alumnos de un curso específico (presenter)
export const AlumnosCursoView = () => {
  const { cursoId } = useParams(); // obtiene el id del curso desde la ruta
  const navigate = useNavigate();

  // hooks y lógica de negocio abstraída
  const { curso, asignaciones, loading, asignarAlumno, desvincularAlumno } = useAlumnosCurso(cursoId);
  const { alumnos } = useAlumnos();
  const { asignaciones: asignacionesGlobales, cargarAsignaciones: recargarAsignacionesGlobales } = useAsignacionesAlumnos();

  const [openSelector, setOpenSelector] = useState(false); // estado del modal

  // coordina la asignación y recarga el estado global
  const handleAsignar = async (alumnoId) => {
    try {
      await asignarAlumno(alumnoId);
      recargarAsignacionesGlobales();
    } catch (err) {
      alert("Error al asignar: " + err.message);
    }
  };

  // coordina la desvinculación y recarga el estado global
  const handleDesvincular = async (id) => {
    await desvincularAlumno(id);
    recargarAsignacionesGlobales();
  };

  if (loading || !curso) return <Typography sx={{ p: 4 }}>Cargando información del curso...</Typography>;

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
            onClick={() => setOpenSelector(true)} // abre el modal
          >
            Matricular Alumno
          </Button>
        </HeaderStack>
      </HeaderPaper>

      {/* organismo para la tabla de registros */}
      <TablaAlumnosCurso 
        asignaciones={asignaciones} 
        onDesvincular={handleDesvincular} 
      />

      {/* organismo modal aislado */}
      <ModalMatricularAlumno 
        open={openSelector} 
        onClose={() => setOpenSelector(false)} 
        alumnos={alumnos} 
        asignacionesGlobales={asignacionesGlobales} 
        onAsignar={handleAsignar} 
      />
    </MainContainer>
  );
};

