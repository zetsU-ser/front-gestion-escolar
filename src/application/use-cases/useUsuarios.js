import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de usuarios
export const useUsuarios = (filtroTipo = null) => {
  const queryClient = useQueryClient();
  const { usuarioRepository, authRepository } = useDependencies();

  // ejecuta la acción asíncrona de cargarUsuarios delegada a React Query
  const { 
    data: usuariosBase = [], 
    isLoading: loading, 
    isError, 
    error: queryError, 
    refetch: cargarUsuarios 
  } = useQuery({
    queryKey: ['usuarios', filtroTipo],
    queryFn: async () => {
      const data = await usuarioRepository.getAll();
      return filtroTipo
        ? data.filter((u) => u.rol === filtroTipo)
        : data;
    }
  });

  const usuarios = Array.isArray(usuariosBase) ? usuariosBase : [];
  const error = isError ? (queryError?.message || 'Fallo de conexión con el servicio de usuarios.') : null;

  const createMutation = useMutation({
    mutationFn: async (usuario) => {
      // 1. Delegamos el registro en Firebase al Repositorio de Autenticación
      await authRepository.register(usuario.email, usuario.password);

      // 2. Preparamos los datos para nuestro Backend
      const { password, ...datosBase } = usuario;
      const datosParaBackend = {
        ...datosBase,
        tipoUsuario: usuario.rol, 
        rol: usuario.rol
      };
      
      // 3. Delegamos el guardado en Backend al Repositorio de Usuarios
      await usuarioRepository.create(datosParaBackend);
    },
    onSuccess: () => {
      // 4. Actualizamos el estado de la vista
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
    onError: (err) => {
      console.error("Error crítico en creación de usuario:", err);
      throw err;
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, usuario }) => usuarioRepository.update(id, usuario),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => usuarioRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios'] })
  });

  const crear = async (usuario) => {
    await createMutation.mutateAsync(usuario);
  };

  const actualizar = async (id, usuario) => {
    await updateMutation.mutateAsync({ id, usuario });
  };

  const eliminar = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return { usuarios, loading, error, crear, actualizar, eliminar };
};
