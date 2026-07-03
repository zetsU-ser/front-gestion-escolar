import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica asíncrona de alumnos mediante caché centralizada
export const useAlumnos = () => {
  const queryClient = useQueryClient();
  const { alumnoRepository } = useDependencies();

  // ejecuta la consulta asíncrona de alumnos delegada a React Query
  const { 
    data: alumnos = [], 
    isLoading: loading, 
    isError, 
    error: queryError, 
    refetch: cargarAlumnos 
  } = useQuery({
    queryKey: ['alumnos'],
    queryFn: async () => {
      const data = await alumnoRepository.getAll();
      return Array.isArray(data) ? data : [];
    }
  });

  const error = isError ? (queryError?.message || 'No se pudo conectar con el servicio de gestión académica.') : null;

  // mutación para crear un nuevo registro y revalidar la caché
  const createMutation = useMutation({
    mutationFn: (alumno) => alumnoRepository.create(alumno),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumnos'] }),
  });

  // mutación para actualizar un registro existente y revalidar la caché
  const updateMutation = useMutation({
    mutationFn: ({ id, alumno }) => alumnoRepository.update(id, alumno),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumnos'] }),
  });

  // mutación para eliminar un registro y revalidar la caché
  const deleteMutation = useMutation({
    mutationFn: (id) => alumnoRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumnos'] }),
  });

  const crear = async (alumno) => {
    await createMutation.mutateAsync(alumno);
  };

  const actualizar = async (id, alumno) => {
    await updateMutation.mutateAsync({ id, alumno });
  };

  const eliminar = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return { alumnos, loading, error, crear, actualizar, eliminar, cargarAlumnos };
};
