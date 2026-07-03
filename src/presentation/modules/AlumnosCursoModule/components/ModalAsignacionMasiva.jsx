import { 
  Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemText, 
  Divider, Box, Checkbox, ListItemIcon, DialogActions, Button 
} from '@mui/material';
import { EmptyTypography } from './ModalAsignacionMasiva.styles';

// VIEW PATTERN
// renderiza la vista de modalasignacionmasiva
export const ModalAsignacionMasiva = ({
  openSelector, handleCloseModal, handleToggleSeleccion, handleAsignarMasivo,
  alumnosDisponibles, seleccionados, calcularEdad
}) => {
  return (
    <Dialog open={openSelector} onClose={handleCloseModal} fullWidth maxWidth="sm">
      <DialogTitle>Seleccionar Alumno para Matricular</DialogTitle>
      <DialogContent dividers>
        <List>
          {alumnosDisponibles.map((alumno) => {
            const isSelected = seleccionados.includes(alumno.id);
            return (
              <Box key={alumno.id}>
                <ListItemButton onClick={() => handleToggleSeleccion(alumno.id)}>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={isSelected} tabIndex={-1} disableRipple />
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
          {alumnosDisponibles.length === 0 && (
            <EmptyTypography color="textSecondary">
              No hay más alumnos disponibles para asignar bajo estos criterios.
            </EmptyTypography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancelar</Button>
        <Button variant="contained" onClick={handleAsignarMasivo} disabled={seleccionados.length === 0}>
          Matricular Masivo ({seleccionados.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};
