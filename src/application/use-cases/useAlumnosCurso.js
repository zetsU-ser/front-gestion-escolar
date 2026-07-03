import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// define el hook custom para manejar la lógica de alumnos por curso
export const useAlumnosCurso = (cursoId) => {
  const queryClient = useQueryClient();
  const { alumnoCursoRepository, cursoRepository } = useDependencies();

  // carga los datos del curso y sus asignaciones desde el backend
  const { data: curso = null, isLoading: loadingCurso } = useQuery({
    queryKey: ['curso', cursoId],
    queryFn: async () => {
      if (!cursoId) return null;
      const cursos = await cursoRepository.getAll();
      return cursos.find(c => c.id === parseInt(cursoId)) || null;
    },
    enabled: !!cursoId
  });

  const { data: asignacionesBase, isLoading: loadingAsignaciones } = useQuery({
    queryKey: ['asignacionesPorCurso', cursoId],
    queryFn: async () => {
      if (!cursoId) return [];
      const lista = await alumnoCursoRepository.getByCurso(cursoId);
      return Array.isArray(lista) ? lista : [];
    },
    enabled: !!cursoId
  });

  const asignaciones = asignacionesBase || [];
  const loading = loadingCurso || loadingAsignaciones;

  const asignarMutation = useMutation({
    mutationFn: async (alumnoId) => {
      await alumnoCursoRepository.asignar({
        alumno: { id: alumnoId },
        curso: { id: parseInt(cursoId) }
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asignacionesPorCurso', cursoId] })
  });

  const desvincularMutation = useMutation({
    mutationFn: (id) => alumnoCursoRepository.desvincular(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asignacionesPorCurso', cursoId] })
  });

  // asigna un alumno específico al curso actual
  const asignarAlumno = async (alumnoId) => {
    await asignarMutation.mutateAsync(alumnoId);
  };

  // elimina la vinculación de un alumno con el curso
  const desvincularAlumno = async (id) => {
    await desvincularMutation.mutateAsync(id);
  };

  return { 
    curso, 
    asignaciones, 
    loading, 
    asignarAlumno, 
    desvincularAlumno 
  };
};
