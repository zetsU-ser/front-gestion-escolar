import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de asistencias
export const useAsistencias = () => {
  const queryClient = useQueryClient();
  const { asistenciaRepository } = useDependencies();

  // ejecuta la acción asíncrona de cargarAsistencias
  const { 
    data: asistenciasBase = [], 
    isLoading: loading, 
    isError, 
    error: queryError,
    refetch: cargarAsistencias 
  } = useQuery({
    queryKey: ['asistencias'],
    queryFn: async () => {
      const data = await asistenciaRepository.getAll();
      return Array.isArray(data) ? data : [];
    }
  });

  const asistencias = Array.isArray(asistenciasBase) ? asistenciasBase : [];
  const error = isError ? (queryError?.message || 'No se pudo conectar con el servicio de asistencia.') : null;

  const createMutation = useMutation({
    mutationFn: (asistencia) => asistenciaRepository.create(asistencia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asistencias'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, asistencia }) => asistenciaRepository.update(id, asistencia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asistencias'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => asistenciaRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['asistencias'] })
  });

  const crear = async (asistencia) => {
    return await createMutation.mutateAsync(asistencia);
  };

  const actualizar = async (id, asistencia) => {
    return await updateMutation.mutateAsync({ id, asistencia });
  };

  const eliminar = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return { asistencias, loading, error, crear, actualizar, eliminar, cargarAsistencias };
};