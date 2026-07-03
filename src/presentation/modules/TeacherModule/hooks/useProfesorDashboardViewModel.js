import { useState, useContext, useMemo, useCallback } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useCargaAcademica } from '../../../../application/use-cases/useCargaAcademica';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useAsignacionesAlumnos } from '../../../../application/use-cases/useAsignacionesAlumnos';
import { useAsignaturas } from '../../../../application/use-cases/useAsignaturas';

export const DIAS_SEMANA = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
export const BLOQUES = [
  { id: 1, label: 'Bloque 1 (08:00 - 09:30)' }, { id: 2, label: 'Bloque 2 (09:45 - 11:15)' },
  { id: 3, label: 'Bloque 3 (11:30 - 13:00)' }, { id: 4, label: 'Bloque 4 (14:00 - 15:30)' }
];

// CUSTOM HOOK
// maneja la lógica de profesordashboardviewmodel
export const useProfesorDashboardViewModel = () => {
  const { currentUser } = useContext(AuthContext);
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  const { cursos, loading: loadingCursos } = useCursos();
  const { asignaciones } = useAsignacionesAlumnos();
  const { asignaturas, loading: loadingAsignaturas } = useAsignaturas();

  const [metricaSeleccionada, setMetricaSeleccionada] = useState('horario');

  const isLoading = loadingCargas || loadingCursos || loadingAsignaturas;
  const profesorId = currentUser?.profile?.id;
  
  // filtra la carga académica correspondiente al profesor
  const miHorario = useMemo(() => cargas.filter(c => c.docenteId === profesorId), [cargas, profesorId]);
  
  const misCursos = useMemo(() => {
    const misCursosIds = new Set(miHorario.map(c => c.cursoId));
    return cursos.filter(c => misCursosIds.has(c.id));
  }, [miHorario, cursos]);

  const cursosMap = useMemo(() => new Map(cursos.map(c => [c.id, c])), [cursos]);
  const asignaturasMap = useMemo(() => new Map(asignaturas.map(a => [String(a.id), a])), [asignaturas]);
  const bloquesMap = useMemo(() => new Map(BLOQUES.map(b => [b.id, b])), []);

  // formatea los datos de carga académica para la vista de tabla
  const getDisplayData = useCallback((carga) => {
    const curso = cursosMap.get(carga.cursoId);
    const asignatura = asignaturasMap.get(String(carga.asignaturaId));
    const bloque = bloquesMap.get(carga.bloqueHorario);
    return {
      docenteStr: curso ? `${curso.nivel} ${curso.letra}` : 'N/A', 
      asignaturaStr: asignatura ? asignatura.nombre : 'N/A',
      diaStr: carga.diaSemana,
      bloqueStr: bloque ? bloque.label : 'N/A'
    };
  }, [cursosMap, asignaturasMap, bloquesMap]);

  const countAlumnos = useCallback((cursoId) => asignaciones.filter(asig => asig?.curso?.id === cursoId).length, [asignaciones]);

  // define las métricas resumen del panel docente
  const metricas = useMemo(() => [
    { id: 'cursos', valor: misCursos.length, titulo: 'Cursos Asignados' },
    { id: 'horario', valor: miHorario.length, titulo: 'Bloques Horarios' }
  ], [misCursos.length, miHorario.length]);

  return {
    currentUser, isLoading, metricas, metricaSeleccionada, setMetricaSeleccionada,
    misCursos, miHorario, getDisplayData, countAlumnos
  };
};
