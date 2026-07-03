import { HeaderModulo } from '../../components/HeaderModulo';
import { MetricPanel } from '../../shared/components/MetricPanel';
import { TablasDetalleProfesor } from './components/TablasDetalleProfesor';
import { useProfesorDashboardViewModel } from './hooks/useProfesorDashboardViewModel';
import { DashboardContainer, StyledDivider, LoadingContainer, LoadingSpinner } from './ProfesorDashboard.styles';

// VIEW PATTERN
// renderiza la vista de profesordashboard
export const ProfesorDashboard = () => {
  const {
    currentUser, isLoading, metricas, metricaSeleccionada, setMetricaSeleccionada,
    misCursos, miHorario, getDisplayData, countAlumnos
  } = useProfesorDashboardViewModel();

  if (isLoading) {
    return <DashboardContainer><LoadingContainer><LoadingSpinner /></LoadingContainer></DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <HeaderModulo titulo="Panel de Docentes" correo={currentUser?.email} />
      <StyledDivider />
      
      <MetricPanel 
        metricas={metricas}
        metricaSeleccionada={metricaSeleccionada}
        onSelectMetrica={(id) => setMetricaSeleccionada(id === metricaSeleccionada ? null : id)}
      />
      
      <TablasDetalleProfesor 
        metrica={metricaSeleccionada}
        misCursos={misCursos}
        miHorario={miHorario}
        countAlumnos={countAlumnos}
        getDisplayData={getDisplayData}
      />
    </DashboardContainer>
  );
};
