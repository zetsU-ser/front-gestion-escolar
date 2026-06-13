import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useCursos } from '../../../application/use-cases/useCursos';
import { CursoFormDialog } from './CursoFormDialog';
import { useNavigate } from 'react-router-dom';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { useAuth } from '../../../application/context/AuthContext';
import { GridCursosGlobal } from '../../components/organisms/GridCursosGlobal';
import {
  MainContainer, 
  HeaderContainer, 
  TitleText, 
  AddButton
} from './CursosTable.styles';

export const CursosTable = () => {
  const { cursos, loading, crear, eliminar } = useCursos();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  
  // Hook de navegación para redirigir a la vista detallada de alumnos por curso
  const navigate = useNavigate();
  if (loading) return <Typography>Cargando cursos...</Typography>;

  return (
    <MainContainer>
      {/* muestra el encabezado del módulo (atomizado) */}
      <HeaderModulo 
        titulo="Gestión de Cursos" 
        correo={currentUser?.email}
      />
      
      {/* Botón flotante superior derecho como en el resto de vistas */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Nuevo Curso
        </AddButton>
      </Box>
      {/* Organismo: Grid de Cursos Atomizada */}
      <GridCursosGlobal
        cursos={cursos}
        onDelete={eliminar}
        onNavigate={navigate}
      />

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
