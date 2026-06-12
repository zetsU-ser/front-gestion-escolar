import axiosClient from '../api/axiosClient';

export const cursoRepository = {
  getAll: async () => {
    const response = await axiosClient.get('/cursos');
    return response.data;
  },

  create: async (curso) => {
    const response = await axiosClient.post('/cursos', curso);
    return response.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/cursos/${id}`);
  },
};

export const alumnoCursoRepository = {
  getAll: async () => {
    try {
      const response = await axiosClient.get('/alumnosCurso');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return [];
    }
  },

  getByCurso: async (cursoId) => {
    try {
      const response = await axiosClient.get('/alumnosCurso');
      const todas = response.data;
      if (!todas || !Array.isArray(todas)) return [];
      
      // Filtrado en cliente por falta de endpoint especifico
      return todas.filter(asig => asig.curso && asig.curso.id === parseInt(cursoId));
    } catch (error) {
      return [];
    }
  },

  asignar: async (asignacion) => {
    const response = await axiosClient.post('/alumnosCurso', asignacion);
    return response.data;
  },

  desvincular: async (id) => {
    await axiosClient.delete(`/alumnosCurso/${id}`);
  }
};
