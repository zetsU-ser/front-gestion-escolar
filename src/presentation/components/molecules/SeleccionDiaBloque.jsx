import { Stack } from '@mui/material';
import { SelectorDesplegable } from '../atoms/SelectorDesplegable';

const DIAS_SEMANA = [
  { value: 'LUNES', label: 'LUNES' },
  { value: 'MARTES', label: 'MARTES' },
  { value: 'MIERCOLES', label: 'MIÉRCOLES' },
  { value: 'JUEVES', label: 'JUEVES' },
  { value: 'VIERNES', label: 'VIERNES' }
];

const BLOQUES = [
  { value: 1, label: 'Bloque 1 (08:00 - 09:30)' },
  { value: 2, label: 'Bloque 2 (09:45 - 11:15)' },
  { value: 3, label: 'Bloque 3 (11:30 - 13:00)' },
  { value: 4, label: 'Bloque 4 (14:00 - 15:30)' }
];

/**
 * Molécula: SeleccionDiaBloque
 * Maneja la selección de coordenadas de tiempo (Día y Bloque horario).
 */
export const SeleccionDiaBloque = ({
  form,
  onFieldChange
}) => (
  <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mt: 3 }}>
    <SelectorDesplegable
      label="Día de la Semana"
      name="diaSemana"
      value={form.diaSemana}
      onChange={onFieldChange}
      opciones={DIAS_SEMANA}
      required
      sx={{ flex: 1 }}
    />
    <SelectorDesplegable
      label="Bloque Horario"
      name="bloqueHorario"
      value={form.bloqueHorario}
      onChange={onFieldChange}
      opciones={BLOQUES}
      required
      sx={{ flex: 1 }}
    />
  </Stack>
);
