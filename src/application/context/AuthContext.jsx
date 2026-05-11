import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripcion al estado de Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Obtenemos rol desde microservicio mediante email
          const todosLosUsuarios = await usuarioRepository.getAll();
          const datosUsuario = todosLosUsuarios.find(u => u.email === user.email);
          
          // Asignacion de rol jerarquico
          const realRole = datosUsuario ? datosUsuario.rol : 
                          (user.email === 'admin@test.com' ? 'ADMIN' : 'DOCENTE');

          // Actualizacion estado global
          setCurrentUser({ 
            ...user, 
            role: realRole, 
            profile: datosUsuario 
          });
        } catch (error) {
          console.error("Error al sincronizar perfil con backend:", error);
          // Fallback ante errores de red
          setCurrentUser({ ...user, role: 'DOCENTE' });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Limpieza de suscripcion
  }, []);

  const isAdmin = () => currentUser?.role === 'ADMIN';
  const isCoordinador = () => currentUser?.role === 'COORDINADOR';
  const isDocente = () => currentUser?.role === 'DOCENTE';

  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin, isCoordinador, isDocente }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);