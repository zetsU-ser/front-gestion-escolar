import { validarNombre } from '../../../application/utils/validarNombre';
import { validarEmail } from '../../../application/utils/validarEmail';
import { validarRut } from '../../../application/utils/validarRut';

export const getUsuarioValidationSchema = (isEditMode) => ({
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
  email: (value) => {
    if (!value || !value.trim()) return 'El correo electrónico es obligatorio';
    if (!validarEmail(value)) return 'Formato de correo electrónico inválido (ejemplo@dominio.com)';
    return null;
  },
  password: (value) => {
    if (!isEditMode) {
      if (!value || value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    } else {
      if (value && value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  },
  rut: (value) => {
    if (!value || !value.trim()) return 'El RUT es obligatorio';
    if (!validarRut(value)) return 'RUT inválido. Formato requerido: 12345678-9';
    return null;
  }
});
