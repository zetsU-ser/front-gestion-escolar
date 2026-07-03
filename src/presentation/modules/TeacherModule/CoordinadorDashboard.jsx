import { HeaderModulo } from '../../components/HeaderModulo';
import { MetricPanel } from '../../shared/components/MetricPanel';
import { TablasDetalleCoordinador } from './components/TablasDetalleCoordinador';
import { useCoordinadorDashboardViewModel } from './hooks/useCoordinadorDashboardViewModel';
import { DashboardContainer, StyledDivider } from './CoordinadorDashboard.styles';

// VIEW PATTERN
// renderiza la vista de coordinadordashboard
export const CoordinadorDashboard = () => {
  const {
    currentUser, metricas, metricaSeleccionada, setMetricaSeleccionada,
    docentes, cursosBasica, cursosMedia, cursosOtros, countAlumnosCurso,
    alumnosBasica, alumnosMedia, alumnosOtros
  } = useCoordinadorDashboardViewModel();

  return (
    <DashboardContainer>
      <HeaderModulo titulo="Panel de Coordinación" correo={currentUser?.email} />
      <StyledDivider />
      
      <MetricPanel 
        metricas={metricas}
        metricaSeleccionada={metricaSeleccionada}
        onSelectMetrica={(id) => setMetricaSeleccionada(id === metricaSeleccionada ? null : id)}
      />
      
      <TablasDetalleCoordinador 
        metrica={metricaSeleccionada}
        docentes={docentes}
        cursosBasica={cursosBasica} cursosMedia={cursosMedia} cursosOtros={cursosOtros}
        countAlumnosCurso={countAlumnosCurso}
        alumnosBasica={alumnosBasica} alumnosMedia={alumnosMedia} alumnosOtros={alumnosOtros}
      />
    </DashboardContainer>
  );
};
