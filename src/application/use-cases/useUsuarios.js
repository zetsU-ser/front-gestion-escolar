import { useState, useEffect } from 'react';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

//**HU-04: CRUD de Entidades */

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
        ? data.filter((u) => u.tipoUsuario === filtroTipo)
        : data;
      setUsuarios(resultado);
    } catch (err) {
      setError('Error al cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, [filtroTipo]);

  const crear = async (usuario) => {
    await usuarioRepository.create(usuario);
    await cargarUsuarios();
  };

  const actualizar = async (id, usuario) => {
    await usuarioRepository.update(id, usuario);
    await cargarUsuarios();
  };

  const eliminar = async (id) => {
    await usuarioRepository.delete(id);
    await cargarUsuarios();
  };

  return { usuarios, loading, error, crear, actualizar, eliminar };
};
