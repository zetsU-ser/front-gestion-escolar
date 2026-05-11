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

/**
 * COMPONENTE: UsuariosTable
 * Muestra la lista de usuarios y permite realizar operaciones CRUD.
 * Soporta filtrado por tipo (p.ej: COORDINADOR, DOCENTE).
 */
export const UsuariosTable = ({ filtroTipo = null, titulo = 'Usuarios' }) => {
  // --- GESTIÓN DE DATOS EXTERNOS ---
  // Hook que maneja la comunicación con el microservicio de usuarios
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios(filtroTipo);
  
  // Hook de autenticación para validar permisos de edición/eliminación
  const { isAdmin, isCoordinador } = useAuth();
  const puedeGestionar = isAdmin() || isCoordinador();

  // --- ESTADOS LOCALES ---
  
  // Controla la visibilidad del modal de formulario
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Almacena temporalmente el usuario seleccionado para edición (null si es creación)
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  
  // Captura mensajes de error específicos de Firebase o Backend durante el guardado
  const [errorGuardar, setErrorGuardar] = useState(null);

  // --- MANEJADORES DE EVENTOS ---

  const handleAgregar = () => {
    setUsuarioEditar(null); // Limpiamos el objeto para que el modal sea de "creación"
    setDialogOpen(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario); // Pasamos los datos al modal para "edición"
    setDialogOpen(true);
  };

  /**
   * Procesa el envío del formulario, decidiendo si llamar a crear o actualizar.
   */
  const handleGuardar = async (form) => {
    setErrorGuardar(null);
    try {
      if (usuarioEditar) {
        await actualizar(usuarioEditar.id, form);
      } else {
        await crear(form);
      }
      setDialogOpen(false); // Éxito
    } catch (err) {
      // Manejo específico de colisiones de email en Firebase
      const msg = err.code === 'auth/email-already-in-use' 
        ? 'El correo ya está registrado en Firebase.' 
        : 'Error al guardar. Verifica la conexión con el backend y Firebase.';
      setErrorGuardar(msg);
    }
  };

  // Renderizado de carga centralizado
  if (loading) return <LoadingContainer><CircularProgress /></LoadingContainer>;

  return (
    <MainContainer>
      {/* CABECERA: Título dinámico y botón de acción */}
      <HeaderContainer>
        <TitleText variant="h5">{titulo}</TitleText>
        {puedeGestionar && (
          <AddButton variant="contained" onClick={handleAgregar}>
            Nuevo Usuario
          </AddButton>
        )}
      </HeaderContainer>

      {/* ALERTAS DE ERROR */}
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error} (Backend no disponible)</Alert>}
      {errorGuardar && <Alert severity="error" sx={{ mb: 2 }}>{errorGuardar}</Alert>}

      {/* TABLA DE RESULTADOS */}
      <TablePaper component={Paper}>
        <Table>
          <StyledTableHeader>
            <TableRow>
              <HeaderCell>Nombre Completo</HeaderCell>
              <HeaderCell>Email</HeaderCell>
              <HeaderCell>RUT</HeaderCell>
              <HeaderCell>Rol</HeaderCell>
              {puedeGestionar && <HeaderCell align="center">Acciones</HeaderCell>}
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <EmptyRowCell colSpan={5} align="center">
                  No se encontraron registros.
                </EmptyRowCell>
              </TableRow>
            ) : (
              usuarios.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.nombre} {u.apellido}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.rut}</TableCell>
                  <TableCell>{u.rol}</TableCell>
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
      </TablePaper>

      {/* COMPONENTE MODAL DE FORMULARIO */}
      <UsuarioFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGuardar={handleGuardar}
        usuarioEditar={usuarioEditar}
      />
    </MainContainer>
  );
};
