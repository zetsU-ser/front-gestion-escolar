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
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (usuarioEditar) {
      setForm({ ...usuarioEditar, password: '' }); // No mostramos el hash de la contraseña
    } else {
      setForm(estadoInicial);
    }
    setErrors({});
  }, [usuarioEditar, open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Limpieza reactiva del error de campo mientras el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre
    if (!form.nombre || !form.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Apellido
    if (!form.apellido || !form.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    } else if (form.apellido.trim().length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !form.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    // Password
    if (!usuarioEditar) {
      if (!form.password || form.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
    } else {
      if (form.password && form.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    // RUT
    if (!form.rut || !form.rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio';
    } else if (!validarRut(form.rut)) {
      newErrors.rut = 'RUT inválido. Formato requerido: 12345678-9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Aseguramos consistencia en el ROL para el Backend (Enums en Java suelen ser UPPERCASE)
    onGuardar({
      ...form,
      rol: form.rol.toUpperCase()
    });

    setForm(estadoInicial);
    setErrors({});
  };

  const handleClose = () => {
    setForm(estadoInicial);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>
        {usuarioEditar ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
      </StyledDialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            error={!!errors.apellido}
            helperText={errors.apellido}
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password || (usuarioEditar ? "Dejar en blanco para mantener la actual" : "Mínimo 6 caracteres")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="RUT (ej: 12345678-9)"
            name="rut"
            value={form.rut}
            onChange={handleChange}
            error={!!errors.rut}
            helperText={errors.rut}
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
          <SaveButton variant="contained" type="submit">
            {usuarioEditar ? 'Actualizar' : 'Crear Usuario'}
          </SaveButton>
        </StyledDialogActions>
      </form>
    </Dialog>
  );
};
