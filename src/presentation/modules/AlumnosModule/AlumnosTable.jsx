import { useState, useMemo } from 'react';
import { useSnackbar } from '../../../application/context/SnackbarContext';
import { TextField, Box } from '@mui/material';

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

  const [filtroEdad, setFiltroEdad] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  const alumnosFiltrados = useMemo(() => {
    return alumnos.filter(a => {
      const cumpleEdad = filtroEdad ? String(a.edad) === String(filtroEdad) : true;
      const cumpleFecha = filtroFecha ? a.fecha_nacimiento?.includes(filtroFecha) : true;
      return cumpleEdad && cumpleFecha;
    });
  }, [alumnos, filtroEdad, filtroFecha]);

  const handleGuardar = async (form) => {
    try {
      if (alumnoEditar) {
        await actualizar(alumnoEditar.id, form);
      } else {
        await crear(form);
      }
      handleClose(); // Cierre tras exito
      showSnackbar("Alumno guardado con éxito", "success");
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

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Edad"
          type="number"
          variant="outlined"
          size="small"
          value={filtroEdad}
          onChange={(e) => setFiltroEdad(e.target.value)}
        />
        <TextField
          label="Fecha de nacimiento"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </Box>

      {/* Organismo: Tabla de Alumnos Atomizada */}
      <TablaAlumnosGlobal
        alumnos={alumnosFiltrados}
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
