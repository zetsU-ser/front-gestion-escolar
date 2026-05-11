import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { useAuth } from '../../../application/context/AuthContext';
import { UsuarioFormDialog } from './UsuarioFormDialog';
import {
  LoadingContainer,
  MainContainer,
  HeaderContainer,
  TitleText,
  AddButton,
  TablePaper,
  StyledTableHeader,
  HeaderCell,
  EmptyRowCell
} from './UsuariosTable.styles';

export const UsuariosTable = ({ filtroTipo = null, titulo = 'Usuarios' }) => {
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios(filtroTipo);
  const { isAdmin, isCoordinador } = useAuth();
  const puedeGestionar = isAdmin() || isCoordinador();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [errorGuardar, setErrorGuardar] = useState(null);

  const handleAgregar = () => {
    setUsuarioEditar(null);
    setDialogOpen(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setDialogOpen(true);
  };

  const handleGuardar = async (datos) => {
    try {
      if (usuarioEditar) {
        await actualizar(usuarioEditar.id, datos);
      } else {
        await crear(datos);
      }
      setDialogOpen(false);
      setErrorGuardar(null);
    } catch (err) {
      setErrorGuardar(err.message);
    }
  };

  if (loading) return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );

  return (
    <MainContainer>
      <HeaderContainer>
        <TitleText variant="h5">{titulo}</TitleText>
        {puedeGestionar && (
          <AddButton variant="contained" onClick={handleAgregar}>
            Nuevo Usuario
          </AddButton>
        )}
      </HeaderContainer>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {errorGuardar && <Alert severity="error" sx={{ mb: 2 }}>{errorGuardar}</Alert>}

      <TablePaper component={Paper}>
        <Table>
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
                <EmptyRowCell colSpan={4} align="center">
                  No hay usuarios registrados.
                </EmptyRowCell>
              </TableRow>
            ) : (
              usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nombre} {usuario.apellido}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  <TableCell align="right">
                    {puedeGestionar && (
                      <>
                        <IconButton onClick={() => handleEditar(usuario)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => eliminar(usuario.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TablePaper>

      <UsuarioFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGuardar={handleGuardar}
        usuarioEditar={usuarioEditar}
      />
    </MainContainer>
  );
};
