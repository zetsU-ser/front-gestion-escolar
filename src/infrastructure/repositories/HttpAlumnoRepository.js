import axiosClient from '../api/axiosClient';

/**
 * REPOSITORIO: alumnoRepository
 * Interfaz de comunicación con el Microservicio para la gestión de Alumnos.
 */
export const alumnoRepository = {
  /**
   * Obtiene la lista de todos los alumnos registrados.
   */
  getAll: async () => {
    const response = await axiosClient.get('/alumnos');
    return response.data;
  },

  /**
   * Registra un nuevo alumno (Matrícula).
   */
  create: async (alumno) => {
    const response = await axiosClient.post('/alumnos', alumno);
    return response.data;
  },

  /**
   * Actualiza la información personal o de contacto de un alumno.
   */
  update: async (id, alumno) => {
    const response = await axiosClient.put(`/alumnos/${id}`, alumno);
    return response.data;
  },

  /**
   * Elimina el registro de un alumno.
   */
  delete: async (id) => {
    await axiosClient.delete(`/alumnos/${id}`);
  },
};
