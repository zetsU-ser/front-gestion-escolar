import { UsuarioFormDialog } from './UsuarioFormDialog';
import { UsuariosGrid } from './components/UsuariosGrid';
import { useUsuariosTableViewModel } from './hooks/useUsuariosTableViewModel';
import { GenericTableModule } from '../../../shared/components/GenericTableModule';

// VIEW PATTERN
// renderiza la vista de usuariostable
export const UsuariosTable = ({ filtroTipo = null, titulo = 'Usuarios' }) => {
  const {
    usuarios, loading, error, currentUser, puedeGestionar,
    dialogOpen, setDialogOpen, usuarioEditar, errorGuardar,
    handleAgregar, handleEditar, handleGuardar, handleEliminar
  } = useUsuariosTableViewModel(filtroTipo);

  return (
    <GenericTableModule
      titulo={titulo}
      correo={currentUser?.email}
      loading={loading}
      error={error}
      errorGuardar={errorGuardar}
      puedeGestionar={puedeGestionar}
      onAgregar={handleAgregar}
      textoBotonAgregar="Nuevo Usuario"
      alineacionBoton="flex-end"
      loadingText=""
      gridComponent={
        <UsuariosGrid 
          usuarios={usuarios} puedeGestionar={puedeGestionar} 
          handleEditar={handleEditar} handleEliminar={handleEliminar} 
        />
      }
      dialogComponent={
        <UsuarioFormDialog
          open={dialogOpen} onClose={() => setDialogOpen(false)}
          onGuardar={handleGuardar} usuarioEditar={usuarioEditar}
        />
      }
    />
  );
};

