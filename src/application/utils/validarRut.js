export const validarRut = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  
  // Limpiamos puntos
  const cleanRut = rut.trim().replace(/\./g, '');
  
  // Formato: 7-8 digitos + guion + DV (0-9 o K)
  const regex = /^\d{7,8}-[\dkK]$/;
  
  return regex.test(cleanRut);
};
