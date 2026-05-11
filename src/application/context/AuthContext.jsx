import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

/**
 * CONTEXTO DE AUTENTICACIÓN
 * Centraliza el estado de la sesión y los permisos del usuario en toda la aplicación.
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // --- ESTADOS GLOBALES ---
  
  // Objeto del usuario actual que incluye: UID de Firebase, Email y Rol del Backend
  const [currentUser, setCurrentUser] = useState(null);
  
  // Bandera para evitar parpadeos en la UI mientras se verifica la sesión con Firebase
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripción al observador de cambios de estado de Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // --- SINCRONIZACIÓN CON EL BACKEND ---
          // Firebase solo nos da el email. Consultamos el microservicio para obtener el ROL real.
          const todosLosUsuarios = await usuarioRepository.getAll();
          const datosUsuario = todosLosUsuarios.find(u => u.email === user.email);
          
          // Determinación del rol jerárquico (Admin > Coordinador > Docente)
          const realRole = datosUsuario ? datosUsuario.rol : 
                          (user.email === 'admin@test.com' ? 'ADMIN' : 'DOCENTE');

          // Actualizamos el estado global con el perfil completo
          setCurrentUser({ 
            ...user, 
            role: realRole, 
            profile: datosUsuario 
          });
        } catch (error) {
          console.error("Error al sincronizar perfil con backend:", error);
          // Fallback seguro en caso de error de red
          setCurrentUser({ ...user, role: 'DOCENTE' });
        }
      } else {
        // Sesión cerrada
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Limpieza al desmontar el componente
  }, []);

  // --- AYUDANTES DE PERMISOS ---
  const isAdmin = () => currentUser?.role === 'ADMIN';
  const isCoordinador = () => currentUser?.role === 'COORDINADOR';
  const isDocente = () => currentUser?.role === 'DOCENTE';

  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin, isCoordinador, isDocente }}>
      {/* Solo renderizamos la app cuando el estado de carga ha finalizado */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder fácilmente al contexto de auth.
 */
export const useAuth = () => useContext(AuthContext);