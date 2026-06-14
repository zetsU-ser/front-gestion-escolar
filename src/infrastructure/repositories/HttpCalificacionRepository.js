import axiosClient from '../api/axiosClient';

export const calificacionRepository = {
  getAll: async () => {
    const response = await axiosClient.get('/calificaciones');
    return response.data;
  },

  getByCurso: async (cursoId) => {
    const response = await axiosClient.get(`/calificaciones/curso/${cursoId}`);
    return response.data;
  },

  createBatch: async (payload) => {
    const response = await axiosClient.post('/calificaciones/batch', payload);
    return response.data;
  },
};
