export const calcularPromedio = (notas = []) => {
  const validNotas = notas
    .map(n => parseFloat(n))
    .filter(n => !isNaN(n) && n >= 1.0 && n <= 7.0);
  
  if (validNotas.length === 0) return '-';
  
  const sum = validNotas.reduce((acc, curr) => acc + curr, 0);
  return (sum / validNotas.length).toFixed(1);
};
