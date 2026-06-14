import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ArrowBack, PersonAdd } from '@mui/icons-material';
import { AuthContext } from '../../../application/context/AuthContext';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useAsignacionesAlumnos } from '../../../application/use-cases/useAsignacionesAlumnos';
import { useAlumnosCurso } from '../../../application/use-cases/useAlumnosCurso';

import { TablaAlumnosCurso } from '../../components/organisms/TablaAlumnosCurso';
import { ModalMatricularAlumno } from '../../components/organisms/ModalMatricularAlumno';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import {
  MainContainer, 
  BackButton, 
  HeaderPaper, 
  HeaderStack, 
  TitleText,
  LoadingText,
  SubtitleText,
  EnrollButton,
  TitleBox,
  StyledDivider
} from './AlumnosCursoView.styles';

// vista principal para gestionar los alumnos de un curso específico (presenter)
export const AlumnosCursoView = () => {
  const { currentUser } = useContext(AuthContext);

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

  if (loading || !curso) return <LoadingText>Cargando información del curso...</LoadingText>;

  return (
    <MainContainer>
      <HeaderModulo 
        titulo="Gestión de Curso Específico"
        correo={currentUser?.email}
      />
      <StyledDivider />

      <BackButton startIcon={<ArrowBack />} onClick={() => navigate('/cursos')}>
        Volver a Cursos
      </BackButton>
      <HeaderPaper elevation={2}>
        <HeaderStack direction="row">
          <TitleBox>
            <TitleText variant="h4">
              {curso.nivel} {curso.letra}
            </TitleText>
            <SubtitleText>Lista de Alumnos Matriculados</SubtitleText>
          </TitleBox>
          <EnrollButton 
            variant="contained" 
            startIcon={<PersonAdd />} 
            onClick={() => setOpenSelector(true)} // abre el modal
          >
            Matricular Alumno
          </EnrollButton>
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

