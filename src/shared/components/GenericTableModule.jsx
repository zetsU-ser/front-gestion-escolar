import React from 'react';
import { Box, Typography, Button, Divider, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import { HeaderModulo } from '../../presentation/components/HeaderModulo';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// VIEW PATTERN
// renderiza un contenedor genérico para vistas de tabla
export const GenericTableModule = ({
  titulo,
  correo,
  loading,
  error,
  errorGuardar,
  puedeGestionar = true,
  onAgregar,
  textoBotonAgregar = "Nuevo Registro",
  iconoBotonAgregar = null,
  alineacionBoton = "flex-end",
  filtros,
  gridComponent,
  dialogComponent,
  loadingText = "Cargando datos..."
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        {loadingText && <Typography sx={{ mt: 2 }}>{loadingText}</Typography>}
      </LoadingContainer>
    );
  }

  return (
    <MainContainer>
      <HeaderModulo titulo={titulo} correo={correo} />
      <StyledDivider />

      {puedeGestionar && onAgregar && (
        <Box sx={{ display: 'flex', justifyContent: alineacionBoton, marginBottom: 2 }}>
          <AddButton variant="contained" startIcon={iconoBotonAgregar || <AddIcon />} onClick={onAgregar}>
            {textoBotonAgregar}
          </AddButton>
        </Box>
      )}

      {filtros && (
        <Box sx={{ mb: 3 }}>
          {filtros}
        </Box>
      )}

      {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
      {errorGuardar && <ErrorAlert severity="error">{errorGuardar}</ErrorAlert>}

      {gridComponent}

      {dialogComponent}
    </MainContainer>
  );
};
