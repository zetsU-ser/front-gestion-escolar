import axiosClient from '../api/axiosClient';

export const alumnoRepository = {
  getAll: async () => {
    const response = await axiosClient.get('/alumnos');
    return response.data;
  },

  create: async (alumno) => {
    const response = await axiosClient.post('/alumnos', alumno);
    return response.data;
  },

  update: async (id, alumno) => {
    const response = await axiosClient.put(`/alumnos/${id}`, alumno);
    return response.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/alumnos/${id}`);
  },
};
