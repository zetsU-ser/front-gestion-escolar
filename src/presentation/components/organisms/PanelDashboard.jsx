import { Stack } from '@mui/material';
import { TarjetaMetrica } from '../atoms/TarjetaMetrica';

export const PanelDashboard = ({ metricas = [], onSelectMetrica }) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    spacing={3}
    sx={{ mb: 4, justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}
  >
    {metricas.map((m, idx) => (
      <TarjetaMetrica
        key={idx}
        valor={m.valor}
        titulo={m.titulo}
        icono={m.icono}
        onClick={() => onSelectMetrica && onSelectMetrica(m.id || m.titulo)}
      />
    ))}
  </Stack>
);
