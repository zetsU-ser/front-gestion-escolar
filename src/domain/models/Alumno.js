// representa la entidad alumno
export class Alumno {
  constructor({ 
    id = null, 
    rut = '', 
    nombre = '', 
    apellido = '', 
    edad = null, 
    fechaNacimiento = '', 
    fecha_nacimiento = '',
    apoderado = null, 
    emailApoderado = '', 
    email_apoderado = '', 
    nombreApoderado = '', 
    nombre_apoderado = '',
    telefonoApoderado = '',
    telefono_apoderado = ''
  } = {}) {
    this.id = id;
    this.rut = rut;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.fechaNacimiento = fechaNacimiento || fecha_nacimiento;
    this.apoderado = apoderado;
    this.emailApoderado = emailApoderado || email_apoderado;
    this.nombreApoderado = nombreApoderado || nombre_apoderado;
    this.telefonoApoderado = telefonoApoderado || telefono_apoderado;
  }
}
