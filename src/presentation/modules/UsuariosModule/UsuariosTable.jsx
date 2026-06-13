import { useState } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { useAuth } from '../../../application/context/AuthContext';
import { UsuarioFormDialog } from './UsuarioFormDialog';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { TablaUsuariosGlobal } from '../../components/organisms/TablaUsuariosGlobal';
import {
  LoadingContainer,
  MainContainer,
  AddButton
} from './UsuariosTable.styles';

export const UsuariosTable = ({ filtroTipo = null, titulo = 'Usuarios' }) => {
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios(filtroTipo);
  const { currentUser, isAdmin, isCoordinador } = useAuth();
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
      {/* muestra el encabezado del módulo */}
      <HeaderModulo 
        titulo={titulo} 
        correo={currentUser?.email}
      />

      <Divider sx={{ mb: 4 }} /> {/* separador visual idéntico al dashboard */}

      {puedeGestionar && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <AddButton variant="contained" onClick={handleAgregar}>
            Nuevo Usuario
          </AddButton>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {errorGuardar && <Alert severity="error" sx={{ mb: 2 }}>{errorGuardar}</Alert>}

      {/* Organismo: Tabla de Usuarios Atomizada */}
      <TablaUsuariosGlobal
        usuarios={usuarios}
        onEdit={handleEditar}
        onDelete={eliminar}
        puedeGestionar={puedeGestionar}
      />

      <UsuarioFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGuardar={handleGuardar}
        usuarioEditar={usuarioEditar}
      />
    </MainContainer>
  );
};
