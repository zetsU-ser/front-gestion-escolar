import { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './infrastructure/theme/theme';
import { AuthProvider, AuthContext } from './application/context/AuthContext';
import { LoginForm } from './presentation/modules/LoginModule/LoginForm';
import { Box, Typography, Button } from '@mui/material';
import { authRepository } from './infrastructure/repositories/HttpAuthRepository';

const MainContent = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h4" color="primary">¡Bienvenido al sistema!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>Usuario logueado: {currentUser.email}</Typography>
        <Button 
          variant="outlined" 
          color="secondary" 
          sx={{ mt: 4 }}
          onClick={() => authRepository.logout()}
        >
          Cerrar Sesión
        </Button>
      </Box>
    );
  }

  return <LoginForm />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box 
          sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MainContent />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
