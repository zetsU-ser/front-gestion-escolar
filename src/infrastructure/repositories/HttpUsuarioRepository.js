import axiosClient from '../api/axiosClient';

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

export const usuarioRepository = {
  getAll: async (token) => {
    const response = await axiosClient.get('/usuarios', getAuthConfig(token));
    return response.data;
  },

  create: async (usuario, token) => {
    const response = await axiosClient.post('/usuarios', usuario, getAuthConfig(token));
    return response.data;
  },

  update: async (id, usuario, token) => {
    const response = await axiosClient.put(`/usuarios/${id}`, usuario, getAuthConfig(token));
    return response.data;
  },

  delete: async (id, token) => {
    await axiosClient.delete(`/usuarios/${id}`, getAuthConfig(token));
  },
};
