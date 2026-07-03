import { MetricStack, MetricCard, MetricIconContainer, MetricValue, MetricTitle } from './MetricPanel.styles';

// COMPONENT PATTERN
// renderiza la vista de metricpanel
export const MetricPanel = ({ metricas = [], metricaSeleccionada, onSelectMetrica }) => {
  return (
    <MetricStack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
      {metricas.map((m, idx) => (
        <MetricCard 
          elevation={m.id === metricaSeleccionada ? 6 : 2} 
          key={idx} 
          onClick={() => onSelectMetrica && onSelectMetrica(m.id)}
          $isSelected={m.id === metricaSeleccionada}
        >
          {m.icono && <MetricIconContainer>{m.icono}</MetricIconContainer>}
          <MetricValue variant="h4">
            {m.valor}
          </MetricValue>
          <MetricTitle variant="body2">
            {m.titulo}
          </MetricTitle>
        </MetricCard>
      ))}
    </MetricStack>
  );
};
