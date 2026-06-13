import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// define el componente molécula FilaAlumnoGlobal para mostrar los datos de un alumno
export const FilaAlumnoGlobal = ({ alumno, onEdit, onDelete }) => {
  return (
    <TableRow hover>
      <TableCell>{alumno.rut}</TableCell>
      <TableCell>{alumno.nombre} {alumno.apellido}</TableCell>
      <TableCell>{alumno.nombreApoderado}</TableCell>
      <TableCell>{alumno.emailApoderado}</TableCell>
      <TableCell>{alumno.telefonoApoderado}</TableCell>
      <TableCell align="right">
        {/* botón para editar alumno */}
        <IconButton color="primary" onClick={() => onEdit(alumno)}>
          <EditIcon />
        </IconButton>
        {/* botón para eliminar alumno */}
        <IconButton color="error" onClick={() => onDelete(alumno.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
