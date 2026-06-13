import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

const ROLES_VALIDOS = ['ADMIN', 'COORDINADOR', 'DOCENTE'];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setAuthError(null);
          const todosLosUsuarios = await usuarioRepository.getAll();

          // Comparación insensible a mayúsculas para tolerar variaciones en Neon
          const emailNormalizado = user.email?.toLowerCase();
          const datosUsuario = todosLosUsuarios.find(
            u => u.email?.toLowerCase() === emailNormalizado
          );

          if (!datosUsuario) {
            console.error("Usuario autenticado en Firebase pero no existe en backend:", user.email);
            setAuthError("Usuario no registrado en el sistema académico.");
            setCurrentUser(null);
            setLoading(false);
            return;
          }

          const realRole = datosUsuario.rol?.toUpperCase();

          if (!ROLES_VALIDOS.includes(realRole)) {
            console.error("Rol desconocido recibido desde backend:", datosUsuario.rol);
            setAuthError("El rol del usuario no es válido. Contacte al administrador.");
            setCurrentUser(null);
            setLoading(false);
            return;
          }

          setCurrentUser({
            ...user,
            role: realRole,
            profile: datosUsuario
          });
        } catch (error) {
          console.error("Error al sincronizar perfil con backend:", error);
          setAuthError("No se pudo obtener el perfil del usuario desde el backend.");
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
        setAuthError(null);
      }
      setLoading(false);
    });

    return unsubscribe;
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

export const useAuth = () => useContext(AuthContext);