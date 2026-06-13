import { Table, TableBody, TableRow, Paper } from '@mui/material';
import { FilaUsuarioGlobal } from '../molecules/FilaUsuarioGlobal';
import { TablePaper, StyledTableHeader, HeaderCell, EmptyRowCell } from '../../modules/UsuariosModule/UsuariosTable.styles';

// define el componente organismo TablaUsuariosGlobal que agrupa múltiples filas
export const TablaUsuariosGlobal = ({ usuarios, onEdit, onDelete, puedeGestionar }) => {
  return (
    <TablePaper component={Paper}>
      <Table sx={{ minWidth: 650 }}>
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
              {/* muestra un mensaje si no hay usuarios registrados */}
              <EmptyRowCell colSpan={4} align="center">
                No hay usuarios registrados.
              </EmptyRowCell>
            </TableRow>
          ) : (
            // itera sobre el arreglo de usuarios para renderizar cada fila
            usuarios.map((usuario) => (
              <FilaUsuarioGlobal
                key={usuario.id}
                usuario={usuario}
                onEdit={onEdit}
                onDelete={onDelete}
                puedeGestionar={puedeGestionar}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TablePaper>
  );
};
