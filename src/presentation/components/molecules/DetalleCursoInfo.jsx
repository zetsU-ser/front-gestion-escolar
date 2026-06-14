import { Typography, Paper, Box } from '@mui/material';

/**
 * Molécula: DetalleCursoInfo
 * Muestra el detalle del curso seleccionado y la fecha actual en un formato consistente para el docente.
 */
export const DetalleCursoInfo = ({ curso }) => {
  if (!curso) return null;

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h6" color="primary">
          Curso: {curso.nivel} {curso.letra}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'medium' }}>
          Fecha: {new Date().toLocaleDateString('es-CL')}
        </Typography>
      </Box>
    </Paper>
  );
};
