export class Usuario {
  constructor(id = null, nombre = '', rut = '', tipoUsuario = '') {
    this.id = id;
    this.nombre = nombre;
    this.rut = rut;
    this.tipoUsuario = tipoUsuario;
  }
}
