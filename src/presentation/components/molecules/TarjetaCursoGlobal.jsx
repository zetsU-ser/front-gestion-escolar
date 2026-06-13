import { CardContent, Typography, Button, IconButton, Grid } from '@mui/material';
import { Delete as DeleteIcon, Groups as GroupsIcon } from '@mui/icons-material';
import { GlassCard, CourseIdText, CardActionsContainer } from '../../modules/CursosModule/CursosTable.styles';

// define el componente molécula TarjetaCursoGlobal para mostrar un curso
export const TarjetaCursoGlobal = ({ curso, onDelete, onNavigate }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <GlassCard>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {curso.nivel} {curso.letra}
          </Typography>
          <CourseIdText color="textSecondary">
            ID: {curso.id}
          </CourseIdText>
          <CardActionsContainer>
            {/* botón para ver alumnos del curso */}
            <Button
              startIcon={<GroupsIcon />}
              size="small"
              variant="outlined"
              onClick={() => onNavigate(`/alumnos-curso/${curso.id}`)}
            >
              Ver Alumnos
            </Button>
            {/* botón para eliminar el curso */}
            <IconButton color="error" onClick={() => onDelete(curso.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActionsContainer>
        </CardContent>
      </GlassCard>
    </Grid>
  );
};
