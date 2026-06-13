import { TextField } from '@mui/material';

/**
 * Átomo: InputTexto
 * Campo de texto simple reutilizable.
 * Usado en: FormularioMensajeriaGlobal (Asunto), FormularioCrearCurso
 */
export const InputTexto = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
  type = 'text',
  fullWidth = true,
  error = false,
  helperText = '',
  ...rest
}) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    type={type}
    fullWidth={fullWidth}
    error={error}
    helperText={helperText}
    {...rest}
  />
);
