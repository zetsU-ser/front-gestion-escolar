import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { CursoFormDialog } from './CursoFormDialog';
import { useNavigate } from 'react-router-dom';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { useAuth } from '../../../application/context/AuthContext';
import { TablaCursosGestion } from '../../components/organisms/TablaCursosGestion';
import {
  MainContainer, 
  AddButton
} from './CursosTable.styles';

export const CursosTable = () => {
  const { cursos, loading, crear, eliminar } = useCursos();
  const { alumnos, loading: loadingAlumnos } = useAlumnos();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  
  // Hook de navegación para redirigir a la vista detallada de alumnos por curso
  const navigate = useNavigate();
  if (loading || loadingAlumnos) return <Typography>Cargando cursos...</Typography>;

  return (
    <MainContainer>
      {/* muestra el encabezado del módulo (atomizado) */}
      <HeaderModulo 
        titulo="Gestión de Cursos" 
        correo={currentUser?.email}
      />
      
      <Divider sx={{ mb: 4 }} />

      
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
      {/* Organismo: Tabla de Cursos Atomizada */}
      <TablaCursosGestion
        cursos={cursos}
        alumnos={alumnos}
        onDelete={eliminar}
        onNavigate={navigate}
      />

      {/* COMPONENTE DIALOG: Maneja el formulario de creación */}
      <CursoFormDialog
        open={open}
        cursosExistentes={cursos}
        onClose={() => setOpen(false)}
        onGuardar={async (data) => {
          // Validar que no exista un curso con el mismo nivel y letra
          const existe = cursos.some(c => c.nivel === data.nivel && c.letra === data.letra);
          if (existe) {
            alert(`El curso ${data.nivel} ${data.letra} ya existe.`);
            return;
          }
          await crear(data);
          setOpen(false); // Cierra el modal tras una creación exitosa
        }}
      />
    </MainContainer>
  );
};
