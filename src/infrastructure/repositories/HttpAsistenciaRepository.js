import axiosClient from '../api/axiosClient';

export const asistenciaRepository = {
  getAll: async () => {
    const response = await axiosClient.get('/asistencias');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/asistencias/${id}`);
    return response.data;
  },

  create: async (asistencia) => {
    const response = await axiosClient.post('/asistencias', asistencia);
    return response.data;
  },

  update: async (id, asistencia) => {
    const response = await axiosClient.put(`/asistencias/${id}`, asistencia);
    return response.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/asistencias/${id}`);
  },
};