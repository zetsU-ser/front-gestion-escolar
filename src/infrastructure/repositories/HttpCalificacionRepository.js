import axiosClient from '../api/axiosClient';
import { CalificacionRepository } from '../../domain/repositories/CalificacionRepository';
import { Calificacion } from '../../domain/models/Calificacion';

// REPOSITORY PATTERN
// gestiona las operaciones de datos para calificacion
class HttpCalificacionRepository extends CalificacionRepository {
  async getAll() {
    const response = await axiosClient.get('/calificaciones');
    return response.data.map(data => new Calificacion(data));
  }

  async getByCursoAndDocente(cursoId, docenteId) {
    const response = await axiosClient.get(`/calificaciones/curso/${cursoId}/docente/${docenteId}`);
    return response.data;
  }

  async createBatch(payload) {
    const response = await axiosClient.post('/calificaciones/batch', payload);
    return response.data;
  }
}

// SINGLETON
export const calificacionRepository = new HttpCalificacionRepository();
