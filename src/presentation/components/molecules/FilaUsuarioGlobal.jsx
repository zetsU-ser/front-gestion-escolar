import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// define el componente molécula FilaUsuarioGlobal para mostrar los datos de un usuario
export const FilaUsuarioGlobal = ({ usuario, onEdit, onDelete, puedeGestionar }) => {
  return (
    <TableRow hover>
      <TableCell>{usuario.nombre} {usuario.apellido}</TableCell>
      <TableCell>{usuario.email}</TableCell>
      <TableCell>{usuario.rol}</TableCell>
      <TableCell align="right">
        {puedeGestionar && (
          <>
            {/* botón para editar usuario */}
            <IconButton color="primary" onClick={() => onEdit(usuario)}>
              <EditIcon />
            </IconButton>
            {/* botón para eliminar usuario */}
            <IconButton color="error" onClick={() => onDelete(usuario.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
