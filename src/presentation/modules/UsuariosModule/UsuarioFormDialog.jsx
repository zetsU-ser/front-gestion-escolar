import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { validarRut } from '../../../application/utils/validarRut';
import {
  StyledDialogTitle,
  StyledDialogActions,
  SaveButton
} from './UsuarioFormDialog.styles';

const TIPOS_USUARIO = ['DOCENTE', 'COORDINADOR'];

const estadoInicial = {
  nombre: '',
  apellido: '',
  email: '',
  rut: '',
  rol: 'DOCENTE',
  password: ''
};

export const UsuarioFormDialog = ({ open, onClose, onGuardar, usuarioEditar }) => {

  // Mantiene los valores de los inputs del formulario
  const [form, setForm] = useState(estadoInicial);

  // Almacena el mensaje de error de validación del RUT
  const [errorRut, setErrorRut] = useState('');
  useEffect(() => {
    if (usuarioEditar) {
      setForm({ ...usuarioEditar, password: '' }); // No mostramos el hash de la contraseña
    } else {
      setForm(estadoInicial);
    }
  }, [usuarioEditar, open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Limpieza reactiva del error de RUT mientras el usuario escribe
    if (name === 'rut') setErrorRut('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDACIÓN: El RUT debe cumplir el formato chileno estándar
    if (!validarRut(form.rut)) {
      setErrorRut('RUT inválido. Formato requerido: 12345678-9');
      return;
    }

    // Aseguramos consistencia en el ROL para el Backend (Enums en Java suelen ser UPPERCASE)
    onGuardar({
      ...form,
      rol: form.rol.toUpperCase()
    });

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
      <StyledDialogTitle>
        {usuarioEditar ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
      </StyledDialogTitle>

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
          label="Apellido"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo Electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          disabled={!!usuarioEditar} // El email suele ser el identificador en Firebase, mejor no cambiarlo aquí
        />
        <TextField
          margin="normal"
          required={!usuarioEditar}
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          slotProps={{
            inputLabel: { shrink: true }
          }}
          helperText={usuarioEditar ? "Dejar en blanco para mantener la actual" : "Mínimo 6 caracteres"}
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
          helperText={errorRut}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          select
          label="Rol / Tipo de Usuario"
          name="rol"
          value={form.rol}
          onChange={handleChange}
        >
          {TIPOS_USUARIO.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <StyledDialogActions>
        <Button onClick={handleClose} color="inherit">Cancelar</Button>
        <SaveButton variant="contained" onClick={handleSubmit}>
          {usuarioEditar ? 'Actualizar' : 'Crear Usuario'}
        </SaveButton>
      </StyledDialogActions>
    </Dialog>
  );
};
