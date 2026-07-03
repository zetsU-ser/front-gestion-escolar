import { TextField } from '@mui/material';
import { AlumnoFormDialog } from './AlumnoFormDialog';
import { AlumnosGrid } from './components/AlumnosGrid';
import { useAlumnosTableViewModel } from './hooks/useAlumnosTableViewModel';
import { GenericTableModule } from '../../../shared/components/GenericTableModule';
import { FiltersContainer } from './AlumnosTable.styles';

// VIEW PATTERN
// renderiza la vista de alumnostable
export const AlumnosTable = () => {
  const {
    currentUser, loading, open, alumnoEditar, filtroEdad, setFiltroEdad, alumnosFiltrados,
    handleOpen, handleClose, handleGuardar, handleEliminar
  } = useAlumnosTableViewModel();

  return (
    <GenericTableModule
      titulo="Registro de Alumnos (Matrículas)"
      correo={currentUser?.email}
      loading={loading}
      puedeGestionar={true}
      onAgregar={() => handleOpen()}
      textoBotonAgregar="Registrar Nuevo Alumno"
      alineacionBoton="flex-start"
      loadingText="Cargando base de datos de alumnos..."
      filtros={
        <FiltersContainer>
          <TextField label="Edad" type="number" variant="outlined" size="small" value={filtroEdad} onChange={(e) => setFiltroEdad(e.target.value)} />
        </FiltersContainer>
      }
      gridComponent={
        <AlumnosGrid alumnosFiltrados={alumnosFiltrados} handleOpen={handleOpen} handleEliminar={handleEliminar} />
      }
      dialogComponent={
        <AlumnoFormDialog open={open} onClose={handleClose} onGuardar={handleGuardar} alumnoEditar={alumnoEditar} />
      }
    />
  );
};

