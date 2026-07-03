import { useEffect } from 'react';
import {
  StyledDialogTitle,
  StyledDialogActions,
  SaveButton,
  StyledDialog,
  StyledDialogContent,
  StyledButton,
  StyledTextField,
  StyledStack
} from './AlumnoFormDialog.styles';
import { useForm } from '../../../application/hooks/useForm';
import { validateSchema } from '../../../application/utils/validateSchema';
import { alumnoValidationSchema } from './alumnoValidationSchema';

const estadoInicial = {
  nombre: '',
  apellido: '',
  rut: '',
  edad: '',
  nombreApoderado: '',
  emailApoderado: '',
  telefonoApoderado: ''
};

// VIEW PATTERN
// renderiza la vista de alumnoformdialog
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
      // Merge con estadoInicial para evitar campos undefined en registros legacy
      reset({ ...estadoInicial, ...alumnoEditar });
    } else {
      reset(estadoInicial);
    }
  }, [alumnoEditar, open]);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {alumnoEditar ? 'Actualizar Ficha de Alumno' : 'Registrar Nuevo Alumno'}
      </StyledDialogTitle>

      <form onSubmit={handleSubmit(onGuardar)}>
        <StyledDialogContent dividers>
          <StyledStack spacing={2}>
            {/* DATOS DEL ESTUDIANTE */}
            <StyledStack direction="row" spacing={2}>
              <StyledTextField
                label="Nombre"
                name="nombre"
                fullWidth
                required
                value={form.nombre}
                onChange={handleChange}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
              <StyledTextField
                label="Apellido"
                name="apellido"
                fullWidth
                required
                value={form.apellido}
                onChange={handleChange}
                error={!!errors.apellido}
                helperText={errors.apellido}
              />
            </StyledStack>
            <StyledStack direction="row" spacing={2}>
              <StyledTextField
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
              <StyledTextField
                label="Edad"
                name="edad"
                type="number"
                fullWidth
                required
                value={form.edad}
                onChange={handleChange}
                error={!!errors.edad}
                helperText={errors.edad}
                slotProps={{
                  htmlInput: { min: 4, max: 20 }
                }}
              />
            </StyledStack>

            {/* DATOS DEL APODERADO (Requerido para contacto legal) */}
            <StyledTextField
              label="Nombre Completo del Apoderado"
              name="nombreApoderado"
              fullWidth
              required
              value={form.nombreApoderado}
              onChange={handleChange}
              error={!!errors.nombreApoderado}
              helperText={errors.nombreApoderado}
            />
            <StyledTextField
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
            <StyledTextField
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
          </StyledStack>
        </StyledDialogContent>

        <StyledDialogActions>
          <StyledButton onClick={onClose} color="inherit">Cancelar</StyledButton>
          <SaveButton
            type="submit"
            variant="contained"
          >
            {alumnoEditar ? 'Guardar Cambios' : 'Confirmar Matrícula'}
          </SaveButton>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
};
