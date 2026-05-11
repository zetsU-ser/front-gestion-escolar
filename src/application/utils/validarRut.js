/**
 * UTILIDAD: validarRut
 * Valida que el RUT chileno tenga un formato básico correcto.
 * Formato esperado: 12345678-9 o 1234567-K
 * 
 * @param {string} rut - Cadena a validar.
 * @returns {boolean} True si el formato es válido.
 */
export const validarRut = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  
  // Limpiamos espacios y guiones intermedios si existieran (opcional)
  const cleanRut = rut.trim().replace(/\./g, '');
  
  // Regex: 7 a 8 dígitos + guion + dígito verificador (0-9 o K)
  const regex = /^\d{7,8}-[\dkK]$/;
  
  return regex.test(cleanRut);
};
