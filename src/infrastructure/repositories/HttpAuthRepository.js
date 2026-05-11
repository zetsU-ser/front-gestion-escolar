import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

/**
 * CLASE: HttpAuthRepository
 * Implementación de AuthRepository utilizando Firebase como proveedor de identidad.
 */
export class HttpAuthRepository {
  /**
   * Autentica a un usuario con su proveedor (Firebase).
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} Usuario de Firebase.
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      // Mapeo de errores de Firebase para mensajes más amigables
      if (error.code === 'auth/invalid-credential') {
        throw new Error('El correo o la contraseña son incorrectos.');
      }
      if (error.code === 'auth/user-not-found') {
        throw new Error('Usuario no registrado.');
      }
      throw new Error('Fallo crítico de autenticación. Intente más tarde.');
    }
  }

  /**
   * Cierra la sesión activa en el cliente.
   */
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
