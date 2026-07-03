import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useAlumnos } from '../../../../application/use-cases/useAlumnos';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useUsuarios } from '../../../../application/use-cases/useUsuarios';
import { useAsignacionesAlumnos } from '../../../../application/use-cases/useAsignacionesAlumnos';
import { useAsignaturas } from '../../../../application/use-cases/useAsignaturas';

// CUSTOM HOOK
// maneja la lógica de coordinadordashboardviewmodel
export const useCoordinadorDashboardViewModel = () => {
  const { currentUser } = useContext(AuthContext);
  const { alumnos } = useAlumnos();
  const { cursos } = useCursos();
  const { usuarios: docentesRaw } = useUsuarios('DOCENTE');
  const { asignaturas } = useAsignaturas();
  
  // vincula a los docentes con el nombre de su especialidad
  const docentes = useMemo(() => {
    const asignaturasMap = new Map(asignaturas.map(a => [String(a.id), a]));
    return docentesRaw.map(u => {
      const asignatura = asignaturasMap.get(String(u.asignatura_id));
      return {
        ...u,
        especialidad: asignatura ? asignatura.nombre : null
      };
    });
  }, [docentesRaw, asignaturas]);
  
  const { asignaciones } = useAsignacionesAlumnos();

  const [metricaSeleccionada, setMetricaSeleccionada] = useState(null);

  // define las métricas clave del panel de coordinación
  const metricas = useMemo(() => [
    { id: 'cursos', valor: cursos.length, titulo: 'Cursos Registrados' },
    { id: 'alumnos', valor: alumnos.length, titulo: 'Alumnos Matriculados' },
    { id: 'docentes', valor: docentes.length, titulo: 'Docentes Activos' }
  ], [cursos.length, alumnos.length, docentes.length]);

  // agrupa los cursos según su nivel educativo
  const cursosBasica = useMemo(() => cursos.filter(c => c.nivel?.toLowerCase().includes('básico') || c.nivel?.toLowerCase().includes('basico')), [cursos]);
  const cursosMedia = useMemo(() => cursos.filter(c => c.nivel?.toLowerCase().includes('medio')), [cursos]);
  const cursosOtros = useMemo(() => cursos.filter(c => !c.nivel?.toLowerCase().includes('básico') && !c.nivel?.toLowerCase().includes('basico') && !c.nivel?.toLowerCase().includes('medio')), [cursos]);
  
  const countAlumnosCurso = (cursoId) => asignaciones.filter(asig => asig?.curso?.id === cursoId).length;

  // asocia cada alumno con su curso actual
  const alumnosMapeados = useMemo(() => {
    const asignacionesMap = new Map(asignaciones.map(a => [a.alumno?.id, a]));
    const cursosMap = new Map(cursos.map(c => [c.id, c]));
    
    return alumnos.map(alumno => {
      const asignacion = asignacionesMap.get(alumno.id);
      const cursoObj = asignacion ? cursosMap.get(asignacion.curso?.id) : null;
      return { ...alumno, cursoObj };
    });
  }, [alumnos, asignaciones, cursos]);

  const alumnosBasica = useMemo(() => alumnosMapeados.filter(a => a.cursoObj?.nivel?.toLowerCase().includes('básico') || a.cursoObj?.nivel?.toLowerCase().includes('basico')), [alumnosMapeados]);
  const alumnosMedia = useMemo(() => alumnosMapeados.filter(a => a.cursoObj?.nivel?.toLowerCase().includes('medio')), [alumnosMapeados]);
  const alumnosOtros = useMemo(() => alumnosMapeados.filter(a => !a.cursoObj?.nivel?.toLowerCase().includes('básico') && !a.cursoObj?.nivel?.toLowerCase().includes('basico') && !a.cursoObj?.nivel?.toLowerCase().includes('medio')), [alumnosMapeados]);

  return {
    currentUser,
    metricas,
    metricaSeleccionada,
    setMetricaSeleccionada,
    docentes,
    cursosBasica, cursosMedia, cursosOtros, countAlumnosCurso,
    alumnosBasica, alumnosMedia, alumnosOtros
  };
};
