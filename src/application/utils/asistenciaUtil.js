export const calcularPorcentajeAsistencia = (diasPresente, totalDias) => {
  if (!totalDias || totalDias === 0) return '0%';
  const porcentaje = (diasPresente / totalDias) * 100;
  return `${Math.round(porcentaje)}%`;
};
