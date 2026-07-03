// representa la entidad asistencia
export class Asistencia {
  constructor({ id = null, alumnoId = null, cursoId = null, cargaAcademicaId = null, fecha = '', estado = 'PRESENTE', justificado = false } = {}) {
    this.id = id;
    this.alumnoId = alumnoId;
    this.cursoId = cursoId;
    this.cargaAcademicaId = cargaAcademicaId;
    this.fecha = fecha ? fecha.split('T')[0] : '';
    this.estado = estado;
    this.justificado = justificado;
  }
}
