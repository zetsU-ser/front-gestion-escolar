// representa la entidad calificacion
export class Calificacion {
  constructor({ id = null, alumnoId = null, cursoId = null, nota = 0, fecha = '', descripcion = '' } = {}) {
    this.id = id;
    this.alumnoId = alumnoId;
    this.cursoId = cursoId;
    this.nota = nota;
    this.fecha = fecha;
    this.descripcion = descripcion;
  }
}
