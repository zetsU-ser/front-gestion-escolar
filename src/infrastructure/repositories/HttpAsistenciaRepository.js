import axiosClient from '../api/axiosClient';
import { AsistenciaRepository } from '../../domain/repositories/AsistenciaRepository';
import { Asistencia } from '../../domain/models/Asistencia';

// REPOSITORY PATTERN
// gestiona las operaciones de datos para asistencia
class HttpAsistenciaRepository extends AsistenciaRepository {
  async getAll() {
    const response = await axiosClient.get('/asistencias');
    return response.data.map(data => new Asistencia(data));
  }

  async getById(id) {
    const response = await axiosClient.get(`/asistencias/${id}`);
    return new Asistencia(response.data);
  }

  async create(asistenciaData) {
    const response = await axiosClient.post('/asistencias', asistenciaData);
    return new Asistencia(response.data);
  }

  async update(id, asistenciaData) {
    const response = await axiosClient.put(`/asistencias/${id}`, asistenciaData);
    return new Asistencia(response.data);
  }

  async delete(id) {
    await axiosClient.delete(`/asistencias/${id}`);
  }
}

// SINGLETON
export const asistenciaRepository = new HttpAsistenciaRepository();