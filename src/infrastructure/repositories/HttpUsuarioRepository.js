import axiosClient from '../api/axiosClient';

//**HU-04: CRUD de Entidades */

export const usuarioRepository = {
  getAll: async () => {
    const response = await axiosClient.get('/usuarios');
    return response.data;
  },

  create: async (usuario) => {
    const response = await axiosClient.post('/usuarios', usuario);
    return response.data;
  },

  update: async (id, usuario) => {
    const response = await axiosClient.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/usuarios/${id}`);
  },
};
