import axiosClient from '../api/axiosClient';
import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { Usuario } from '../../domain/models/Usuario';

const getAuthConfig = (token) => {
  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// REPOSITORY PATTERN
// gestiona las operaciones de datos para usuario
class HttpUsuarioRepository extends UsuarioRepository {
  async getAll(token) {
    try {
      const response = await axiosClient.get('/usuarios', getAuthConfig(token));
      return response.data.map(data => new Usuario(data.id, data.nombre, data.rut, data.rol || data.tipoUsuario, data.email, data.apellido, data.asignaturaId || data.asignatura_id));
    } catch (err) {
      throw new Error('Error al obtener la lista de usuarios del sistema.');
    }
  }

  async create(usuarioData, token) {
    try {
      const response = await axiosClient.post('/usuarios', usuarioData, getAuthConfig(token));
      return new Usuario(response.data.id, response.data.nombre, response.data.rut, response.data.rol || response.data.tipoUsuario, response.data.email, response.data.apellido, response.data.asignaturaId || response.data.asignatura_id);
    } catch (err) {
      if (err.response?.status === 400) {
        throw new Error('Datos inválidos o el usuario ya existe en el sistema. Verifique RUT, email y campos obligatorios.');
      }
      throw new Error('No se pudo crear el usuario.');
    }
  }

  async update(id, usuarioData, token) {
    try {
      const response = await axiosClient.put(`/usuarios/${id}`, usuarioData, getAuthConfig(token));
      return new Usuario(response.data.id, response.data.nombre, response.data.rut, response.data.rol || response.data.tipoUsuario, response.data.email, response.data.apellido, response.data.asignaturaId || response.data.asignatura_id);
    } catch (err) {
      throw new Error('No se pudo actualizar el usuario.');
    }
  }

  async delete(id, token) {
    try {
      await axiosClient.delete(`/usuarios/${id}`, getAuthConfig(token));
    } catch (err) {
      throw new Error('No se pudo eliminar el usuario.');
    }
  }
}

// SINGLETON
export const usuarioRepository = new HttpUsuarioRepository();
