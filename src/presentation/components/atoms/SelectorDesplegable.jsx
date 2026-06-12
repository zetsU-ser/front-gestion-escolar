import { TextField, MenuItem } from '@mui/material';

/**
 * Átomo: SelectorDesplegable
 * Componente genérico de selección reutilizable. Renderiza un dropdown a partir
 * de un array de opciones { value, label }.
 * Usado en: FormularioAsignacionBloque, FormularioMensajeriaGlobal, GestionAcademica
 */
export const SelectorDesplegable = ({
  label,
  name,
  value,
  onChange,
  opciones = [],
  required = false,
  disabled = false,
  fullWidth = true,
  sx = {}
}) => (
  <TextField
    select
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    disabled={disabled}
    fullWidth={fullWidth}
    sx={sx}
  >
    {opciones.map(opcion => (
      <MenuItem key={opcion.value} value={opcion.value}>
        {opcion.label}
      </MenuItem>
    ))}
  </TextField>
);
