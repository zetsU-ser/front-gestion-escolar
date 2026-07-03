import { useState, useMemo, useContext } from 'react';
import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useAlumnos } from '../../../../application/use-cases/useAlumnos';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useDialog } from '../../../shared/hooks/useDialog';

// CUSTOM HOOK
// maneja la lógica de alumnostableviewmodel
export const useAlumnosTableViewModel = () => {
  const { alumnos, loading, crear, actualizar, eliminar } = useAlumnos();
  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  const { isOpen: open, itemData: alumnoEditar, openDialog: handleOpen, closeDialog: handleClose } = useDialog(false);
  const [filtroEdad, setFiltroEdad] = useState('');


  // filtra la lista de alumnos según la edad seleccionada
  const alumnosFiltrados = useMemo(() => {
    return alumnos.filter(a => {
      const cumpleEdad = filtroEdad ? String(a.edad) === String(filtroEdad) : true;

      return cumpleEdad;
    });
  }, [alumnos, filtroEdad]);

// ejecuta la acción asíncrona de handleGuardar
  const handleGuardar = async (form) => {
    try {
      if (alumnoEditar) await actualizar(alumnoEditar.id, form);
      else await crear(form);
      handleClose();
      showSnackbar("Alumno guardado con éxito", "success");
    } catch (error) {
      showSnackbar("No se pudo guardar la información del alumno: " + error.message, "error");
    }
  };

// ejecuta la acción asíncrona de handleEliminar
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar la ficha de este alumno?")) {
      try {
        await eliminar(id);
        showSnackbar("Alumno eliminado con éxito", "success");
      } catch (error) {
        showSnackbar("No se pudo eliminar al alumno: " + error.message, "error");
      }
    }
  };

  return {
    currentUser, loading, open, alumnoEditar, filtroEdad, setFiltroEdad, 
    alumnosFiltrados,
    handleOpen, handleClose, handleGuardar, handleEliminar
  };
};
