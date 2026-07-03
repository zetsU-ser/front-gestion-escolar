import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firebaseConfig } from '../firebase/firebaseConfig';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

// REPOSITORY PATTERN
// gestiona las operaciones de datos para auth
export class HttpAuthRepository extends AuthRepository {
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      // Normalizamos errores de Firebase para la UI
      if (error.code === 'auth/invalid-credential') {
        throw new Error('El correo o la contraseña son incorrectos.');
      }
      if (error.code === 'auth/user-not-found') {
        throw new Error('Usuario no registrado.');
      }
      throw new Error('Fallo crítico de autenticación. Intente más tarde.');
    }
  }

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Fallo al cerrar sesión en Firebase:', error);
      throw error;
    }
  }

  async register(email, password) {
    try {
      const appName = "FirebaseSyncApp";
      let secondaryApp;
      try {
        secondaryApp = initializeApp(firebaseConfig, appName);
      } catch (e) { /* Ya inicializada */ }
      
      const secondaryAuth = getAuth(secondaryApp);
      await createUserWithEmailAndPassword(secondaryAuth, email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // No es un error fatal: el usuario ya existe en Firebase (posiblemente de un intento previo).
        // Permitimos que el flujo continúe para crearlo en el Backend si aún no existe allí.
        console.warn('Firebase: El correo ya existe en autenticación. Continuando con el registro en Backend...');
        return;
      } else if (error.code === 'auth/weak-password') {
        throw new Error('La contraseña es demasiado débil (mínimo 6 caracteres).');
      } else {
        console.error('Firebase Auth Error:', error);
        throw new Error('No se pudo registrar el usuario en Firebase: ' + error.message);
      }
    }
  }
}

// SINGLETON
export const authRepository = new HttpAuthRepository();
