import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useAlumnos } from '../../../../application/use-cases/useAlumnos';
import { useAsignacionesAlumnos } from '../../../../application/use-cases/useAsignacionesAlumnos';
import { useAlumnosCurso } from '../../../../application/use-cases/useAlumnosCurso';
import { calcularEdad } from '../../../../application/utils/dateUtils';

// CUSTOM HOOK
// maneja la lógica de alumnoscursoviewmodel
export const useAlumnosCursoViewModel = (cursoId) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const { curso, asignaciones, loading, asignarAlumno, desvincularAlumno } = useAlumnosCurso(cursoId);
  const { alumnos } = useAlumnos();
  const { asignaciones: asignacionesGlobales, cargarAsignaciones: recargarAsignacionesGlobales } = useAsignacionesAlumnos();

  const [openSelector, setOpenSelector] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);

  const handleCloseModal = () => {
    setSeleccionados([]);
    setOpenSelector(false);
  };

  // alterna la selección individual de un alumno para asignación masiva
  const handleToggleSeleccion = (id) => {
    setSeleccionados(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

// ejecuta la acción asíncrona de handleAsignarMasivo
  const handleAsignarMasivo = async () => {
    try {
      for (const id of seleccionados) await asignarAlumno(id);
      recargarAsignacionesGlobales();
      showSnackbar(`Se matricularon ${seleccionados.length} alumnos con éxito`, "success");
      handleCloseModal();
    } catch (err) {
      showSnackbar("Error al asignar: " + err.message, "error");
    }
  };

// ejecuta la acción asíncrona de handleDesvincular
  const handleDesvincular = async (id) => {
    if (window.confirm("¿Deseas quitar al alumno de este curso?")) {
      try {
        await desvincularAlumno(id);
        recargarAsignacionesGlobales();
        showSnackbar("Alumno removido con éxito", "success");
      } catch (error) {
        showSnackbar("Error al remover: " + error.message, "error");
      }
    }
  };

  // filtra exclusivamente los alumnos que no poseen curso asignado
  const alumnosDisponibles = alumnos.filter(a => !asignacionesGlobales.some(asig => asig.alumno?.id === a.id));

  return {
    currentUser, navigate, curso, asignaciones, loading,
    openSelector, setOpenSelector, seleccionados, alumnosDisponibles,
    handleCloseModal, handleToggleSeleccion, handleAsignarMasivo, handleDesvincular, calcularEdad
  };
};
