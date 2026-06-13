import { Stack } from '@mui/material';
import { SelectorDesplegable } from '../atoms/SelectorDesplegable';

/**
 * Molécula: SeleccionDocenteAsignatura
 * Maneja la selección del docente y la asignatura a impartir.
 */
export const SeleccionDocenteAsignatura = ({
  form,
  onFieldChange,
  docentesOpciones = [],
  asignaturasOpciones = [],
  loadingDocentes = false
}) => (
  <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} flexWrap="wrap">
    <SelectorDesplegable
      label="Docente"
      name="docenteId"
      value={form.docenteId}
      onChange={onFieldChange}
      opciones={docentesOpciones}
      required
      disabled={loadingDocentes}
      sx={{ flex: 1, minWidth: '200px' }}
    />
    <SelectorDesplegable
      label="Asignatura"
      name="asignaturaId"
      value={form.asignaturaId}
      onChange={onFieldChange}
      opciones={asignaturasOpciones}
      required
      sx={{ flex: 1, minWidth: '200px' }}
    />
  </Stack>
);
