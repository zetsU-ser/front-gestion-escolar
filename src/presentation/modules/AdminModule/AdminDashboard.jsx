import { HeaderModulo } from '../../components/HeaderModulo';
import { MetricPanel } from '../../shared/components/MetricPanel';
import { TablasDetalleAdmin } from './components/TablasDetalleAdmin';
import { useAdminDashboardViewModel } from './hooks/useAdminDashboardViewModel';
import { DashboardContainer, StyledDivider } from './AdminDashboard.styles';

// VIEW PATTERN
// renderiza la vista de admindashboard
export const AdminDashboard = () => {
  const {
    currentUser, metricas, metricaSeleccionada, setMetricaSeleccionada, personalFiltrado,
    countAlumnosCurso, cursosBasica, cursosMedia, cursosOtros,
    alumnosBasica, alumnosMedia, alumnosOtros
  } = useAdminDashboardViewModel();

  return (
    <DashboardContainer>
      <HeaderModulo titulo="Panel de Administración" correo={currentUser?.email} />
      <StyledDivider />
      
      <MetricPanel 
        metricas={metricas} metricaSeleccionada={metricaSeleccionada}
        onSelectMetrica={(id) => setMetricaSeleccionada(id === metricaSeleccionada ? null : id)}
      />
      
      <TablasDetalleAdmin 
        metrica={metricaSeleccionada}
        personalFiltrado={personalFiltrado}
        cursosProps={{ cursosBasica, cursosMedia, cursosOtros, countAlumnosCurso }}
        alumnosProps={{ alumnosBasica, alumnosMedia, alumnosOtros }}
      />
    </DashboardContainer>
  );
};
