import axiosClient from '../api/axiosClient';
import { CursoRepository } from '../../domain/repositories/CursoRepository';
import { AlumnoCursoRepository } from '../../domain/repositories/AlumnoCursoRepository';
import { Curso } from '../../domain/models/Curso';

// REPOSITORY PATTERN
// gestiona las operaciones de datos para curso
class HttpCursoRepository extends CursoRepository {
  async getAll() {
    try {
      const response = await axiosClient.get('/cursos');
      // Soporta arreglos directos o respuestas envueltas como { data: [...] } o { cursos: [...] }
      const dataList = Array.isArray(response.data) ? response.data : (response.data.data || response.data.cursos || []);
      return dataList.map(data => new Curso(data));
    } catch (err) {
      throw new Error('No se pudo obtener la lista de cursos.');
    }
  }

  async create(cursoData) {
    try {
      const response = await axiosClient.post('/cursos', cursoData);
      return new Curso(response.data);
    } catch (err) {
      throw new Error('No se pudo crear el curso.');
    }
  }

  async delete(id) {
    try {
      await axiosClient.delete(`/cursos/${id}`);
    } catch (err) {
      throw new Error('No se pudo eliminar el curso.');
    }
  }
}

// REPOSITORY PATTERN
// gestiona las operaciones de datos para alumnocurso
class HttpAlumnoCursoRepository extends AlumnoCursoRepository {
  async getAll() {
    try {
      const response = await axiosClient.get('/alumnosCurso');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return [];
    }
  }

  async getByCurso(cursoId) {
    try {
      const response = await axiosClient.get('/alumnosCurso');
      const todas = response.data;
      if (!todas || !Array.isArray(todas)) return [];
      
      // Filtrado en cliente por falta de endpoint especifico
      return todas.filter(asig => asig.curso && asig.curso.id === parseInt(cursoId));
    } catch (error) {
      return [];
    }
  }

  async asignar(asignacion) {
    try {
      const response = await axiosClient.post('/alumnosCurso', asignacion);
      return response.data;
    } catch (err) {
      throw new Error('No se pudo asignar el alumno al curso.');
    }
  }

  async desvincular(id) {
    try {
      await axiosClient.delete(`/alumnosCurso/${id}`);
    } catch (err) {
      throw new Error('No se pudo desvincular el alumno del curso.');
    }
  }
}

// SINGLETON
export const cursoRepository = new HttpCursoRepository();
// SINGLETON
export const alumnoCursoRepository = new HttpAlumnoCursoRepository();
