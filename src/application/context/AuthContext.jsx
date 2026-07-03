import { createContext, useState, useEffect, useContext } from 'react';
import { sessionManager } from '../../application/utils/SessionManager';

export const AuthContext = createContext();

// CONTEXT PATTERN
// renderiza la vista de authprovider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Suscribir el Contexto de React al Gestor Singleton
    const unsubscribeReact = sessionManager.subscribe((user, isLoad, err) => {
      setCurrentUser(user);
      setLoading(isLoad);
      setAuthError(err);
    });

    // Iniciar la sesión global persistente
    const unsubscribeFirebase = sessionManager.initialize();

    return () => {
      unsubscribeReact();
      if (unsubscribeFirebase) unsubscribeFirebase();
    };
  }, []);

  const isAdmin = () => currentUser?.role === 'ADMIN';
  const isCoordinador = () => currentUser?.role === 'COORDINADOR';
  const isDocente = () => currentUser?.role === 'DOCENTE';

  return (
    <AuthContext.Provider value={{ currentUser, loading, authError, isAdmin, isCoordinador, isDocente }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
// maneja la lógica de auth
export const useAuth = () => useContext(AuthContext);