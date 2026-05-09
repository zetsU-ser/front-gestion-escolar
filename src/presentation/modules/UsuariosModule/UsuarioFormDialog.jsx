import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Alert,
} from '@mui/material';
import { validarRut } from '../../../application/utils/validarRut';

//**HU-04: CRUD de Entidades */

const TIPOS_USUARIO = ['admin', 'coordinador', 'profesor', 'estudiante'];

const estadoInicial = { nombre: '', rut: '', tipoUsuario: 'profesor' };

export const UsuarioFormDialog = ({ open, onClose, onGuardar, usuarioEditar }) => {
  const [form, setForm] = useState(usuarioEditar || estadoInicial);
  const [errorRut, setErrorRut] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'rut') setErrorRut('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarRut(form.rut)) {
      setErrorRut('RUT inválido. Formato: 12345678-9');
      return;
    }
    onGuardar(form);
    setForm(estadoInicial);
    setErrorRut('');
  };

  const handleClose = () => {
    setForm(estadoInicial);
    setErrorRut('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{usuarioEditar ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="RUT (ej: 12345678-9)"
          name="rut"
          value={form.rut}
          onChange={handleChange}
          error={!!errorRut}
        />
        {errorRut && <Alert severity="error">{errorRut}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          select
          label="Tipo de Usuario"
          name="tipoUsuario"
          value={form.tipoUsuario}
          onChange={handleChange}
        >
          {TIPOS_USUARIO.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};
