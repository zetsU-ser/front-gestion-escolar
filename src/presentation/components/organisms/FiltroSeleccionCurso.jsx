import { Stack, Paper, Typography } from '@mui/material';
import { SelectorDesplegable } from '../atoms/SelectorDesplegable';
import { BotonAccion } from '../atoms/BotonAccion';
import { useNavigate } from 'react-router-dom';

/**
 * Organismo: FiltroSeleccionCurso
 * Muestra selectores para elegir un contexto de trabajo y navegar a los módulos.
 */
export const FiltroSeleccionCurso = ({
  cursosOpciones,
  asignaturasOpciones,
  cursoSeleccionado,
  asignaturaSeleccionada,
  onCursoChange,
  onAsignaturaChange,
}) => {
  const navigate = useNavigate();

  const handleIrAsistencia = () => {
    navigate(`/profesor/asistencia/${cursoSeleccionado}/${asignaturaSeleccionada}`);
  };

  const handleIrEvaluaciones = () => {
    navigate(`/profesor/evaluaciones/${cursoSeleccionado}/${asignaturaSeleccionada}`);
  };

  const isDisabled = !cursoSeleccionado || !asignaturaSeleccionada;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Selecciona un Curso y Asignatura para operar
      </Typography>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ flexWrap: 'wrap' }}>
        <SelectorDesplegable
          label="Curso"
          name="cursoId"
          value={cursoSeleccionado}
          onChange={onCursoChange}
          opciones={cursosOpciones}
          sx={{ flex: 1, minWidth: '200px' }}
        />
        <SelectorDesplegable
          label="Asignatura"
          name="asignaturaId"
          value={asignaturaSeleccionada}
          onChange={onAsignaturaChange}
          opciones={asignaturasOpciones}
          sx={{ flex: 1, minWidth: '200px' }}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <BotonAccion disabled={isDisabled} onClick={handleIrAsistencia}>
          Ir a Asistencia
        </BotonAccion>
        <BotonAccion disabled={isDisabled} color="secondary" onClick={handleIrEvaluaciones}>
          Ir a Evaluaciones
        </BotonAccion>
      </Stack>
    </Paper>
  );
};
