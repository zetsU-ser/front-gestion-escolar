export const validarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') return false;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'\-]+$/;
  const trimmed = nombre.trim();
  return trimmed.length >= 2 && trimmed.length <= 50 && nameRegex.test(trimmed);
};
