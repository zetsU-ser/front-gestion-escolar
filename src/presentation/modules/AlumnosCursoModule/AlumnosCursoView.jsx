import { useParams } from 'react-router-dom';
import { ArrowBack, PersonAdd } from '@mui/icons-material';
import { HeaderModulo } from '../../components/HeaderModulo';
import { TablaAsignaciones } from './components/TablaAsignaciones';
import { ModalAsignacionMasiva } from './components/ModalAsignacionMasiva';
import { useAlumnosCursoViewModel } from './hooks/useAlumnosCursoViewModel';
import {
  MainContainer, BackButton, HeaderPaper, HeaderStack, TitleText,
  LoadingText, SubtitleText, EnrollButton, TitleBox, StyledDivider
} from './AlumnosCursoView.styles';

// VIEW PATTERN
// renderiza la vista de alumnoscursoview
export const AlumnosCursoView = () => {
  const { cursoId } = useParams();
  const {
    currentUser, navigate, curso, asignaciones, loading,
    openSelector, setOpenSelector, seleccionados, alumnosDisponibles,
    handleCloseModal, handleToggleSeleccion, handleAsignarMasivo, handleDesvincular, calcularEdad
  } = useAlumnosCursoViewModel(cursoId);

  if (loading || !curso) return <LoadingText>Cargando información del curso...</LoadingText>;

  return (
    <MainContainer>
      <HeaderModulo titulo="Gestión de Curso Específico" correo={currentUser?.email} />
      <StyledDivider />

      <BackButton startIcon={<ArrowBack />} onClick={() => navigate('/cursos')}>
        Volver a Cursos
      </BackButton>
      
      <HeaderPaper elevation={2}>
        <HeaderStack direction="row">
          <TitleBox>
            <TitleText variant="h4">{curso.nivel} {curso.letra}</TitleText>
            <SubtitleText>Lista de Alumnos Matriculados</SubtitleText>
          </TitleBox>
          <EnrollButton variant="contained" startIcon={<PersonAdd />} onClick={() => setOpenSelector(true)}>
            Matricular Alumno
          </EnrollButton>
        </HeaderStack>
      </HeaderPaper>

      <TablaAsignaciones asignaciones={asignaciones} handleDesvincular={handleDesvincular} />

      <ModalAsignacionMasiva 
        openSelector={openSelector} handleCloseModal={handleCloseModal} 
        handleToggleSeleccion={handleToggleSeleccion} handleAsignarMasivo={handleAsignarMasivo}
        alumnosDisponibles={alumnosDisponibles} seleccionados={seleccionados} calcularEdad={calcularEdad}
      />
    </MainContainer>
  );
};
