import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { useAuth } from '../../../application/context/AuthContext';
import { UsuarioFormDialog } from './UsuarioFormDialog';

//**HU-04: CRUD de Entidades */

export const UsuariosTable = ({ filtroTipo = null, titulo = 'Usuarios' }) => {
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios(filtroTipo);
  const { isAdmin, isCoordinador } = useAuth();
  const puedeGestionar = isAdmin() || isCoordinador();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const handleAgregar = () => {
    setUsuarioEditar(null);
    setDialogOpen(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setDialogOpen(true);
  };

  const handleGuardar = async (form) => {
    if (usuarioEditar) {
      await actualizar(usuarioEditar.id, form);
    } else {
      await crear(form);
    }
    setDialogOpen(false);
  };

  if (loading) return <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" color="primary">{titulo}</Typography>
        {puedeGestionar && (
          <Button variant="contained" onClick={handleAgregar}>Agregar</Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Tipo</TableCell>
              {puedeGestionar && <TableCell align="center">Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No hay registros.</TableCell>
              </TableRow>
            ) : (
              usuarios.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.nombre}</TableCell>
                  <TableCell>{u.rut}</TableCell>
                  <TableCell>{u.tipoUsuario}</TableCell>
                  {puedeGestionar && (
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEditar(u)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => eliminar(u.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <UsuarioFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGuardar={handleGuardar}
        usuarioEditar={usuarioEditar}
      />
    </Box>
  );
};
