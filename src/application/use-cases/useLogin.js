import { useMutation } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de login
export const useLogin = () => {
  const { authRepository } = useDependencies();
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => authRepository.login(email, password),
  });

  // ejecuta la acción asíncrona de login
  const login = async (email, password) => {
    try {
      const user = await loginMutation.mutateAsync({ email, password });
      return user;
    } catch (err) {
      // Normalizamos error para la UI
      throw new Error(err.message || 'Credenciales inválidas o fallo de conexión.');
    }
  };

  const logoutMutation = useMutation({
    mutationFn: () => authRepository.logout(),
  });

  // ejecuta la acción asíncrona de logout
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      console.error('Fallo al cerrar sesión:', err);
    }
  };

  const error = loginMutation.error ? (loginMutation.error.message || 'Credenciales inválidas o fallo de conexión.') : null;

  return {
    login,
    logout,
    loading: loginMutation.isPending || loginMutation.isLoading,
    error
  };
};
