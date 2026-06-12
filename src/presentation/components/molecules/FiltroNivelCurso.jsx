import { Stack } from '@mui/material';
import { SelectorDesplegable } from '../atoms/SelectorDesplegable';

const NIVELES = [
  { value: 'BASICA', label: 'Educación Básica' },
  { value: 'MEDIA', label: 'Educación Media' }
];

/**
 * Molécula: FiltroNivelCurso
 * Maneja la selección jerárquica de Nivel Educativo y Curso.
 */
export const FiltroNivelCurso = ({
  nivelSeleccionado,
  onNivelChange,
  cursoSeleccionado,
  onCursoChange,
  cursosOpciones,
  loadingCursos
}) => (
  <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} flexWrap="wrap">
    <SelectorDesplegable
      label="Nivel Educativo"
      name="nivel"
      value={nivelSeleccionado}
      onChange={onNivelChange}
      opciones={NIVELES}
      sx={{ flex: 1, minWidth: '200px' }}
    />
    <SelectorDesplegable
      label="Curso"
      name="cursoId"
      value={cursoSeleccionado}
      onChange={onCursoChange}
      opciones={cursosOpciones}
      disabled={!nivelSeleccionado || loadingCursos}
      sx={{ flex: 1, minWidth: '200px' }}
    />
  </Stack>
);
