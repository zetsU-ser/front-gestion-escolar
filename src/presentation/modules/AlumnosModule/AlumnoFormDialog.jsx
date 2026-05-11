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
  // De lo contrario, lo limpiamos al estado inicial.
  useEffect(() => {
    if (alumnoEditar) {
      setForm(alumnoEditar);
    } else {
      setForm(estadoInicial);
    }
  }, [alumnoEditar, open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form); // Envía los datos capturados al caso de uso
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        {alumnoEditar ? '📝 Actualizar Ficha de Alumno' : '🎓 Registrar Nuevo Alumno'}
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
              />
              <TextField
                label="Apellido"
                name="apellido"
                fullWidth
                required
                value={form.apellido}
                onChange={handleChange}
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
            />
            
            {/* DATOS DEL APODERADO (Requerido para contacto legal) */}
            <TextField
              label="Nombre Completo del Apoderado"
              name="nombreApoderado"
              fullWidth
              required
              value={form.nombreApoderado}
              onChange={handleChange}
            />
            <TextField
              label="Email de Contacto"
              name="emailApoderado"
              type="email"
              fullWidth
              required
              value={form.emailApoderado}
              onChange={handleChange}
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
              helperText="Formato: 9XXXXXXXX"
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
