import axiosClient from '../api/axiosClient';

/**
 * REPOSITORIO: usuarioRepository
 * Encargado de la comunicación HTTP con el microservicio para la entidad Usuario.
 */
export const usuarioRepository = {
  /**
   * Recupera todos los usuarios registrados.
   */
  getAll: async () => {
    const response = await axiosClient.get('/usuarios');
    return response.data;
  },

  /**
   * Registra un nuevo usuario en la base de datos del microservicio.
   * @param {Object} usuario - Datos del usuario (sin password).
   */
  create: async (usuario) => {
    const response = await axiosClient.post('/usuarios', usuario);
    return response.data;
  },

  /**
   * Actualiza la información de un usuario.
   */
  update: async (id, usuario) => {
    const response = await axiosClient.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  /**
   * Elimina permanentemente a un usuario del sistema.
   */
  delete: async (id) => {
    await axiosClient.delete(`/usuarios/${id}`);
  },
};
