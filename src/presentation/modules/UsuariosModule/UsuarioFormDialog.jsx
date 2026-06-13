import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { useForm } from '../../../application/hooks/useForm';
import { validateSchema } from '../../../application/utils/validateSchema';
import { getUsuarioValidationSchema } from './usuarioValidationSchema';
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
  password: '',
  asignatura_id: ''
};

export const UsuarioFormDialog = ({ open, onClose, onGuardar, usuarioEditar }) => {

  const {
    form,
    errors,
    handleFieldChange: handleChange,
    reset,
    handleSubmit
  } = useForm(estadoInicial, (valores) => validateSchema(getUsuarioValidationSchema(!!usuarioEditar), valores));

  useEffect(() => {
    if (usuarioEditar) {
      reset({ ...usuarioEditar, password: '' });
    } else {
      reset(estadoInicial);
    }
  }, [usuarioEditar, open]);

  const onSubmit = (formData) => {
    onGuardar({
      ...formData,
      rol: formData.rol.toUpperCase()
    });
    reset(estadoInicial);
  };

  const handleClose = () => {
    reset(estadoInicial);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>
        {usuarioEditar ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
      </StyledDialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled={!!usuarioEditar} // identificador en Firebase, mejor no cambiarlo aquí
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

          {form.rol === 'DOCENTE' && (
            <TextField
              margin="normal"
              required
              fullWidth
              select
              label="Asignatura Base"
              name="asignatura_id"
              value={form.asignatura_id || ''}
              onChange={handleChange}
              error={!!errors.asignatura_id}
              helperText={errors.asignatura_id}
            >
              <MenuItem value={1}>Matemáticas</MenuItem>
              <MenuItem value={2}>Lenguaje y Comunicación</MenuItem>
              <MenuItem value={3}>Historia y Geografía</MenuItem>
              <MenuItem value={4}>Ciencias Naturales</MenuItem>
              <MenuItem value={5}>Inglés</MenuItem>
            </TextField>
          )}
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
