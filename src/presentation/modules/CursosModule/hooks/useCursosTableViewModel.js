import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../application/context/AuthContext';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useAsignacionesAlumnos } from '../../../../application/use-cases/useAsignacionesAlumnos';
import { useDialog } from '../../../shared/hooks/useDialog';

// CUSTOM HOOK
// maneja la lógica de cursostableviewmodel
export const useCursosTableViewModel = () => {
  const { cursos, loading, crear, eliminar } = useCursos();
  const { showSnackbar } = useSnackbar();
  const { asignaciones, loading: loadingAsignaciones } = useAsignacionesAlumnos();
  const { currentUser } = useAuth();
  
  const { isOpen: open, openDialog: openNewCurso, closeDialog: closeNewCurso } = useDialog(false);
  const navigate = useNavigate();

  // ordena la lista de cursos por nivel y letra secuencialmente
  const sortCursos = (cursosArray) => [...cursosArray].sort((a, b) => {
    const numA = parseInt(a.nivel) || 0;
    const numB = parseInt(b.nivel) || 0;
    if (numA !== numB) return numA - numB;
    return (a.letra || '').localeCompare(b.letra || '');
  });

  // aplica filtros a la lista de cursos ordenados
  const getFiltered = filterFn => sortCursos(cursos.filter(filterFn));
  
  // reglas de filtrado por niveles
  const filterBasica = c => c.nivel?.toLowerCase().includes('básico') || c.nivel?.toLowerCase().includes('basico');
  const filterMedia = c => c.nivel?.toLowerCase().includes('medio');
  const filterOtros = c => !filterBasica(c) && !filterMedia(c);

  const cursosBasica = getFiltered(filterBasica);
  const cursosMedia = getFiltered(filterMedia);
  const cursosOtros = getFiltered(filterOtros);

  // cuenta los alumnos asignados a un curso específico
  const countAlumnos = (cursoId) => asignaciones.filter(asig => asig?.curso?.id === cursoId).length;

// ejecuta la acción asíncrona de handleDelete
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      try {
        await eliminar(id);
        showSnackbar("Curso eliminado con éxito", "success");
      } catch (error) {
        showSnackbar("No se pudo eliminar el curso: " + error.message, "error");
      }
    }
  };

// ejecuta la acción asíncrona de handleGuardarCurso
  const handleGuardarCurso = async (data) => {
    if (cursos.some(c => c.nivel === data.nivel && c.letra === data.letra)) {
      return showSnackbar(`El curso ${data.nivel} ${data.letra} ya existe.`, "error");
    }
    try {
      await crear(data);
      showSnackbar("Curso agregado exitosamente", "success");
      closeNewCurso();
    } catch (error) {
      showSnackbar("Error al crear curso: " + error.message, "error");
    }
  };

  return {
    currentUser, loading, loadingAsignaciones, open, setOpen: openNewCurso, navigate, cursos,
    cursosBasica, cursosMedia, cursosOtros,
    countAlumnos, handleDelete, handleGuardarCurso
  };
};
