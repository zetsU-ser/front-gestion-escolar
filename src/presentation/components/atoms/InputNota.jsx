import { TextField } from '@mui/material';

export const InputNota = ({ value, onChange, disabled, label }) => {
  const handleChange = (e) => {
    let val = e.target.value;
    // Permitir solo números y punto
    if (!/^[0-7]*\.?[0-9]*$/.test(val)) return;
    
    // Si el valor numérico es mayor a 7.0 o menor a 1.0, se puede mostrar error visualmente
    // Aquí solo filtramos entrada, validación estricta al guardar.
    onChange(val);
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      label={label || 'Nota'}
      value={value || ''}
      onChange={handleChange}
      disabled={disabled}
      slotProps={{ htmlInput: { inputMode: 'decimal', maxLength: 3 } }}
      sx={{ width: '80px' }}
      placeholder="e.g. 7.0"
    />
  );
};
