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
}) => {
  // Filtrar docentes basados en la asignatura seleccionada
  const docentesFiltrados = form.asignaturaId 
    ? docentesOpciones.filter(d => d.asignaturaId === form.asignaturaId)
    : [];

  return (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} flexWrap="wrap">
      <SelectorDesplegable
        label="Asignatura"
        name="asignaturaId"
        value={form.asignaturaId}
        onChange={onFieldChange}
        opciones={asignaturasOpciones}
        required
        sx={{ flex: 1, minWidth: '200px' }}
      />
      <SelectorDesplegable
        label="Docente"
        name="docenteId"
        value={form.docenteId}
        onChange={onFieldChange}
        opciones={docentesFiltrados}
        required
        disabled={!form.asignaturaId || loadingDocentes}
        sx={{ flex: 1, minWidth: '200px' }}
      />
    </Stack>
  );
};
