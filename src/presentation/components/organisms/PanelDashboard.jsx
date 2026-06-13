import { Stack } from '@mui/material';
import { TarjetaMetrica } from '../atoms/TarjetaMetrica';

/**
 * Organismo: PanelDashboard
 * Grilla que contiene las tarjetas de métricas informativas.
 * Consume datos de conteo desde ms-gestion-academica.
 * Usado en: PaginaHomeCoordinador, PaginaHomeAdmin
 */
export const PanelDashboard = ({ metricas = [] }) => (
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
      />
    ))}
  </Stack>
);
