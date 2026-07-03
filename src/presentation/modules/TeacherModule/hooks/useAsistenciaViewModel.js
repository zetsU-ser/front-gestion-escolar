import { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useCargaAcademica } from '../../../../application/use-cases/useCargaAcademica';
import { useAlumnosCurso } from '../../../../application/use-cases/useAlumnosCurso';
import { useAsistencias } from '../../../../application/use-cases/useAsistencias';

// CUSTOM HOOK
// maneja la lógica de asistenciaviewmodel
export const useAsistenciaViewModel = (cursoId) => {
  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();
  
  const { cursos, loading: loadingCursos } = useCursos();
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  
  const [estadoAsistencia, setEstadoAsistencia] = useState({});
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  const [nivelFiltro, setNivelFiltro] = useState('');
  const [cursoFiltro, setCursoFiltro] = useState(cursoId || '');

  // Consumimos los casos de uso limpios
  const { asignaciones, loading: loadingAlumnos } = useAlumnosCurso(cursoFiltro);
  const { asistencias, crear: crearAsistencia, actualizar: actualizarAsistencia } = useAsistencias();
  const alumnosCurso = useMemo(() => asignaciones.map(a => a.alumno).filter(Boolean), [asignaciones]);

  const profesorId = currentUser?.profile?.id;
  // calcula los cursos asignados al profesor en sesión
  const miHorario = useMemo(() => cargas.filter(c => c.docenteId === profesorId), [cargas, profesorId]);
  const misCursosIds = useMemo(() => [...new Set(miHorario.map(c => c.cursoId))], [miHorario]);
  const misCursos = useMemo(() => cursos.filter(c => misCursosIds.includes(c.id)), [cursos, misCursosIds]);
  const cursoActual = useMemo(() => cursos.find(c => String(c.id) === String(cursoFiltro)), [cursos, cursoFiltro]);

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
    if (alumnosCurso.length === 0) return;
    
    const carga = miHorario.find(c => String(c.cursoId) === String(cursoFiltro));
    const cargaAcademicaId = carga ? carga.id : 1;
    const fechaHoy = new Date().toISOString().split('T')[0];

    const asistenciasClaseHoy = asistencias.filter(a => 
      Number(a.cargaAcademicaId) === Number(cargaAcademicaId) && a.fecha === fechaHoy
    );

    const loadedState = {};
    alumnosCurso.forEach(a => {
      loadedState[a.id] = { estado: 'PRESENTE', justificado: false };
    });

    asistenciasClaseHoy.forEach(a => {
      loadedState[a.alumnoId] = {
        id: a.id,
        estado: a.estado,
        justificado: a.estado === 'JUSTIFICADO'
      };
    });

    setEstadoAsistencia(loadedState);
  }, [alumnosCurso, cursoFiltro, asistencias, miHorario]);

  // cambia el estado local de asistencia de un alumno
  const handleEstadoChange = (alumnoId, nuevoEstado) => {
    setEstadoAsistencia(prev => ({
      ...prev,
      [alumnoId]: { 
        ...prev[alumnoId], 
        estado: nuevoEstado,
        justificado: nuevoEstado === 'PRESENTE' ? false : prev[alumnoId]?.justificado || false
      }
    }));
  };

  // alterna el estado de justificación de una inasistencia
  const handleJustificarChange = (alumnoId, justificado) => {
    setEstadoAsistencia(prev => ({
      ...prev,
      [alumnoId]: { ...prev[alumnoId], justificado }
    }));
  };

// ejecuta la acción asíncrona de handleGuardar
  const handleGuardar = async () => {
    setLoadingGuardar(true);
    try {
      // Find the specific schedule block for this course and teacher
      const carga = miHorario.find(c => String(c.cursoId) === String(cursoFiltro));
      const cargaAcademicaId = carga ? carga.id : 1;
      const fecha = new Date().toISOString().split('T')[0];

      // Create an array of Promises to save each student's attendance concurrently
      const promesasGuardado = alumnosCurso.map(a => {
        let estadoFinal = estadoAsistencia[a.id]?.estado || 'PRESENTE';
        if (estadoAsistencia[a.id]?.justificado) {
          estadoFinal = 'JUSTIFICADO';
        }

        const payload = {
          alumnoId: Number(a.id),
          cargaAcademicaId: Number(cargaAcademicaId),
          fecha: fecha,
          estado: estadoFinal
        };

        if (estadoAsistencia[a.id]?.id) {
          return actualizarAsistencia(estadoAsistencia[a.id].id, payload);
        } else {
          return crearAsistencia(payload);
        }
      });

      const resultados = await Promise.all(promesasGuardado);
      
      setEstadoAsistencia(prev => {
        const nextState = { ...prev };
        resultados.forEach(res => {
          if (res && res.alumnoId) {
            nextState[res.alumnoId] = {
              ...nextState[res.alumnoId],
              id: res.id,
              estado: res.estado,
              justificado: res.estado === 'JUSTIFICADO'
            };
          }
        });
        return nextState;
      });
      
      showSnackbar('¡Asistencia guardada con éxito!', 'success');
    } catch (error) {
      console.error('Error guardando asistencia:', error);
      showSnackbar('Error al guardar asistencia.', 'error');
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
    estadoAsistencia,
    handleEstadoChange,
    handleJustificarChange,
    handleGuardar,
    loadingGuardar
  };
};
