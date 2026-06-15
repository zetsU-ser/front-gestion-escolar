import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../infrastructure/firebase/firebaseConfig';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

export const useUsuarios = (filtroTipo = null) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    cargarUsuarios();
  }, [filtroTipo]);

  const crear = async (usuario) => {
    try {
      const appName = "FirebaseSyncApp";
      let secondaryApp;
      try {
        secondaryApp = initializeApp(firebaseConfig, appName);
      } catch (e) { /* Ya inicializada */ }
      
      const secondaryAuth = getAuth(secondaryApp);
      
      try {
        await createUserWithEmailAndPassword(secondaryAuth, usuario.email, usuario.password);
      } catch (fbError) {
        if (fbError.code !== 'auth/email-already-in-use') throw fbError;
      }

      const { password, ...datosBase } = usuario;
      const datosParaBackend = {
        ...datosBase,
        tipoUsuario: usuario.rol, 
        rol: usuario.rol,
        asignatura_id: datosBase.asignatura_id || null
      };
      
      await usuarioRepository.create(datosParaBackend);
      await cargarUsuarios();
    } catch (err) {
      console.error("Error crítico en creación de usuario:", err);
      if (err.response && err.response.status === 500) {
        throw new Error("El usuario ya existe o los datos están duplicados (ya registrado).");
      }
      throw err;
    }
  };

  const actualizar = async (id, usuario) => {
    const { password, ...datosBackend } = usuario;
    datosBackend.asignatura_id = datosBackend.asignatura_id || null;
    await usuarioRepository.update(id, datosBackend);
    await cargarUsuarios();
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este acceso?")) {
      await usuarioRepository.delete(id);
      await cargarUsuarios();
    }
  };

  return { usuarios, loading, error, crear, actualizar, eliminar };
};
