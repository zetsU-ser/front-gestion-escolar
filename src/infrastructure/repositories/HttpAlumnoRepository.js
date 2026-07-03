import axiosClient from '../api/axiosClient';
import { AlumnoRepository } from '../../domain/repositories/AlumnoRepository';
import { Alumno } from '../../domain/models/Alumno';

// REPOSITORY PATTERN
// gestiona las operaciones de datos para alumno
class HttpAlumnoRepository extends AlumnoRepository {
  async getAll() {
    try {
      const response = await axiosClient.get('/alumnos');
      return response.data.map(data => new Alumno(data));
    } catch (err) {
      throw new Error('No se pudo obtener la lista de alumnos.');
    }
  }

  async create(alumnoData) {
    try {
      const response = await axiosClient.post('/alumnos', alumnoData);
      return new Alumno(response.data);
    } catch (err) {
      throw new Error('No se pudo crear el alumno. Verifique los datos enviados.');
    }
  }

  async update(id, alumnoData) {
    try {
      const response = await axiosClient.put(`/alumnos/${id}`, alumnoData);
      return new Alumno(response.data);
    } catch (err) {
      throw new Error('No se pudo actualizar la información del alumno.');
    }
  }

  async delete(id) {
    try {
      await axiosClient.delete(`/alumnos/${id}`);
    } catch (err) {
      throw new Error('No se pudo eliminar el alumno.');
    }
  }
}

// SINGLETON
export const alumnoRepository = new HttpAlumnoRepository();
