import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de asignacionesalumnos
export const useAsignacionesAlumnos = () => {
  const { alumnoCursoRepository } = useDependencies();
  // ejecuta la acción asíncrona de cargarAsignaciones
  const { 
    data: asignaciones = [], 
    isLoading: loading, 
    refetch: cargarAsignaciones 
  } = useQuery({
    queryKey: ['asignacionesAlumnos'],
    queryFn: async () => {
      const data = await alumnoCursoRepository.getAll();
      return Array.isArray(data) ? data : [];
    }
  });

  return { asignaciones, loading, cargarAsignaciones };
};
