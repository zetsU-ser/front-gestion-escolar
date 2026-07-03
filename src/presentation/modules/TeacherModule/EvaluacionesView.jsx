import { useParams, useNavigate } from 'react-router-dom';
import { HeaderModulo } from '../../components/HeaderModulo';
import { SelectorCurso } from '../../shared/components/SelectorCurso';
import { DetalleCurso } from '../../shared/components/DetalleCurso';
import { TablaEvaluaciones } from './components/TablaEvaluaciones';
import { useEvaluacionesViewModel } from './hooks/useEvaluacionesViewModel';
import { DashboardContainer, StyledDivider, LoadingContainer, LoadingSpinner, EmptyStatePaper, EmptyStateText } from './ProfesorDashboard.styles';

// VIEW PATTERN
// renderiza la vista de evaluacionesview
export const EvaluacionesView = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();

  const {
    currentUser, loadingCargas, loadingCursos, nivelFiltro, setNivelFiltro, cursoFiltro, setCursoFiltro,
    cursosOpciones, cursoActual, loadingAlumnos, alumnosCurso, estadoNotas,
    handleNotaChange, handleGuardar, loadingGuardar
  } = useEvaluacionesViewModel(cursoId);

  if (loadingCargas || loadingCursos) {
    return (
      <DashboardContainer>
        <LoadingContainer><LoadingSpinner /></LoadingContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <HeaderModulo titulo="Registro de Calificaciones" correo={currentUser?.email} />
      <StyledDivider />

      <SelectorCurso 
        nivelFiltro={nivelFiltro} setNivelFiltro={setNivelFiltro}
        cursoFiltro={cursoFiltro} setCursoFiltro={setCursoFiltro}
        cursosOpciones={cursosOpciones} loadingCursos={loadingCursos}
        onCursoChange={(newCurso) => navigate(newCurso ? `/profesor/evaluaciones/${newCurso}` : `/profesor/evaluaciones`, { replace: true })}
      />

      {cursoFiltro && cursoActual && <DetalleCurso cursoActual={cursoActual} />}

      {loadingAlumnos ? (
        <LoadingContainer><LoadingSpinner /></LoadingContainer>
      ) : cursoFiltro && alumnosCurso.length > 0 ? (
        <TablaEvaluaciones 
          alumnosCurso={alumnosCurso}
          estadoNotas={estadoNotas}
          handleNotaChange={handleNotaChange}
          handleGuardar={handleGuardar}
          loadingGuardar={loadingGuardar}
        />
      ) : cursoFiltro ? (
        <EmptyStatePaper><EmptyStateText>No hay alumnos registrados en este curso.</EmptyStateText></EmptyStatePaper>
      ) : null}
    </DashboardContainer>
  );
};
