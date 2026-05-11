import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../infrastructure/firebase/firebaseConfig';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

/**
 * HOOK: useUsuarios
 * Centraliza las operaciones CRUD de usuarios, integrando la sincronización 
 * entre Firebase Auth (para el login) y el Microservicio (para los datos).
 */
export const useUsuarios = (filtroTipo = null) => {
  // --- ESTADOS DE DATOS ---
  
  // Lista de usuarios filtrada o completa
  const [usuarios, setUsuarios] = useState([]);
  
  // Estado de carga para la tabla
  const [loading, setLoading] = useState(true);
  
  // Mensaje de error general de red
  const [error, setError] = useState(null);

  /**
   * Obtiene los usuarios del servidor y aplica filtros locales si se requiere.
   */
  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usuarioRepository.getAll();
      const resultado = filtroTipo
        ? data.filter((u) => u.rol === filtroTipo)
        : data;
      setUsuarios(resultado);
    } catch (err) {
      setError('Fallo de conexión con el servicio de usuarios.');
    } finally {
      setLoading(false);
    }
  };

  // Recarga automática si cambia el filtro
  useEffect(() => {
    cargarUsuarios();
  }, [filtroTipo]);

  /**
   * Crea un usuario en dos pasos (Atomicidad lógica):
   * 1. Registra el email/pass en Firebase Auth para permitir el login.
   * 2. Registra los metadatos (RUT, Nombre, Rol) en el Microservicio.
   */
  const crear = async (usuario) => {
    try {
      // SINCRONIZACIÓN FIREBASE
      const appName = "FirebaseSyncApp";
      let secondaryApp;
      try {
        secondaryApp = initializeApp(firebaseConfig, appName);
      } catch (e) { /* Ya inicializada */ }
      
      const secondaryAuth = getAuth(secondaryApp);
      
      try {
        await createUserWithEmailAndPassword(secondaryAuth, usuario.email, usuario.password);
      } catch (fbError) {
        // Si ya existe en Firebase, permitimos continuar para sincronizar con el backend
        if (fbError.code !== 'auth/email-already-in-use') throw fbError;
      }

      // SINCRONIZACIÓN BACKEND
      const { password, ...datosBase } = usuario;
      const datosParaBackend = {
        ...datosBase,
        tipoUsuario: usuario.rol, // Mantenemos doble campo por compatibilidad con DTOs de Spring
        rol: usuario.rol
      };
      
      await usuarioRepository.create(datosParaBackend);
      await cargarUsuarios();
    } catch (err) {
      console.error("Error crítico en creación de usuario:", err);
      throw err;
    }
  };

  /**
   * Actualiza los datos de perfil en el microservicio.
   */
  const actualizar = async (id, usuario) => {
    await usuarioRepository.update(id, usuario);
    await cargarUsuarios();
  };

  /**
   * Elimina al usuario del microservicio.
   */
  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este acceso?")) {
      await usuarioRepository.delete(id);
      await cargarUsuarios();
    }
  };

  return { usuarios, loading, error, crear, actualizar, eliminar };
};
