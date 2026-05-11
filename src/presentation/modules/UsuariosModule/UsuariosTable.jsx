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
  // Hook que maneja la comunicación con el microservicio de usuarios
  const { usuarios, loading, error, crear, actualizar, eliminar } = useUsuarios(filtroTipo);
  
  // Hook de autenticación para validar permisos de edición/eliminación
  const { isAdmin, isCoordinador } = useAuth();
  const puedeGestionar = isAdmin() || isCoordinador();

  
  // Controla la visibilidad del modal de formulario
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Almacena temporalmente el usuario seleccionado para edición (null si es creación)
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  
  // Captura mensajes de error específicos de Firebase o Backend durante el guardado
  const [errorGuardar, setErrorGuardar] = useState(null);


  const handleAgregar = () => {
    setUsuarioEditar(null); // Limpiamos el objeto para que el modal sea de "creación"
    setDialogOpen(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario); // Pasamos los datos al modal para "edición"
    setDialogOpen(true);
  };

  }
      <UsuarioFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGuardar={handleGuardar}
        usuarioEditar={usuarioEditar}
      />
    </MainContainer>
  );
};
