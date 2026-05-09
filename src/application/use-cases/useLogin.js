import { useState } from 'react';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';

//**HU-01: Iniciar sesión como usuario */

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
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authRepository.logout();
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  return {
    login,
    logout,
    loading,
    error
  };
};

