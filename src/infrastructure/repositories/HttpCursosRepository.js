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
  /**
   * Obtiene los alumnos de un curso.
   * NOTA TÉCNICA: Se realiza filtrado en el cliente porque el backend 
   * no provee un endpoint de búsqueda por ID de curso.
   */
  getByCurso: async (cursoId) => {
    try {
      const response = await axiosClient.get('/alumnosCurso');
      const todas = response.data;
      if (!todas || !Array.isArray(todas)) return [];
      
      // Filtramos manualmente las asignaciones que coincidan con nuestro curso
      return todas.filter(asig => asig.curso && asig.curso.id === parseInt(cursoId));
    } catch (error) {
      // Retornamos array vacío ante errores de red o falta de datos (204 No Content)
      return [];
    }
  },

  /**
   * Registra una nueva matrícula.
   * @param {Object} asignacion - Estructura { alumno: { id }, curso: { id } }
   */
  asignar: async (asignacion) => {
    const response = await axiosClient.post('/alumnosCurso', asignacion);
    return response.data;
  },

  /**
   * Elimina un registro de matrícula.
   */
  desvincular: async (id) => {
    await axiosClient.delete(`/alumnosCurso/${id}`);
  }
};
