import { useState } from 'react';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';

/**
 * HOOK: useLogin
 * Encapsula la lógica de autenticación.
 * Proporciona estados de carga y error específicos para el formulario de login.
 */
export const useLogin = () => {
  // --- ESTADOS ---
  
  // Bloquea el botón de ingreso mientras se valida con Firebase/Backend
  const [loading, setLoading] = useState(false);
  
  // Almacena el mensaje legible de error para el usuario
  const [error, setError] = useState(null);

  /**
   * Ejecuta el proceso de inicio de sesión.
   * Llama al repositorio para validar en Firebase y sincronizar el rol.
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const user = await authRepository.login(email, password);
      return user;
    } catch (err) {
      // Traducimos o simplificamos el error para la UI
      setError(err.message || 'Credenciales inválidas o fallo de conexión.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión activa en el cliente y Firebase.
   */
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
