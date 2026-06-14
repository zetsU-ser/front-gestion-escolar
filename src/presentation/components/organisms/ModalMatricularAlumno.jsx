import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  Typography,
  Box
} from '@mui/material';

// define el organismo modal para matricular alumnos que no estén en ningún curso
export const ModalMatricularAlumno = ({ open, onClose, alumnos = [], asignacionesGlobales = [], onAsignar }) => {
  const [edadFiltro, setEdadFiltro] = useState(''); // estado para filtrar la lista por edad

  // limpia el filtro y cierra
  const handleClose = () => {
    setEdadFiltro('');
    onClose();
  };

  // filtra los alumnos disponibles
  const alumnosDisponibles = alumnos
    .filter(a => !asignacionesGlobales.some(asig => asig.alumno?.id === a.id)) // excluye alumnos ya asignados a nivel colegio
    .filter(a => edadFiltro === '' || Number(a.edad) === Number(edadFiltro)); // filtra por edad si se especificó

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Seleccionar Alumno para Matricular</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Filtrar por Edad"
          type="number"
          fullWidth
          size="small"
          value={edadFiltro}
          onChange={(e) => setEdadFiltro(e.target.value)} // actualiza el estado del filtro de edad
          sx={{ mb: 2 }}
          placeholder="Ej: 14"
        />
        <List>
          {alumnosDisponibles.map((alumno) => ( // mapea los alumnos filtrados
            <Box key={alumno.id}>
              <ListItemButton onClick={() => {
                onAsignar(alumno.id);
                handleClose();
              }}>
                <ListItemText 
                  primary={`${alumno.nombre} ${alumno.apellido}`} 
                  secondary={`RUT: ${alumno.rut} | Edad: ${alumno.edad || 'N/A'}`}
                />
              </ListItemButton>
              <Divider />
            </Box>
          ))}
          
          {alumnosDisponibles.length === 0 && ( // renderiza fallback si no hay alumnos
            <Typography sx={{ p: 2, textAlign: 'center' }} color="textSecondary">
              No hay más alumnos disponibles para asignar bajo estos criterios.
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};
