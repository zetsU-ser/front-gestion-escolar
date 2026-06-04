export const validarTelefono = (telefono) => {
  if (!telefono || typeof telefono !== 'string') return false;
  const phoneRegex = /^9\d{8}$/;
  return phoneRegex.test(telefono.trim());
};
