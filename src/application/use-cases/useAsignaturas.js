import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de asignaturas
export const useAsignaturas = () => {
  const { asignaturaRepository } = useDependencies();
  // ejecuta la acción asíncrona de cargarAsignaturas
  const { 
    data: asignaturas = [], 
    isLoading: loading,
    refetch: cargarAsignaturas
  } = useQuery({
    queryKey: ['asignaturas'],
    queryFn: async () => {
      const data = await asignaturaRepository.getAll();
      return data || [];
    }
  });

  return { asignaturas, loading, cargarAsignaturas };
};
