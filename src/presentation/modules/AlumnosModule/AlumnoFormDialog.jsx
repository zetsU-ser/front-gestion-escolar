import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { 
  StyledDialogTitle, 
  StyledDialogActions, 
  SaveButton 
} from './AlumnoFormDialog.styles';
import { validarRut } from '../../../application/utils/validarRut';

const estadoInicial = {
  nombre: '',
  apellido: '',
  rut: '',
  nombreApoderado: '',
  emailApoderado: '',
  telefonoApoderado: ''
};

export const AlumnoFormDialog = ({ open, onClose, onGuardar, alumnoEditar }) => {
  
  // Estado que agrupa todos los campos del alumno
  const [form, setForm] = useState(estadoInicial);
  // Estado para capturar los errores de validación de los campos
  const [errors, setErrors] = useState({});

  // De lo contrario, lo limpiamos al estado inicial.
  useEffect(() => {
    if (alumnoEditar) {
      setForm(alumnoEditar);
    } else {
      setForm(estadoInicial);
    }
    setErrors({});
  }, [alumnoEditar, open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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

    // RUT
    if (!form.rut || !form.rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio';
    } else if (!validarRut(form.rut)) {
      newErrors.rut = 'RUT inválido. Formato requerido: 12345678-9';
    }

    // Nombre Apoderado
    if (!form.nombreApoderado || !form.nombreApoderado.trim()) {
      newErrors.nombreApoderado = 'El nombre del apoderado es obligatorio';
    } else if (form.nombreApoderado.trim().length < 2) {
      newErrors.nombreApoderado = 'El nombre debe tener al menos 2 caracteres';
    }

    // Email Apoderado
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.emailApoderado || !form.emailApoderado.trim()) {
      newErrors.emailApoderado = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(form.emailApoderado.trim())) {
      newErrors.emailApoderado = 'Formato de correo electrónico inválido';
    }

    // Teléfono Apoderado
    const phoneRegex = /^9\d{8}$/;
    if (!form.telefonoApoderado || !form.telefonoApoderado.trim()) {
      newErrors.telefonoApoderado = 'El teléfono es obligatorio';
    } else if (!phoneRegex.test(form.telefonoApoderado.trim())) {
      newErrors.telefonoApoderado = 'Formato inválido. Debe comenzar con 9 y tener 9 dígitos (ej: 9XXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onGuardar(form); // Envía los datos capturados al caso de uso
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {alumnoEditar ? 'Actualizar Ficha de Alumno' : 'Registrar Nuevo Alumno'}
      </StyledDialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            {/* DATOS DEL ESTUDIANTE */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                required
                value={form.nombre}
                onChange={handleChange}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
              <TextField
                label="Apellido"
                name="apellido"
                fullWidth
                required
                value={form.apellido}
                onChange={handleChange}
                error={!!errors.apellido}
                helperText={errors.apellido}
              />
            </Stack>
            <TextField
              label="RUT del Estudiante"
              name="rut"
              placeholder="12345678-9"
              fullWidth
              required
              value={form.rut}
              onChange={handleChange}
              error={!!errors.rut}
              helperText={errors.rut}
            />
            
            {/* DATOS DEL APODERADO (Requerido para contacto legal) */}
            <TextField
              label="Nombre Completo del Apoderado"
              name="nombreApoderado"
              fullWidth
              required
              value={form.nombreApoderado}
              onChange={handleChange}
              error={!!errors.nombreApoderado}
              helperText={errors.nombreApoderado}
            />
            <TextField
              label="Email de Contacto"
              name="emailApoderado"
              type="email"
              fullWidth
              required
              value={form.emailApoderado}
              onChange={handleChange}
              error={!!errors.emailApoderado}
              helperText={errors.emailApoderado}
            />
            <TextField
              label="Teléfono Móvil"
              name="telefonoApoderado"
              fullWidth
              required
              value={form.telefonoApoderado}
              onChange={handleChange}
              slotProps={{
                htmlInput: { maxLength: 9 }
              }}
              error={!!errors.telefonoApoderado}
              helperText={errors.telefonoApoderado || "Formato: 9XXXXXXXX"}
            />
          </Stack>
        </DialogContent>
        
        <StyledDialogActions>
          <Button onClick={onClose} color="inherit">Cancelar</Button>
          <SaveButton 
            type="submit" 
            variant="contained" 
          >
            {alumnoEditar ? 'Guardar Cambios' : 'Confirmar Matrícula'}
          </SaveButton>
        </StyledDialogActions>
      </form>
    </Dialog>
  );
};
