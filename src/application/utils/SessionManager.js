import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';

const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 minutos de inactividad

class SessionManager {
  constructor() {
    if (SessionManager.instance) {
      return SessionManager.instance;
    }
    
    this.currentUser = null;
    this.token = null;
    this.listeners = []; // Para avisarle a React cuando cambie la sesión
    
    this.inactivityTimer = null;
    this.handleActivity = this.resetInactivityTimer.bind(this);
    
    SessionManager.instance = this;
  }

  // Permite a React suscribirse a los cambios
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  _notifyListeners(userState, loading, error) {
    this.listeners.forEach(listener => listener(userState, loading, error));
  }

  // Iniciar la escucha persistente y rotación de token
  initialize() {
    // onIdTokenChanged atrapa Logins, Logouts y REFRESH automáticos del token de Firebase
    return onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          this.token = await firebaseUser.getIdToken(); // Siempre tendremos el token rotado más fresco
          this.setupInactivityListener(); // Activamos el monitoreo de inactividad
          
          // Intentar recuperar el perfil de la Caché primero para no bloquear la UI
          const cachedProfile = localStorage.getItem(`profile_${firebaseUser.uid}`);
          if (cachedProfile) {
            this.currentUser = { ...firebaseUser, ...JSON.parse(cachedProfile) };
            this._notifyListeners(this.currentUser, false, null);
            return; // Salimos rápido para mejorar UX
          }

          // Si no hay caché, buscamos en el backend (Solo pasa en el primer login)
          const todosLosUsuarios = await usuarioRepository.getAll(this.token);
          const emailNormalizado = firebaseUser.email?.toLowerCase();
          const datosUsuario = todosLosUsuarios.find(u => u.email?.toLowerCase() === emailNormalizado);

          if (!datosUsuario) {
            console.error(`Validación Fallida: Email ${emailNormalizado} no está en la BD. Usuarios recibidos:`, todosLosUsuarios);
            throw new Error(`Usuario no registrado en la base de datos del colegio.`);
          }

          if (!['ADMIN', 'COORDINADOR', 'DOCENTE'].includes(datosUsuario.tipoUsuario?.toUpperCase())) {
            console.error(`Validación Fallida: Rol rechazado ->`, datosUsuario.tipoUsuario);
            throw new Error(`Rol de usuario inválido o no reconocido: ${datosUsuario.tipoUsuario || 'Sin Rol'}`);
          }

          const profileData = { role: datosUsuario.tipoUsuario.toUpperCase(), profile: datosUsuario };
          
          // Guardar en caché para la próxima recarga de página
          localStorage.setItem(`profile_${firebaseUser.uid}`, JSON.stringify(profileData));
          
          this.currentUser = { ...firebaseUser, ...profileData };
          this._notifyListeners(this.currentUser, false, null);

        } catch (error) {
          console.error("Fallo de sincronización de sesión:", error);
          this.cleanupInactivityListener();
          this.clearSession();
          this._notifyListeners(null, false, error.message);
        }
      } else {
        this.cleanupInactivityListener();
        this.clearSession();
        this._notifyListeners(null, false, null);
      }
    });
  }

  // --- MÓDULO DE USABILIDAD Y SEGURIDAD ---
  setupInactivityListener() {
    this.cleanupInactivityListener(); // Limpiar rastro anterior
    window.addEventListener('mousemove', this.handleActivity);
    window.addEventListener('keydown', this.handleActivity);
    window.addEventListener('click', this.handleActivity);
    window.addEventListener('scroll', this.handleActivity);
    this.resetInactivityTimer();
  }

  cleanupInactivityListener() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    window.removeEventListener('mousemove', this.handleActivity);
    window.removeEventListener('keydown', this.handleActivity);
    window.removeEventListener('click', this.handleActivity);
    window.removeEventListener('scroll', this.handleActivity);
  }

  resetInactivityTimer() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      console.warn("Cerrando sesión por inactividad prolongada (15 min)...");
      authRepository.logout(); // Esto disparará onIdTokenChanged(null) y limpiará todo
    }, INACTIVITY_LIMIT_MS);
  }
  // ----------------------------------------

  clearSession() {
    if (this.currentUser) {
      localStorage.removeItem(`profile_${this.currentUser.uid}`);
    }
    this.currentUser = null;
    this.token = null;
  }

  // Métodos útiles expuestos globalmente
  getToken() { return this.token; }
  getUser() { return this.currentUser; }
}

export const sessionManager = new SessionManager();
