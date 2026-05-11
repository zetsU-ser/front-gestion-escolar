import { useState } from 'react';
import {
  IconButton,
  Button,
  Typography,
  CardContent,
  Grid
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Groups as GroupsIcon } from '@mui/icons-material';
import { useCursos } from '../../../application/use-cases/useCursos';
import { CursoFormDialog } from './CursoFormDialog';
import { useNavigate } from 'react-router-dom';
import { 
  MainContainer, 
  HeaderContainer, 
  TitleText, 
  AddButton, 
  EmptyPaper, 
  GlassCard, 
  CourseIdText, 
  CardActionsContainer 
} from './CursosTable.styles';

export const CursosTable = () => {
  const { cursos, loading, crear, eliminar } = useCursos();
  const [open, setOpen] = useState(false);
  
  // Hook de navegación para redirigir a la vista detallada de alumnos por curso
  const navigate = useNavigate();
  if (loading) return <Typography>Cargando cursos...</Typography>;

  return (
    <MainContainer>
<HeaderContainer>
        <TitleText variant="h4">
          Gestión de Cursos
        </TitleText>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Nuevo Curso
        </AddButton>
      </HeaderContainer>
<Grid container spacing={3}>
        {cursos.length === 0 ? (
          // Estado vacío: Cuando no hay registros en la base de datos
          <Grid item sx={{ width: '100%' }}>
            <EmptyPaper>
              <Typography color="textSecondary">No hay cursos creados todavía.</Typography>
            </EmptyPaper>
          </Grid>
        ) : (
          cursos.map((curso) => (
            <Grid item xs={12} sm={6} md={4} key={curso.id}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {curso.nivel} {curso.letra}
                  </Typography>
                  <CourseIdText color="textSecondary">
                    ID: {curso.id}
                  </CourseIdText>
<CardActionsContainer>
                    <Button
                      startIcon={<GroupsIcon />}
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/alumnos-curso/${curso.id}`)}
                    >
                      Ver Alumnos
                    </Button>
                    <IconButton color="error" onClick={() => eliminar(curso.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActionsContainer>
                </CardContent>
              </GlassCard>
            </Grid>
          ))
        )}
      </Grid>

      {/* COMPONENTE DIALOG: Maneja el formulario de creación */}
      <CursoFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onGuardar={async (data) => {
          await crear(data);
          setOpen(false); // Cierra el modal tras una creación exitosa
        }}
      />
    </MainContainer>
  );
};
