import { useState } from 'react';
import { useSnackbar } from '../../../application/context/SnackbarContext';

import { Add as AddIcon } from '@mui/icons-material';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useAuth } from '../../../application/context/AuthContext';
import { AlumnoFormDialog } from './AlumnoFormDialog';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { TablaAlumnosGlobal } from '../../components/organisms/TablaAlumnosGlobal';
import {
  LoadingText,
  MainContainer,
  AddButton,
  StyledDivider,
  ButtonContainer
} from './AlumnosTable.styles';

export const AlumnosTable = () => {
  const { alumnos, loading, crear, actualizar, eliminar } = useAlumnos();
  const { currentUser } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [alumnoEditar, setAlumnoEditar] = useState(null);

  const handleOpen = (alumno = null) => {
    setAlumnoEditar(alumno); // Modo edicion si existe alumno
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlumnoEditar(null); // Reseteo para proxima apertura
  };

  const handleGuardar = async (form) => {
    try {
      if (alumnoEditar) {
        await actualizar(alumnoEditar.id, form);
      } else {
        await crear(form);
      }
      handleClose(); // Cierre tras exito
      showSnackbar("Alumno Guardado con éxito", "success");
    } catch (error) {
      showSnackbar("No se pudo guardar la información del alumno: " + error.message, "error");
    }
  };

  if (loading) return <LoadingText>Cargando base de datos de alumnos...</LoadingText>;

  return (
    <MainContainer>
      {/* muestra el encabezado del módulo */}
      <HeaderModulo
        titulo="Registro de Alumnos (Matrículas)"
        correo={currentUser?.email}
      />

      <StyledDivider /> {/* separador visual idéntico al dashboard */}

      <ButtonContainer>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Registrar Nuevo Alumno
        </AddButton>
      </ButtonContainer>

      {/* Organismo: Tabla de Alumnos Atomizada */}
      <TablaAlumnosGlobal
        alumnos={alumnos}
        onEdit={handleOpen}
        onDelete={async (id) => {
          try {
            await eliminar(id);
            showSnackbar("Alumno eliminado con éxito", "success");
          } catch (error) {
            showSnackbar("No se pudo eliminar al alumno: " + error.message, "error");
          }
        }}
      />

      <AlumnoFormDialog
        open={open}
        onClose={handleClose}
        onGuardar={handleGuardar}
        alumnoEditar={alumnoEditar}
      />
    </MainContainer>
  );
};
