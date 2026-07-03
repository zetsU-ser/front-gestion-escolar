import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de cursos
export const useCursos = () => {
  const queryClient = useQueryClient();
  const { cursoRepository } = useDependencies();

  // maneja la carga asíncrona de la lista de cursos
  const { 
    data: cursos = [], 
    isLoading: loading, 
    refetch: cargarCursos 
  } = useQuery({
    queryKey: ['cursos'],
    queryFn: async () => {
      const data = await cursoRepository.getAll();
      return Array.isArray(data) ? data : [];
    }
  });

  const createMutation = useMutation({
    mutationFn: (curso) => cursoRepository.create(curso),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cursos'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => cursoRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cursos'] })
  });

  // crea un nuevo curso y actualiza el estado local
  const crear = async (curso) => {
    await createMutation.mutateAsync(curso);
  };

  // elimina un curso previa confirmación del usuario
  const eliminar = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return { cursos, loading, crear, eliminar, cargarCursos };
};
