import { useState } from 'react';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const user = await authRepository.login(email, password);
      return user;
    } catch (err) {
      // Normalizamos error para la UI
      setError(err.message || 'Credenciales inválidas o fallo de conexión.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authRepository.logout();
    } catch (err) {
      console.error('Fallo al cerrar sesión:', err);
    }
  };

  return {
    login,
    logout,
    loading,
    error
  };
};
