import { validarNombre } from '../../../application/utils/validarNombre';
import { validarEmail } from '../../../application/utils/validarEmail';
import { validarTelefono } from '../../../application/utils/validarTelefono';
import { validarRut } from '../../../application/utils/validarRut';

export const alumnoValidationSchema = {
  nombre: (value) => {
    if (!value || !value.trim()) return 'El nombre es obligatorio';
    if (!validarNombre(value)) return 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras, espacios, guiones o apóstrofes';
    return null;
  },
  apellido: (value) => {
    if (!value || !value.trim()) return 'El apellido es obligatorio';
    if (!validarNombre(value)) return 'El apellido debe tener entre 2 y 50 caracteres y solo contener letras, espacios, guiones o apóstrofes';
    return null;
  },
  rut: (value) => {
    if (!value || !value.trim()) return 'El RUT es obligatorio';
    if (!validarRut(value)) return 'RUT inválido. Formato requerido: 12345678-9';
    return null;
  },
  edad: (value) => {
    if (!value || value === '') return 'La edad es obligatoria';
    const edadNum = Number(value);
    if (isNaN(edadNum) || edadNum < 4 || edadNum > 20) return 'La edad debe estar entre 4 y 20 años';
    return null;
  },
  nombreApoderado: (value) => {
    if (!value || !value.trim()) return 'El nombre del apoderado es obligatorio';
    if (!validarNombre(value)) return 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras, espacios, guiones o apóstrofes';
    return null;
  },
  emailApoderado: (value) => {
    if (!value || !value.trim()) return 'El correo electrónico es obligatorio';
    if (!validarEmail(value)) return 'Formato de correo electrónico inválido (ejemplo@dominio.com)';
    return null;
  },
  telefonoApoderado: (value) => {
    if (!value || !value.trim()) return 'El teléfono es obligatorio';
    if (!validarTelefono(value)) return 'Formato inválido. Debe comenzar con 9 y tener 9 dígitos (ej: 9XXXXXXXX)';
    return null;
  }
};
