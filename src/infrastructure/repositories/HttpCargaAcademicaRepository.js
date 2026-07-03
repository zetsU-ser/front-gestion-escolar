import axiosClient from '../api/axiosClient';
import { CargaAcademicaRepository } from '../../domain/repositories/CargaAcademicaRepository';

class CargaAcademica {
  constructor(data) {
    this.id = data.id;
    const diaRaw = data.dia_semana || data.diaSemana || '';
    this.diaSemana = diaRaw.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // "Miércoles" -> "MIERCOLES"
    
    const b = data.bloque_horario || data.bloqueHorario || '';
    if (String(b).includes('08:00')) this.bloqueHorario = 1;
    else if (String(b).includes('09:45')) this.bloqueHorario = 2;
    else if (String(b).includes('11:30')) this.bloqueHorario = 3;
    else if (String(b).includes('14:00')) this.bloqueHorario = 4;
    else this.bloqueHorario = b; // Si ya enviaron "1", "2"

    
    // Normalizar si la BD lo mandó anidado o plano
    this.cursoId = data.curso?.id || data.curso_id || data.cursoId;
    this.docenteId = data.docente?.id || data.docente_id || data.docenteId;
    this.asignaturaId = data.asignatura?.id || data.asignatura_id || data.asignaturaId;
  }
}

// REPOSITORY PATTERN
// gestiona las operaciones de datos para cargaacademica
class HttpCargaAcademicaRepository extends CargaAcademicaRepository {
  async getAll() {
    const response = await axiosClient.get('/cargas-academicas');
    return response.data.map(data => new CargaAcademica(data));
  }

  async create(payload) {
    const response = await axiosClient.post('/cargas-academicas', payload);
    return new CargaAcademica(response.data);
  }

  async delete(id) {
    await axiosClient.delete(`/cargas-academicas/${id}`);
    return true;
  }
}
// SINGLETON
export const cargaAcademicaRepository = new HttpCargaAcademicaRepository();
