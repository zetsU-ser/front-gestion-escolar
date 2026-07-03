import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useAlumnos } from '../../../../application/use-cases/useAlumnos';
import { useUsuarios } from '../../../../application/use-cases/useUsuarios';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useAsignacionesAlumnos } from '../../../../application/use-cases/useAsignacionesAlumnos';
import { useAsignaturas } from '../../../../application/use-cases/useAsignaturas';

// CUSTOM HOOK
// maneja la lógica de admindashboardviewmodel
export const useAdminDashboardViewModel = () => {
  const { currentUser } = useContext(AuthContext);
  
  const { alumnos } = useAlumnos();
  const { usuarios: personal } = useUsuarios();
  const { cursos } = useCursos();
  const { asignaciones } = useAsignacionesAlumnos();
  const { asignaturas } = useAsignaturas();
  
  const [metricaSeleccionada, setMetricaSeleccionada] = useState(null);

  // define las métricas principales del panel
  const metricas = useMemo(() => [
    { id: 'personal', valor: personal.length, titulo: 'Personal Registrado' },
    { id: 'cursos', valor: cursos.length, titulo: 'Cursos Registrados' },
    { id: 'alumnos', valor: alumnos.length, titulo: 'Alumnos Matriculados' },
  ], [personal.length, cursos.length, alumnos.length]);

  // filtra el personal docente y asigna su especialidad
  const personalFiltrado = useMemo(() => {
    const asignaturasMap = new Map(asignaturas.map(a => [String(a.id), a]));
    return personal.filter(u => u.rol !== 'ALUMNO').map(u => {
      const asignatura = asignaturasMap.get(String(u.asignatura_id));
      return {
        ...u,
        especialidad: asignatura ? asignatura.nombre : null
      };
    });
  }, [personal, asignaturas]);

  // aplica funciones de filtrado a listas genéricas
  const getFilteredData = (items, filterFn) => items.filter(filterFn);

  // reglas de filtrado por nivel educativo
  const filterBasica = c => c.nivel?.toLowerCase().includes('básico') || c.nivel?.toLowerCase().includes('basico');
  const filterMedia = c => c.nivel?.toLowerCase().includes('medio');
  const filterOtros = c => !filterBasica(c) && !filterMedia(c);

  const cursosBasica = useMemo(() => getFilteredData(cursos, filterBasica), [cursos]);
  const cursosMedia = useMemo(() => getFilteredData(cursos, filterMedia), [cursos]);
  const cursosOtros = useMemo(() => getFilteredData(cursos, filterOtros), [cursos]);
  
  // calcula el total de alumnos matriculados por curso
  const countAlumnosCurso = (cursoId) => asignaciones.filter(asig => asig?.curso?.id === cursoId).length;

  // asocia cada alumno con la información detallada de su curso
  const alumnosMapeados = useMemo(() => {
    const asignacionesMap = new Map(asignaciones.map(a => [a.alumno?.id, a]));
    const cursosMap = new Map(cursos.map(c => [c.id, c]));
    
    return alumnos.map(alumno => {
      const asig = asignacionesMap.get(alumno.id);
      return { ...alumno, cursoObj: asig ? cursosMap.get(asig.curso?.id) : null };
    });
  }, [alumnos, asignaciones, cursos]);

  const alumnosBasica = useMemo(() => alumnosMapeados.filter(a => a.cursoObj && filterBasica(a.cursoObj)), [alumnosMapeados]);
  const alumnosMedia = useMemo(() => alumnosMapeados.filter(a => a.cursoObj && filterMedia(a.cursoObj)), [alumnosMapeados]);
  const alumnosOtros = useMemo(() => alumnosMapeados.filter(a => a.cursoObj && !filterBasica(a.cursoObj) && !filterMedia(a.cursoObj)), [alumnosMapeados]);

  return {
    currentUser, metricas, metricaSeleccionada, setMetricaSeleccionada,
    personalFiltrado, countAlumnosCurso,
    cursosBasica, cursosMedia, cursosOtros,
    alumnosBasica, alumnosMedia, alumnosOtros
  };
};
