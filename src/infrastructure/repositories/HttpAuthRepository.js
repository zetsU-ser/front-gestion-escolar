import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export class HttpAuthRepository {
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
}

export const authRepository = new HttpAuthRepository();
