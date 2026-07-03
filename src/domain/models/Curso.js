// representa la entidad curso
export class Curso {
  constructor({ id = null, nivel = '', letra = '', anio = new Date().getFullYear(), profesorJefeId = null } = {}) {
    this.id = id;
    this.nivel = nivel;
    this.letra = letra;
    this.anio = anio;
    this.profesorJefeId = profesorJefeId;
  }
}
