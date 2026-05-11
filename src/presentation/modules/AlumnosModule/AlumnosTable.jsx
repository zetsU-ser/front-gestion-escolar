import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { AlumnoFormDialog } from './AlumnoFormDialog';
import { 
  LoadingText, 
  MainContainer, 
  HeaderContainer, 
  TitleText, 
  AddButton, 
  TablePaper, 
  StyledTableHeader, 
  HeaderCell, 
  EmptyRowCell 
} from './AlumnosTable.styles';

/**
 * COMPONENTE: AlumnosTable
 * Administra la visualización y acciones CRUD para la entidad Alumno.
 * Nota: Los alumnos son gestionados por el Coordinador.
 */
export const AlumnosTable = () => {
  // --- GESTIÓN DE DATOS ---
  // Hook que encapsula la lógica de negocio de alumnos
  const { alumnos, loading, crear, actualizar, eliminar } = useAlumnos();
  
  // --- ESTADOS LOCALES ---
  
  // Controla la visibilidad del modal de registro/edición
  const [open, setOpen] = useState(false);
  
  // Almacena el objeto del alumno que se desea editar, o null si es un nuevo registro
  const [alumnoEditar, setAlumnoEditar] = useState(null);

  // --- MANEJADORES ---

  const handleOpen = (alumno = null) => {
    setAlumnoEditar(alumno); // Si viene un alumno, el modal entra en modo edición
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlumnoEditar(null); // Reseteamos para que la próxima apertura sea limpia
  };

  const handleGuardar = async (form) => {
    try {
      if (alumnoEditar) {
        await actualizar(alumnoEditar.id, form);
      } else {
        await crear(form);
      }
      handleClose(); // Cierra tras éxito
    } catch (error) {
      alert("No se pudo guardar la información del alumno: " + error.message);
    }
  };

  if (loading) return <LoadingText>Cargando base de datos de alumnos...</LoadingText>;

  return (
    <MainContainer>
      {/* CABECERA DE MÓDULO */}
      <HeaderContainer>
        <TitleText variant="h5">
          Registro de Alumnos (Matrículas)
        </TitleText>
        <AddButton 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
        >
          Registrar Nuevo Alumno
        </AddButton>
      </HeaderContainer>

      {/* CONTENEDOR DE TABLA PREMIUM */}
      <TablePaper component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <StyledTableHeader>
            <TableRow>
              <HeaderCell>RUT</HeaderCell>
              <HeaderCell>Nombre Completo</HeaderCell>
              <HeaderCell>Apoderado</HeaderCell>
              <HeaderCell>Email Apoderado</HeaderCell>
              <HeaderCell>Teléfono</HeaderCell>
              <HeaderCell align="right">Acciones</HeaderCell>
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {alumnos.length === 0 ? (
              <TableRow>
                <EmptyRowCell colSpan={6} align="center">
                  No hay alumnos registrados.
                </EmptyRowCell>
              </TableRow>
            ) : (
              alumnos.map((alumno) => (
                <TableRow key={alumno.id} hover>
                  <TableCell>{alumno.rut}</TableCell>
                  <TableCell>{alumno.nombre} {alumno.apellido}</TableCell>
                  <TableCell>{alumno.nombreApoderado}</TableCell>
                  <TableCell>{alumno.emailApoderado}</TableCell>
                  <TableCell>{alumno.telefonoApoderado}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpen(alumno)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => eliminar(alumno.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TablePaper>

      {/* FORMULARIO MODAL */}
      <AlumnoFormDialog
        open={open}
        onClose={handleClose}
        onGuardar={handleGuardar}
        alumnoEditar={alumnoEditar}
      />
    </MainContainer>
  );
};
