// representa la entidad usuario
export class Usuario {
  constructor(id = null, nombre = '', rut = '', rol = '', email = '', apellido = '', asignatura_id = null) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.rut = rut;
    this.rol = rol;
    this.tipoUsuario = rol; // Mantenemos tipoUsuario por compatibilidad
    this.email = email;
    this.asignatura_id = asignatura_id;
  }
}
