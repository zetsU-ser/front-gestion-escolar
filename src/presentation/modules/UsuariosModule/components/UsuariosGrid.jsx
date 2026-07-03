import { TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TablePaper, StyledTable, StyledTableHeader, HeaderCell, EmptyRowCell } from '../UsuariosTable.styles';

// VIEW PATTERN
// renderiza la vista de usuariosgrid
export const UsuariosGrid = ({ usuarios, puedeGestionar, handleEditar, handleEliminar }) => {
  return (
    <TablePaper component={Paper}>
      <StyledTable>
        <StyledTableHeader>
          <TableRow>
            <HeaderCell>Nombre</HeaderCell>
            <HeaderCell>Email</HeaderCell>
            <HeaderCell>Rol</HeaderCell>
            <HeaderCell align="right">Acciones</HeaderCell>
          </TableRow>
        </StyledTableHeader>
        <TableBody>
          {usuarios.length === 0 ? (
            <TableRow>
              <EmptyRowCell colSpan={4} align="center">No hay usuarios registrados.</EmptyRowCell>
            </TableRow>
          ) : (
            usuarios.map((usuario) => (
              <TableRow key={usuario.id} hover>
                <TableCell>{usuario.nombre} {usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell align="right">
                  {puedeGestionar && (
                    <>
                      <IconButton color="primary" onClick={() => handleEditar(usuario)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleEliminar(usuario.id)}><DeleteIcon /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </TablePaper>
  );
};
