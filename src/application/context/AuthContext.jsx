import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';

//**HU-01: Iniciar sesión como usuario */

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        let simulatedRole = 'profesor'; // Por defecto

        if (user.email === 'admin@test.com') {
          simulatedRole = 'admin';
        } else if (user.email === 'coordinador@test.com') {
          simulatedRole = 'coordinador';
        }

        setCurrentUser({ ...user, role: simulatedRole });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  //**fix/auth-context-helpers */

  const isAdmin = () => currentUser?.role === 'admin';
  const isCoordinador = () => currentUser?.role === 'coordinador';
  const isProfesor = () => currentUser?.role === 'profesor';

  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin, isCoordinador, isProfesor }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);