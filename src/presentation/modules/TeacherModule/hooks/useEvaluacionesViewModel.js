import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useCargaAcademica } from '../../../../application/use-cases/useCargaAcademica';
import { alumnoCursoRepository } from '../../../../infrastructure/repositories/HttpCursosRepository';
import { calificacionRepository } from '../../../../infrastructure/repositories/HttpCalificacionRepository';

// CUSTOM HOOK
// maneja la lógica de evaluacionesviewmodel
export const useEvaluacionesViewModel = (cursoId) => {
  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();
  
  const { cursos, loading: loadingCursos } = useCursos();
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [estadoNotas, setEstadoNotas] = useState({});
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  const [nivelFiltro, setNivelFiltro] = useState('');
  const [cursoFiltro, setCursoFiltro] = useState(cursoId || '');

  // extrae la identificación del profesor en sesión
  const profesorId = currentUser?.profile?.id;
  // obtiene los bloques de horario asignados al profesor
  const miHorario = cargas.filter(c => c.docenteId === profesorId);
  const misCursosIds = [...new Set(miHorario.map(c => c.cursoId))];
  const misCursos = cursos.filter(c => misCursosIds.includes(c.id));
  const cursoActual = cursos.find(c => String(c.id) === String(cursoFiltro));

  // genera el listado de opciones para el selector de cursos
  const cursosOpciones = misCursos
    .filter(c => {
      if (!nivelFiltro) return true;
      if (nivelFiltro === 'BASICA') return c.nivel?.includes('Básico');
      if (nivelFiltro === 'MEDIA') return c.nivel?.includes('Medio');
      return true;
    })
    .map(c => ({ value: c.id, label: `${c.nivel} ${c.letra}` }));

  useEffect(() => {
    if (cursoId) setCursoFiltro(cursoId);
  }, [cursoId]);

  useEffect(() => {
// ejecuta la acción asíncrona de fetchAlumnos
    const fetchAlumnos = async () => {
      setLoadingAlumnos(true);
      try {
        const asignaciones = await alumnoCursoRepository.getByCurso(cursoFiltro);
        setAlumnosCurso(asignaciones.map(a => a.alumno).filter(Boolean));
        const dbNotas = await calificacionRepository.getByCursoAndDocente(cursoFiltro, profesorId);
        if (dbNotas && dbNotas.length > 0) {
          const parsed = {};
          dbNotas.forEach(n => {
            parsed[n.alumno_id] = { nota1: n.nota1 || '', nota2: n.nota2 || '', nota3: n.nota3 || '' };
          });
          setEstadoNotas(parsed);
        } else {
          setEstadoNotas({});
        }
      } catch (err) {
        console.error("Error cargando alumnos:", err);
      } finally {
        setLoadingAlumnos(false);
      }
    };
    if (cursoFiltro) fetchAlumnos();
    else {
      setAlumnosCurso([]);
      setEstadoNotas({});
    }
  }, [cursoFiltro]);

  // actualiza el estado local de una calificación específica
  const handleNotaChange = (alumnoId, campo, valor) => {
    setEstadoNotas(prev => ({
      ...prev,
      [alumnoId]: { ...prev[alumnoId], [campo]: valor }
    }));
  };

// ejecuta la acción asíncrona de handleGuardar
  const handleGuardar = async () => {
    setLoadingGuardar(true);
    try {
      for (const al of alumnosCurso) {
        const notas = estadoNotas[al.id] || {};
        const isInvalid = (val, raw) => raw && (isNaN(val) || val < 1.0 || val > 7.0);
        if (
          isInvalid(parseFloat(notas.nota1), notas.nota1) || 
          isInvalid(parseFloat(notas.nota2), notas.nota2) || 
          isInvalid(parseFloat(notas.nota3), notas.nota3)
        ) {
          throw new Error(`Calificaciones inválidas para el alumno ${al.nombre} ${al.apellido}. Rango permitido: 1.0 a 7.0.`);
        }
      }

      const payload = {
        curso_id: Number(cursoFiltro),
        profesor_id: profesorId,
        alumnos: alumnosCurso.map(a => ({
          alumno_id: a.id,
          nota1: estadoNotas[a.id]?.nota1 || null,
          nota2: estadoNotas[a.id]?.nota2 || null,
          nota3: estadoNotas[a.id]?.nota3 || null,
        }))
      };
      await calificacionRepository.createBatch(payload);
      
      showSnackbar('¡Evaluaciones guardadas en la base de datos con éxito!', 'success');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoadingGuardar(false);
    }
  };

  return {
    currentUser,
    loadingCargas,
    loadingCursos,
    nivelFiltro,
    setNivelFiltro,
    cursoFiltro,
    setCursoFiltro,
    cursosOpciones,
    cursoActual,
    loadingAlumnos,
    alumnosCurso,
    estadoNotas,
    handleNotaChange,
    handleGuardar,
    loadingGuardar
  };
};
