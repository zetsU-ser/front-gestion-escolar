import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de cargaacademica
export const useCargaAcademica = () => {
  const queryClient = useQueryClient();
  const { cargaAcademicaRepository } = useDependencies();

  // ejecuta la acción asíncrona de cargarCargas
  const { 
    data: cargas = [], 
    isLoading: loading,
    refetch: cargarCargas
  } = useQuery({
    queryKey: ['cargaAcademica'],
    queryFn: async () => {
      const data = await cargaAcademicaRepository.getAll();
      return data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const requestPayload = {
        curso: { id: payload.cursoId },
        docente: { id: payload.docenteId },
        asignatura: { id: payload.asignaturaId },
        dia_semana: payload.diaSemana,
        bloque_horario: payload.bloqueHorario
      };
      
      return await cargaAcademicaRepository.create(requestPayload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cargaAcademica'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => cargaAcademicaRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cargaAcademica'] }),
    onError: (error) => {
      console.error("Error eliminando bloque en DB:", error);
      throw new Error("No se pudo eliminar el bloque horario.");
    }
  });

  // ejecuta la acción asíncrona de asignarBloque
  const asignarBloque = async (payload) => {
    return await createMutation.mutateAsync(payload);
  };

  // ejecuta la acción asíncrona de eliminarBloque
  const eliminarBloque = async (id) => {
    return await deleteMutation.mutateAsync(id);
  };

  return { cargas, loading, asignarBloque, eliminarBloque, cargarCargas };
};
