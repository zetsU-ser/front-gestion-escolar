import { useEffect } from 'react';
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
import { useForm } from '../../../application/hooks/useForm';
import { validateSchema } from '../../../application/utils/validateSchema';
import { alumnoValidationSchema } from './alumnoValidationSchema';

const estadoInicial = {
  nombre: '',
  apellido: '',
  rut: '',
  nombreApoderado: '',
  emailApoderado: '',
  telefonoApoderado: ''
};

export const AlumnoFormDialog = ({ open, onClose, onGuardar, alumnoEditar }) => {

  const {
    form,
    errors,
    handleFieldChange: handleChange,
    reset,
    handleSubmit
  } = useForm(estadoInicial, (valores) => validateSchema(alumnoValidationSchema, valores));

  useEffect(() => {
    if (alumnoEditar) {
      reset(alumnoEditar);
    } else {
      reset(estadoInicial);
    }
  }, [alumnoEditar, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {alumnoEditar ? 'Actualizar Ficha de Alumno' : 'Registrar Nuevo Alumno'}
      </StyledDialogTitle>

      <form onSubmit={handleSubmit(onGuardar)}>
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
