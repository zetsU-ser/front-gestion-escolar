import { useState } from 'react';
import { useUsuarios } from '../../../../application/use-cases/useUsuarios';
import { useAuth } from '../../../../application/context/AuthContext';
import { useDialog } from '../../../shared/hooks/useDialog';

// CUSTOM HOOK
// maneja la lógica de usuariostableviewmodel
export const useUsuariosTableViewModel = (filtroTipo) => {
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios(filtroTipo);
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  const puedeGestionar = isAdmin() || isCoordinador();

  const { isOpen: dialogOpen, itemData: usuarioEditar, openDialog: handleEditar, closeDialog } = useDialog(false);
  const [errorGuardar, setErrorGuardar] = useState(null);

  // abre el diálogo para registrar un nuevo usuario
  const handleAgregar = () => handleEditar(null);

// ejecuta la acción asíncrona de handleGuardar
  const handleGuardar = async (datos) => {
    try {
      if (usuarioEditar) await actualizar(usuarioEditar.id, datos);
      else await crear(datos);
      
      closeDialog();
      setErrorGuardar(null);
    } catch (err) {
      setErrorGuardar(err.message);
    }
  };

// ejecuta la acción asíncrona de handleEliminar
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar este usuario?")) {
      await eliminar(id);
    }
  };

  return {
    usuarios, loading, error, currentUser, puedeGestionar,
    dialogOpen, setDialogOpen: closeDialog, usuarioEditar, errorGuardar,
    handleAgregar, handleEditar, handleGuardar, handleEliminar
  };
};
