import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

const AuthRedirect = () => {
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  
  if (!currentUser) return <LoginForm />;
  
  // Redireccion por roles
  if (isAdmin()) return <Navigate to="/admin" replace />;
  if (isCoordinador()) return <Navigate to="/coordinador" replace />;
  
  return <Navigate to="/profesor" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            pb: 4 // Padding inferior
          }}>
            <Navbar />
            
            <Routes>
              <Route path="/" element={<AuthRedirect />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/usuarios" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <UsuariosTable titulo="Control de Usuarios Institucionales" />
                </ProtectedRoute>
              } />

              <Route path="/coordinador" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <CoordinadorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/alumnos" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <AlumnosTable />
                </ProtectedRoute>
              } />
              <Route path="/cursos" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <CursosTable />
                </ProtectedRoute>
              } />
              <Route path="/alumnos-curso/:cursoId" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <AlumnosCursoView />
                </ProtectedRoute>
              } />

              <Route path="/profesor" element={
                <ProtectedRoute allowedRoles={['DOCENTE']}>
                  <ProfesorDashboard />
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
