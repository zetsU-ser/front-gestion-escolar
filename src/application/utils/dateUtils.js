export const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return 'N/A';
  const hoy = new Date();
  const cumpleanos = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumpleanos.getFullYear();
  const m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) edad--;
  return isNaN(edad) ? 'N/A' : edad;
};
