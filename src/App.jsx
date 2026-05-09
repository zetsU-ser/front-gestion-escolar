import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import theme from './infrastructure/theme/theme';
import { AuthProvider } from './application/context/AuthContext';
import { LoginForm } from './presentation/modules/LoginModule/LoginForm';
import { ProtectedRoute } from './presentation/routes/ProtectedRoute';
import { Unauthorized } from './presentation/routes/Unauthorized';

import { AdminDashboard } from './presentation/modules/AdminModule/AdminDashboard';
import { CoordinadorDashboard } from './presentation/modules/TeacherModule/CoordinadorDashboard';
import { ProfesorDashboard } from './presentation/modules/TeacherModule/ProfesorDashboard';
import { UsuariosTable } from './presentation/modules/UsuariosModule/UsuariosTable';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Routes>
              <Route path="/" element={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                  <LoginForm />
                </Box>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/coordinador" element={
                <ProtectedRoute allowedRoles={['coordinador']}>
                  <CoordinadorDashboard />
                </ProtectedRoute>
              } />

              <Route path="/profesor" element={
                <ProtectedRoute allowedRoles={['profesor']}>
                  <ProfesorDashboard />
                </ProtectedRoute>
              } />

              <Route path="/usuarios" element={
                <ProtectedRoute allowedRoles={['admin', 'coordinador']}>
                  <UsuariosTable titulo="Gestión de Usuarios" />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

