import { TextField } from '@mui/material';

/**
 * Átomo: TextAreaMensaje
 * Campo de texto multilinea para el cuerpo de un mensaje.
 * Usado en: FormularioMensajeriaGlobal
 */
export const TextAreaMensaje = ({
  label = 'Cuerpo del Mensaje',
  name = 'cuerpo',
  value,
  onChange,
  rows = 6,
  required = true,
  placeholder = 'Escriba aquí el contenido oficial...'
}) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    required={required}
    multiline
    rows={rows}
    placeholder={placeholder}
  />
);
