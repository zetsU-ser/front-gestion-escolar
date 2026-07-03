import axiosClient from '../api/axiosClient';
import { AsignaturaRepository } from '../../domain/repositories/AsignaturaRepository';

class Asignatura {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre;
  }
}

// REPOSITORY PATTERN
// gestiona las operaciones de datos para asignatura
class HttpAsignaturaRepository extends AsignaturaRepository {
  async getAll() {
    const response = await axiosClient.get('/asignaturas');
    return response.data.map(data => new Asignatura(data));
  }
}
// SINGLETON
export const asignaturaRepository = new HttpAsignaturaRepository();
