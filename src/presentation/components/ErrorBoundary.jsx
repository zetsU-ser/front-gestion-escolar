import { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// maneja los errores de renderizado en el árbol de componentes para evitar un crash total
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  // actualiza el estado cuando ocurre un error
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // registra el error para monitoreo (puede enviarse a Sentry, Datadog, etc.)
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary atrapó un error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  // renderiza una vista de fallback amistosa si hay error
  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" p={3}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 500, borderRadius: 2 }}>
            <WarningAmberIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" color="error" gutterBottom>
              Algo salió mal en esta sección
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Se ha producido un error inesperado al cargar este módulo. El resto de la aplicación sigue funcionando.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => window.location.reload()}
            >
              Recargar Página
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children; 
  }
}
