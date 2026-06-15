import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Box,
  Checkbox,
  ListItemIcon,
  DialogActions,
  Button
} from '@mui/material';

// define el organismo modal para matricular alumnos que no estén en ningún curso
export const ModalMatricularAlumno = ({ open, onClose, alumnos = [], asignacionesGlobales = [], onAsignar }) => {
  const [seleccionados, setSeleccionados] = useState([]); // estado para multi-select

  // limpia la seleccion y cierra
  const handleClose = () => {
    setSeleccionados([]);
    onClose();
  };

  const handleToggle = (id) => {
    setSeleccionados(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAsignarMasivo = async () => {
    // Si onAsignar no soporta array, lo llamamos uno por uno
    for (const id of seleccionados) {
      await onAsignar(id);
    }
    handleClose();
  };

  // filtra los alumnos disponibles
  const alumnosDisponibles = alumnos
    .filter(a => !asignacionesGlobales.some(asig => asig.alumno?.id === a.id)); // excluye alumnos ya asignados a nivel colegio

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A';
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return isNaN(edad) ? 'N/A' : edad;
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Seleccionar Alumno para Matricular</DialogTitle>
      <DialogContent dividers>
        <List>
          {alumnosDisponibles.map((alumno) => {
            const isSelected = seleccionados.includes(alumno.id);
            return (
              <Box key={alumno.id}>
                <ListItemButton onClick={() => handleToggle(alumno.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${alumno.nombre} ${alumno.apellido}`} 
                    secondary={`RUT: ${alumno.rut} | Edad: ${alumno.edad || calcularEdad(alumno.fecha_nacimiento)}`}
                  />
                </ListItemButton>
                <Divider />
              </Box>
            );
          })}
          
          {alumnosDisponibles.length === 0 && ( // renderiza fallback si no hay alumnos
            <Typography sx={{ p: 2, textAlign: 'center' }} color="textSecondary">
              No hay más alumnos disponibles para asignar bajo estos criterios.
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={handleAsignarMasivo}
          disabled={seleccionados.length === 0}
        >
          Matricular Masivo ({seleccionados.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};
