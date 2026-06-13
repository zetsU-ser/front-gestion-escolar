import { Grid, Typography } from '@mui/material';
import { TarjetaCursoGlobal } from '../molecules/TarjetaCursoGlobal';
import { EmptyPaper } from '../../modules/CursosModule/CursosTable.styles';

// define el componente organismo GridCursosGlobal que agrupa las tarjetas de los cursos
export const GridCursosGlobal = ({ cursos, onDelete, onNavigate }) => {
  return (
    <Grid container spacing={3}>
      {cursos.length === 0 ? (
        // estado vacío: cuando no hay registros de cursos
        <Grid item sx={{ width: '100%' }}>
          <EmptyPaper>
            <Typography color="textSecondary">No hay cursos creados todavía.</Typography>
          </EmptyPaper>
        </Grid>
      ) : (
        // itera sobre el arreglo de cursos para renderizar cada tarjeta
        cursos.map((curso) => (
          <TarjetaCursoGlobal
            key={curso.id}
            curso={curso}
            onDelete={onDelete}
            onNavigate={onNavigate}
          />
        ))
      )}
    </Grid>
  );
};
