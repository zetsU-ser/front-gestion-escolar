import { useParams, useNavigate } from 'react-router-dom';
import { HeaderModulo } from '../../components/HeaderModulo';
import { SelectorCurso } from '../../shared/components/SelectorCurso';
import { DetalleCurso } from '../../shared/components/DetalleCurso';
import { TablaAsistencia } from './components/TablaAsistencia';
import { useAsistenciaViewModel } from './hooks/useAsistenciaViewModel';
import { DashboardContainer, StyledDivider, LoadingContainer, LoadingSpinner, EmptyStatePaper, EmptyStateText } from './ProfesorDashboard.styles';

// VIEW PATTERN
// renderiza la vista de asistenciaview
export const AsistenciaView = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();

  const {
    currentUser, loadingCargas, loadingCursos, nivelFiltro, setNivelFiltro, cursoFiltro, setCursoFiltro,
    cursosOpciones, cursoActual, loadingAlumnos, alumnosCurso, estadoAsistencia,
    handleEstadoChange, handleJustificarChange, handleGuardar, loadingGuardar
  } = useAsistenciaViewModel(cursoId);

  if (loadingCargas || loadingCursos) {
    return (
      <DashboardContainer>
        <LoadingContainer><LoadingSpinner /></LoadingContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <HeaderModulo titulo="Registro de Asistencia Diaria" correo={currentUser?.email} />
      <StyledDivider />

      <SelectorCurso 
        nivelFiltro={nivelFiltro} setNivelFiltro={setNivelFiltro}
        cursoFiltro={cursoFiltro} setCursoFiltro={setCursoFiltro}
        cursosOpciones={cursosOpciones} loadingCursos={loadingCursos}
        onCursoChange={(newCurso) => navigate(newCurso ? `/profesor/asistencia/${newCurso}` : `/profesor/asistencia`, { replace: true })}
      />

      {cursoFiltro && cursoActual && <DetalleCurso cursoActual={cursoActual} />}

      {loadingAlumnos ? (
        <LoadingContainer><LoadingSpinner /></LoadingContainer>
      ) : cursoFiltro && alumnosCurso.length > 0 ? (
        <TablaAsistencia 
          alumnosCurso={alumnosCurso}
          estadoAsistencia={estadoAsistencia}
          handleEstadoChange={handleEstadoChange}
          handleJustificarChange={handleJustificarChange}
          handleGuardar={handleGuardar}
          loadingGuardar={loadingGuardar}
        />
      ) : cursoFiltro ? (
        <EmptyStatePaper><EmptyStateText>No hay alumnos registrados en este curso.</EmptyStateText></EmptyStatePaper>
      ) : null}
    </DashboardContainer>
  );
};
