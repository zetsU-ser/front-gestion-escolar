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

export const AlumnosTable = () => {
  const { alumnos, loading, crear, actualizar, eliminar } = useAlumnos();

  const [open, setOpen] = useState(false);
  const [alumnoEditar, setAlumnoEditar] = useState(null);

  const handleOpen = (alumno = null) => {
    setAlumnoEditar(alumno); // Modo edicion si existe alumno
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlumnoEditar(null); // Reseteo para proxima apertura
  };

  const handleGuardar = async (form) => {
    try {
      if (alumnoEditar) {
        await actualizar(alumnoEditar.id, form);
      } else {
        await crear(form);
      }
      handleClose(); // Cierre tras exito
    } catch (error) {
      alert("No se pudo guardar la información del alumno: " + error.message);
    }
  };

  if (loading) return <LoadingText>Cargando base de datos de alumnos...</LoadingText>;

  return (
    <MainContainer>
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

      <AlumnoFormDialog
        open={open}
        onClose={handleClose}
        onGuardar={handleGuardar}
        alumnoEditar={alumnoEditar}
      />
    </MainContainer>
  );
};
